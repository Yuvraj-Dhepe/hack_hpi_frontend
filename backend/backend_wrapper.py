### THIS DEFINES THE MAIN ENTRY POINT FOR THE BACKEND
## INPUTS: STRING of userid of user requesting a intervention | Pandas dataframe pull from the database with information from all User
## OUTPUTS: an array of draws, a JSON of each intervention's likelihood of being the best

## MAIN ENTRY POINT: backend_call 

# PACKAGE IMPORTS
import numpy as np
from scipy.stats import norm
import pandas as pd
import json

# MODEL FUNCTION IMPORTS
from single_user_sampler import draw_posterior_theta
from hierarchical_sampler import run_hierarchical_model

# AUXILIARY FUNCTIONS
def ecdf_transform(x, data):
    """
    For each element in x, compute its quantile with respect to the sample 'data'.
    Uses the 'right' side so that ties are handled by counting all values <= x.
    
    Parameters:
      x: numpy array of values to transform.
      data: numpy array, the reference sample used to compute the ECDF.
    
    Returns:
      quantiles: numpy array of quantiles (in (0,1)) corresponding to x.
    """
    sorted_data = np.sort(data)
    n = len(sorted_data)
    # For each x, count how many values in sorted_data are <= x, and divide by (n+1)
    # Adding 1 to the denominator prevents getting exactly 0 or 1.
    quantiles = np.searchsorted(sorted_data, x, side='right') / (n + 1)
    return quantiles

def compute_gaussian_outcome(y1, y2, global_data=None):
    """
    Compute a Gaussianized difference outcome from two outcome vectors.
    
    Both y1 (before intervention) and y2 (after intervention) are passed
    through an ECDF transformation (with respect to global_data if provided,
    otherwise the combined y1 and y2 are used), then mapped to standard normal quantiles.
    The returned outcome is the difference (gaussianized y2 minus gaussianized y1),
    which should be approximately Gaussian.
    
    Parameters:
      y1: numpy array of shape (N,) with 'before' values.
      y2: numpy array of shape (N,) with 'after' values.
      global_data: (optional) numpy array to use as the reference for the ECDF.
                   If None, the combined y1 and y2 are used.
    
    Returns:
      outcome: numpy array of shape (N,) representing the Gaussianized difference.
    """
    # Use the global reference if provided, otherwise combine y1 and y2.
    if global_data is None:
        combined = np.concatenate([y1, y2])
    else:
        combined = global_data

    # Compute quantiles for y1 and y2 relative to the reference sample.
    q_y1 = ecdf_transform(y1, combined)
    q_y2 = ecdf_transform(y2, combined)
    
    # Map quantiles to standard normal quantiles.
    g_y1 = norm.ppf(q_y1)
    g_y2 = norm.ppf(q_y2)
    
    # Return the difference outcome.
    return g_y2 - g_y1

def is_user_private(user_data):
    """
    Check if the last observation of "is_private" is True for a given user's data.

    Parameters:
    user_data (pd.DataFrame): DataFrame containing the user's data, filtered by userid.

    Returns:
    bool: True if the last observation of "is_private" is True, False otherwise.
    """
    user_data_sorted = user_data.sort_values(by='timestamp', ascending=True)
    return bool(user_data_sorted['is_private'].iloc[-1] == True)

def extract_user_reg_data(user_data):
    """
    Extract the outcome, covariates, and treatment indicators from the user data.

    Parameters:
    user_data (pd.DataFrame): DataFrame containing the user's data, filtered by userid.

    Returns:
    tuple: A tuple containing the outcome array Y, covariates matrix X, and treatment matrix D.
    """
    # Create the outcome by Gaussianizing the difference between after (y2) and before (y1)
    y1 = user_data['y1'].values  # shape (N,)
    y2 = user_data['y2'].values  # shape (N,)
    Y = compute_gaussian_outcome(y1, y2)  # returns a numpy array of shape (N,)

    # Extract the covariates: assume the covariate columns start with 'x'
    covariate_cols = [col for col in user_data.columns if col.startswith('x')]
    X = user_data[covariate_cols].values  # shape (N, K)

    # Extract the treatment indicator columns: assume these columns start with 'd'
    treatment_cols = [col for col in user_data.columns if col.startswith('d')]
    D = user_data[treatment_cols].values  # shape (N, J)

    return Y, X, D

def format_posterior_best_json(user_posterior_best):
    # Create a JSON dictionary with keys 'd1', 'd2', ... 'dJ'
    posterior_best_dict = {f"d{i+1}": float(user_posterior_best[i]) for i in range(user_posterior_best.shape[0])}
    posterior_best_json = json.dumps(posterior_best_dict)
    return posterior_best_json

# MAIN ENTRY POINT
def backend_call(user_id, database_pull):
    # get user data
    user_data = database_pull[database_pull['userid'] == user_id]

    # CHECK IF last observation of "is_private" is False
    is_private = is_user_private(user_data)

    # if user is private, filter their data and pass to single_user_sampler
    if is_private:
        # get user data
        Y, X, D = extract_user_reg_data(user_data)
        # run single_user_sampler
        user_samples, user_posterior_best = draw_posterior_theta(Y, X, D, n_draws=1200)
        # format as JSON
        user_posterior_best_json = format_posterior_best_json(user_posterior_best)
    
    # if user is in shared-data mode, pass his data "first" and append the rest, run hierarchical_sampler, and get draws and posterior_best_json for the user
    else:
        group_data = []
        for p in database_pull['userid'].unique():
            other_user_data = database_pull[database_pull['userid'] == p]
            if (p != user_id) and (not is_user_private(other_user_data)):
                group_data.append(extract_user_reg_data(other_user_data))
        group_data.append(extract_user_reg_data(user_data))

        # run hierarchical_sampler
        samples, posterior_best_json = run_hierarchical_model(group_data, iter_sampling=1200)

        # extract the user's samples
        user_samples = samples[:, -1, :]
        user_posterior_best = posterior_best_json[-1, :]
        user_posterior_best_json = format_posterior_best_json(user_posterior_best)
    
    return user_samples, user_posterior_best_json

if __name__ == "__main__":
    # Create example data
    np.random.seed(42)  # For reproducibility
    
    # Create sample database with required columns
    n_users = 3
    n_observations = 10
    
    example_data = {
        'userid': np.repeat(['user1', 'user2', 'user3'], n_observations),
        'timestamp': np.tile(pd.date_range(start='2024-01-01', periods=n_observations), n_users),
        'is_private': np.repeat([False, True, False], n_observations),
        'y1': np.random.normal(0, 1, n_users * n_observations),
        'y2': np.random.normal(0.5, 1, n_users * n_observations),
        'x1': np.random.normal(0, 1, n_users * n_observations),
        'x2': np.random.normal(0, 1, n_users * n_observations),
        'd1': np.random.binomial(1, 0.5, n_users * n_observations),
        'd2': np.random.binomial(1, 0.5, n_users * n_observations)
    }
    
    # Convert to DataFrame
    example_df = pd.DataFrame(example_data)
    
    # Test the backend_call function with a non-private user
    test_user_id = 'user1'
    samples, posterior_best = backend_call(test_user_id, example_df)
    
    print(f"Results for user {test_user_id}:")
    print(f"Samples shape: {samples.shape}")
    print(f"Posterior best interventions: {posterior_best}")
