#!/bin/bash

echo "=================================="
echo "News Article Classifier - Setup"
echo "=================================="
echo ""

# Check Python version
echo "Checking Python version..."
python3 --version

# Install dependencies
echo ""
echo "Installing dependencies..."
pip install -r requirements.txt

# Train the model
echo ""
echo "=================================="
echo "Training the classification model..."
echo "=================================="
cd backend
python3 train_model.py

echo ""
echo "=================================="
echo "Setup Complete!"
echo "=================================="
echo ""
echo "Next steps:"
echo "1. Start the API server: cd backend && python3 api_server.py"
echo "2. Open frontend/index.html in your browser"
echo ""
