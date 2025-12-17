# News Article Classification - Quick Start Guide

## Setup and Run (5 Minutes)

### 1. Install Dependencies
```bash
cd news-classification
pip install -r requirements.txt
```

### 2. Train the Model
```bash
cd backend
python train_model.py
```
Wait for training to complete (~2-3 minutes)

### 3. Start the API Server
```bash
python api_server.py
```
Leave this terminal running

### 4. Open the Frontend
- Open a new terminal
- Navigate to the frontend folder
- Open `index.html` in your browser

OR use a local server:
```bash
cd ../frontend
python -m http.server 8080
```
Then visit: http://localhost:8080

## Test the System

1. Click on any sample article button (Sports, Business, etc.)
2. Click "Classify Article"
3. View the prediction results with confidence scores!

## Keyboard Shortcuts
- `Ctrl/Cmd + Enter` - Classify article
- Sample buttons - Load example articles

## Troubleshooting

**"Model not found"**
→ Run `python train_model.py` first

**"Cannot connect to server"**
→ Make sure API server is running on port 5000

**Java errors**
→ Install Java 8 or 11: https://adoptium.net/

## Project Structure
```
backend/     → Spark MLlib code
frontend/    → HTML/CSS/JS interface  
data/        → Training dataset
models/      → Trained ML models
```

For detailed documentation, see README.md
