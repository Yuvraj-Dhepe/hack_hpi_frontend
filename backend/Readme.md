The file `single_user_sampler.py` contains the standalone python function to implement single-user-based sample.
It takes in all past data for a single user and returns draws of the posterior of each treatment effect.

The file `hierarchical_sampler.py` contains a python wrapper to implement hierarchical sampling using cmdstanpy. This runs the hier_reg sampler compiled from `hier_reg.stan` via CMDSTAN. All installation requirements for sampling via cmdstanpy are described here: https://mc-stan.org/cmdstanpy/installation.html. Compilation is done from the `hier_reg.stan` file.

I am also committing the pre-compiled `hier_reg` executable, as well as header files created during compilation, `hier_reg.hpp`.

