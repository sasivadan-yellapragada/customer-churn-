# Customer Churn Prediction Website

A professional, interactive web application for predicting customer churn using machine learning.

## Features

- 📊 **Interactive Dashboard**: Visualize churn insights with charts and graphs
- 🔮 **Churn Prediction**: Input customer data or upload CSV files for batch predictions
- 📈 **Analytics**: View key metrics, feature importance, and model performance
- 🎨 **Modern UI**: Dark-themed dashboard with smooth animations
- 📱 **Responsive Design**: Works seamlessly on desktop and mobile devices

## Project Structure

```
├── backend/
│   ├── main.py              # FastAPI backend server
│   ├── train_model.py       # ML model training script
│   ├── requirements.txt     # Python dependencies
│   └── models/              # Saved ML models (generated after training)
│
├── frontend/
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── App.js           # Main app component
│   │   └── index.js         # Entry point
│   ├── public/
│   └── package.json         # Node dependencies
│
└── WA_Fn-UseC_-Telco-Customer-Churn.csv  # Dataset
```

## Setup Instructions

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Create a virtual environment (recommended):
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Train the ML model:
```bash
python train_model.py
```

This will:
- Load and preprocess the dataset
- Train multiple ML models (Random Forest, XGBoost, Logistic Regression)
- Select the best model based on F1 score
- Save the model and preprocessing objects to `models/` directory

5. Start the FastAPI server:
```bash
python main.py
```

Or using uvicorn directly:
```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

The API will be available at `http://localhost:8000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The application will open at `http://localhost:3000`

## Usage

### Dashboard Overview
- View key metrics (Total Customers, Churned, Retained, Churn Rate)
- Explore visualizations:
  - Churn distribution pie chart
  - Churn by contract type
  - Churn by tenure
  - Payment methods distribution
  - Feature importance
  - Model performance metrics

### Predict Churn
1. **Single Prediction**: Fill in the customer details form and click "Predict Churn"
2. **Batch Prediction**: Upload a CSV file with customer data to get predictions for multiple customers

### About Page
Learn about customer churn, the project approach, model architecture, and technology stack.

## API Endpoints

- `GET /api/health` - Health check
- `GET /api/analytics` - Get analytics data
- `POST /api/predict` - Predict churn for a single customer
- `POST /api/predict-batch` - Predict churn for multiple customers (CSV upload)

## Technologies Used

### Backend
- Python 3.8+
- FastAPI
- scikit-learn
- XGBoost
- pandas
- numpy

### Frontend
- React 18
- React Router
- Recharts
- Axios
- React Hot Toast

## Model Information

The system trains and evaluates multiple ML models:
- **Random Forest**
- **XGBoost**
- **Logistic Regression**

The best model (based on F1 score) is automatically selected and saved.

## Dataset

The dataset includes:
- Customer demographics (gender, senior citizen status, partner, dependents)
- Account information (tenure, contract type)
- Services (phone, internet, streaming services)
- Billing data (monthly charges, total charges, payment method)
- Churn status (target variable)

## License

This project is for educational purposes.

