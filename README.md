
# Patient Symptom Tracker

A web-based application to log, track, and manage patient symptoms. Designed for healthcare professionals to monitor the progression of symptoms and provide better care to patients. 

## Features

- **User Authentication**: Login and signup functionality for healthcare professionals.
- **Symptom Logging**: Ability to log symptoms and track their progression over time.
- **Symptom History**: View a history of logged symptoms for each patient.

  
## Tech Stack

- **Frontend**: React
- **Backend**: FastAPI
- **Database**: MongoDB

## Getting Started

To run the project locally, follow these steps:

### 1. Clone the repository

```bash
git clone https://github.com/Jokinth/Patient-Symptom-Tracker.git
cd Patient-Symptom-Tracker
```

### 2. Install Backend Dependencies

Navigate to the `backend` directory and install dependencies.

```bash
cd backend
pip install -r requirements.txt
```

### 3. Install Frontend Dependencies

Navigate to the `frontend` directory and install dependencies.

```bash
cd frontend
npm install
```

### 4. Set up the database

Make sure you have MongoDB installed and running. Configure the MongoDB URI in the backend settings if needed.

### 5. Run the Backend

Start the FastAPI server:

```bash
cd backend
uvicorn main:app --reload
```

### 6. Run the Frontend

Start the React development server:

```bash
cd frontend
npm start
```

The frontend will be available at `http://localhost:3000` and the backend at `http://localhost:8000`.

## Folder Structure

```
Patient-Symptom-Tracker/
├── backend/            # FastAPI backend
│   ├── app/            # Backend API files
│   ├── models/         # Database models
│   └── main.py         # FastAPI app entry point
├── frontend/           # React frontend
│   ├── public/         # Static assets
│   ├── src/            # React components (App.js, Login.js, Signup.js, etc.)
│   └── package.json    # Frontend dependencies and settings
└── README.md           # Project documentation
```
