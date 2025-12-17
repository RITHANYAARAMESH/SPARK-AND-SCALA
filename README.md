# News Article Classification Using Spark MLlib

A comprehensive machine learning system for automatically classifying news articles into categories (Sports, Politics, Technology, Business) using Apache Spark MLlib and Natural Language Processing techniques.

## 🎯 Project Overview

This project implements an end-to-end news article classification system with:
- **Backend**: Spark MLlib for machine learning model training and prediction
- **API**: Flask REST API for serving predictions
- **Frontend**: Modern HTML/CSS/JavaScript interface for user interaction

## 📁 Project Structure

```
news-classification/
├── backend/
│   ├── train_model.py      # Model training script
│   ├── predict.py           # Prediction module
│   └── api_server.py        # Flask API server
├── frontend/
│   ├── index.html           # Main HTML interface
│   ├── styles.css           # Styling
│   └── script.js            # Frontend logic
├── data/
│   └── news_articles.csv    # Sample training dataset
├── models/                  # Trained models saved here
├── requirements.txt         # Python dependencies
└── README.md               # This file
```

## 🚀 Getting Started

### Prerequisites

- Python 3.8 or higher
- Java 8 or 11 (required for Spark)
- pip (Python package manager)

### Installation

1. **Navigate to the project directory:**
```bash
cd news-classification
```

2. **Install required Python packages:**
```bash
pip install -r requirements.txt
```

### Usage

#### Step 1: Train the Model

```bash
cd backend
python train_model.py
```

This will:
- Load the news dataset from `data/news_articles.csv`
- Preprocess the text data using NLP techniques
- Train a Logistic Regression classifier using Spark MLlib
- Evaluate the model on test data
- Save the trained model to `models/news_classifier_model`

**Expected Output:**
```
Loading data from ../data/news_articles.csv...
Loaded 45 articles

Training logistic model...
Model training completed!

Evaluating model...
=== Model Evaluation Metrics ===
Accuracy: 0.8889
F1 Score: 0.8750
...
```

#### Step 2: Test Predictions (Optional)

```bash
python predict.py
```

This will test the model with sample articles and display predictions.

#### Step 3: Start the API Server

```bash
python api_server.py
```

The server will start on `http://localhost:5000`

**API Endpoints:**
- `POST /predict` - Classify a single article
- `POST /predict_batch` - Classify multiple articles
- `GET /categories` - Get available categories
- `GET /health` - Health check

#### Step 4: Open the Frontend

Open `frontend/index.html` in your web browser, or use a local server:

```bash
cd ../frontend
python -m http.server 8080
```

Then navigate to `http://localhost:8080` in your browser.

## 🎨 Frontend Features

- **Modern UI**: Clean, responsive design with gradient backgrounds
- **Real-time Classification**: Instant article categorization
- **Confidence Scores**: Visual probability charts for all categories
- **Sample Articles**: Quick-start with pre-loaded examples
- **Error Handling**: User-friendly error messages
- **Keyboard Shortcuts**: Press Ctrl/Cmd + Enter to classify

## 🧠 Machine Learning Pipeline

### 1. Text Preprocessing
- **Tokenization**: Breaking text into words
- **Stop Words Removal**: Removing common words (the, is, at, etc.)
- **TF-IDF Vectorization**: Converting text to numerical features
  - Term Frequency (TF): How often a word appears
  - Inverse Document Frequency (IDF): How unique a word is

### 2. Model Training
- **Algorithm**: Logistic Regression (configurable)
- **Alternative Models**: Random Forest, Naive Bayes
- **Training Split**: 80% training, 20% testing

### 3. Evaluation Metrics
- **Accuracy**: Overall correct predictions
- **F1 Score**: Balanced precision and recall
- **Precision**: Correct positive predictions
- **Recall**: Coverage of actual positives

## 📊 Sample API Request/Response

### Request:
```json
POST /predict
{
  "text": "The football team won the championship after a thrilling match."
}
```

### Response:
```json
{
  "success": true,
  "prediction": {
    "category": "Sports",
    "confidence": 92.5,
    "probabilities": {
      "Sports": 92.5,
      "Business": 3.2,
      "Technology": 2.8,
      "Politics": 1.5
    }
  }
}
```

## 🔧 Customization

### Adding More Categories

1. Update your dataset with new categories
2. Retrain the model:
```bash
python train_model.py
```

### Changing the Model Type

In `train_model.py`, modify the `model_type` parameter:
```python
classifier.train_model(train_data, model_type="random_forest")
# Options: "logistic", "random_forest", "naive_bayes"
```

### Adjusting Model Parameters

Edit the classifier configurations in `train_model.py`:
```python
# For Logistic Regression
classifier = LogisticRegression(maxIter=100, regParam=0.01)

# For Random Forest
classifier = RandomForestClassifier(numTrees=100, maxDepth=10)
```

## 🐛 Troubleshooting

### Issue: "Model not found"
**Solution**: Run `python train_model.py` to create the model first.

### Issue: "Unable to connect to server"
**Solution**: Ensure the API server is running on port 5000.

### Issue: Java/Spark errors
**Solution**: Verify Java 8 or 11 is installed:
```bash
java -version
```

### Issue: CORS errors in browser
**Solution**: The Flask server has CORS enabled. Make sure both frontend and backend are running.

## 📈 Performance Tips

- **Larger Dataset**: Use more training data for better accuracy
- **Feature Engineering**: Experiment with different vectorization parameters
- **Ensemble Methods**: Combine multiple models for improved results
- **Hyperparameter Tuning**: Use Spark's CrossValidator for optimization

## 🎓 Use Cases

- **News Aggregators**: Automatically categorize incoming articles
- **Content Recommendation**: Suggest articles based on user interests
- **Media Monitoring**: Track and classify news by topic
- **Research Tools**: Organize large document collections

## 🤝 Contributing

Feel free to enhance this project by:
- Adding more sophisticated NLP features
- Implementing deep learning models
- Creating additional frontend visualizations
- Expanding the dataset with more categories

## 📝 License

This project is open source and available for educational purposes.

## 🙏 Acknowledgments

- Apache Spark MLlib for machine learning capabilities
- Flask for the REST API framework
- Modern web technologies for the frontend interface

---

**Built with ❤️ using Apache Spark MLlib, Flask, and Modern Web Technologies**
