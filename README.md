# ToneDown: Personalized Tinnitus Intervention App

ToneDown is an innovative mobile application designed to help individuals manage tinnitus through personalized interventions. The app uses advanced statistical modeling to learn from user feedback and provide increasingly effective intervention recommendations over time.

## Project Overview

ToneDown consists of three main components:
1. **React Native Frontend**: A cross-platform mobile application built with Expo
2. **Flask Backend**: A Python-based API server for data processing and analysis
3. **Statistical Modeling**: Bayesian hierarchical models for personalized intervention recommendations

[![ToneDown Demo](https://img.youtube.com/vi/YOUTUBE_VIDEO_ID/0.jpg)](https://www.youtube.com/watch?v=YOUTUBE_VIDEO_ID)

## Project Setup

### Prerequisites
- Node.js (v16+)
- Python 3.12
- Conda or Micromamba (recommended for environment management)

### Frontend Setup
```bash
# Run the setup script to install nvm and Node.js LTS
./setup.sh

# Navigate to the ToneDown directory
cd ToneDown

# Install dependencies
npm install

# Start the Expo development server
npx expo start
```

### Backend Setup
```bash
# Create and activate a conda environment
conda env create -f hack_hpi_frontend/flask_backend/environment.yml
conda activate hack_hpi

# Or with micromamba
micromamba env create -f hack_hpi_frontend/flask_backend/environment.yml
micromamba activate hack_hpi

# Install additional requirements
pip install -r hack_hpi_frontend/flask_backend/requirements.txt

# Start the Flask server
cd hack_hpi_frontend/flask_backend
python app.py
```

### CmdStan Setup (for Statistical Modeling)
```bash
# Install build tools if needed
sudo apt-get update
sudo apt-get install -y build-essential make g++

# Install CmdStan
python -m cmdstanpy.install_cmdstan --cores 1 --verbose
```

## Project Components

### 1. React Native Frontend

The frontend is built with React Native and Expo, providing a cross-platform mobile experience. Key features include:

- **User Profiles**: Personalized experience with user data storage
- **Tinnitus Assessment**: Questionnaires to evaluate tinnitus severity and characteristics
- **Intervention Recommendations**: Display of personalized intervention suggestions
- **Feedback Collection**: Gathering user feedback on intervention effectiveness
- **Privacy Controls**: Options for users to control data sharing

#### Key Technologies:
- React Native with Expo
- Expo Router for navigation
- AsyncStorage for local data persistence
- Expo Secure Store for sensitive data

### 2. Flask Backend

The Flask backend serves as the API layer between the frontend and the statistical models. It handles:

- **Data Processing**: Cleaning and preparing user data for analysis
- **API Endpoints**: RESTful endpoints for data submission and retrieval
- **Integration**: Connecting the frontend with the statistical models
- **Data Storage**: Managing user data and intervention history

#### Key Technologies:
- Flask web framework
- Flask-CORS for cross-origin resource sharing
- Pandas for data manipulation
- JSON for data exchange

### 3. Statistical Modeling

The statistical component uses Bayesian hierarchical models to provide personalized intervention recommendations:

- **Single-User Sampling**: Analyzing individual user data to determine effective interventions
- **Hierarchical Sampling**: Learning across users to improve recommendations
- **Posterior Probability Calculation**: Determining the most likely effective interventions
- **Adaptive Learning**: Improving recommendations over time based on feedback

#### Key Technologies:
- CmdStan for Bayesian inference
- Stan modeling language
- Python wrappers for model integration
- Pandas for data handling

## App Gallery

<table>
  <tr>
    <td><img src="path/to/screenshot1.png" width="200" alt="Welcome Screen"/></td>
    <td><img src="path/to/screenshot2.png" width="200" alt="Home Screen"/></td>
    <td><img src="path/to/screenshot3.png" width="200" alt="Profile Page"/></td>
  </tr>
  <tr>
    <td>Welcome Screen</td>
    <td>Home Screen</td>
    <td>Profile Page</td>
  </tr>
  <tr>
    <td><img src="path/to/screenshot4.png" width="200" alt="Tinnitus Assessment"/></td>
    <td><img src="path/to/screenshot5.png" width="200" alt="Intervention Selection"/></td>
    <td><img src="path/to/screenshot6.png" width="200" alt="Results Page"/></td>
  </tr>
  <tr>
    <td>Tinnitus Assessment</td>
    <td>Intervention Selection</td>
    <td>Results Page</td>
  </tr>
  <tr>
    <td><img src="path/to/screenshot7.png" width="200" alt="Music Therapy"/></td>
    <td><img src="path/to/screenshot8.png" width="200" alt="Feedback Form"/></td>
    <td><img src="path/to/screenshot9.png" width="200" alt="Settings"/></td>
  </tr>
  <tr>
    <td>Music Therapy</td>
    <td>Feedback Form</td>
    <td>Settings</td>
  </tr>
</table>

## Project Structure

```
hack_hpi_frontend/
├── ToneDown/                  # React Native Frontend
│   ├── app/                   # Expo Router app directory
│   ├── assets/                # Images and other static assets
│   ├── components/            # Reusable React components
│   └── package.json           # Frontend dependencies
├── flask_backend/             # Flask Backend
│   ├── app.py                 # Main Flask application
│   ├── environment.yml        # Conda environment specification
│   └── requirements.txt       # Python dependencies
└── backend/                   # Statistical Modeling
    ├── backend_wrapper.py     # Interface to statistical models
    ├── single_user_sampler.py # Single-user analysis
    ├── hierarchical_sampler.py# Hierarchical modeling
    └── hier_reg.stan          # Stan model definition
```

## Meet the Team

- [Belena Zwadsich](https://github.com/BelanaZ)
- [Till Zemann](https://github.com/till2)
- [Yuvraj Dhepe](https://github.com/Yuvraj-Dhepe)
- [Fynn Kroeger](https://github.com/fynnkroeger)
- [Lasse Meixner](https://github.com/lasse-meixner)
- [Isabel Kurth](https://github.com/IsabelKurth)

## License

This project is licensed under the MIT License - see the LICENSE file for details.