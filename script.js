// API Configuration
const API_BASE_URL = 'http://localhost:5001';

// Sample articles for different categories
const sampleArticles = {
    'Sports': 'The football team won the championship after a thrilling final match. The star player scored three goals in the second half, securing their victory against their long-time rivals. Fans celebrated in the streets as their team lifted the trophy for the first time in a decade.',
    
    'Business': 'The stock market reached new highs today as investors responded positively to the latest economic data. Tech stocks led the rally, with several companies reporting better-than-expected quarterly earnings. Analysts predict continued growth in the financial sector throughout the year.',
    
    'Technology': 'A new artificial intelligence breakthrough promises to revolutionize machine learning applications. Researchers at the university developed an algorithm that can process natural language with unprecedented accuracy. The technology could transform how we interact with computers and digital assistants.',
    
    'Politics': 'The senator announced new legislation aimed at healthcare reform during a press conference today. The proposed bill includes provisions for expanding coverage and reducing prescription drug costs. Congressional leaders from both parties are expected to debate the measure next week.'
};

// DOM Elements
const articleText = document.getElementById('articleText');
const classifyBtn = document.getElementById('classifyBtn');
const clearBtn = document.getElementById('clearBtn');
const resultsSection = document.getElementById('resultsSection');
const loadingOverlay = document.getElementById('loadingOverlay');
const errorMessage = document.getElementById('errorMessage');
const errorText = document.getElementById('errorText');
const predictedCategory = document.getElementById('predictedCategory');
const confidenceValue = document.getElementById('confidenceValue');
const confidenceBadge = document.getElementById('confidenceBadge');
const probabilityChart = document.getElementById('probabilityChart');
const articlePreview = document.getElementById('articlePreview');
const sampleButtons = document.querySelectorAll('.sample-btn');

// Event Listeners
classifyBtn.addEventListener('click', classifyArticle);
clearBtn.addEventListener('click', clearForm);

sampleButtons.forEach(btn => {
    btn.addEventListener('click', function() {
        const category = this.getAttribute('data-category');
        articleText.value = sampleArticles[category];
        hideError();
    });
});

articleText.addEventListener('input', hideError);

// Main Classification Function
async function classifyArticle() {
    const text = articleText.value.trim();
    
    // Validation
    if (!text) {
        showError('Please enter a news article to classify.');
        return;
    }
    
    if (text.length < 20) {
        showError('Please enter a longer article (at least 20 characters).');
        return;
    }
    
    // Show loading
    showLoading();
    hideError();
    resultsSection.style.display = 'none';
    
    try {
        // Call API
        const response = await fetch(`${API_BASE_URL}/predict`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text: text })
        });
        
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || errorData.error || 'Failed to classify article');
        }
        
        const data = await response.json();
        
        // Display results
        displayResults(data);
        
    } catch (error) {
        console.error('Error:', error);
        if (error.message.includes('Failed to fetch')) {
            showError('Unable to connect to the server. Please make sure the API server is running on http://localhost:5000');
        } else {
            showError(`Error: ${error.message}`);
        }
    } finally {
        hideLoading();
    }
}

// Display Results Function
function displayResults(data) {
    const prediction = data.prediction;
    
    // Update predicted category
    predictedCategory.textContent = prediction.category;
    confidenceValue.textContent = `${prediction.confidence}%`;
    
    // Set confidence badge color based on confidence level
    const confidence = prediction.confidence;
    if (confidence >= 80) {
        confidenceBadge.style.background = 'rgba(16, 185, 129, 0.3)';
    } else if (confidence >= 60) {
        confidenceBadge.style.background = 'rgba(251, 191, 36, 0.3)';
    } else {
        confidenceBadge.style.background = 'rgba(239, 68, 68, 0.3)';
    }
    
    // Create probability chart
    createProbabilityChart(prediction.probabilities);
    
    // Show article preview
    const previewText = articleText.value.substring(0, 300);
    articlePreview.textContent = previewText + (articleText.value.length > 300 ? '...' : '');
    
    // Show results section with animation
    resultsSection.style.display = 'block';
    resultsSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Create Probability Chart
function createProbabilityChart(probabilities) {
    // Clear existing chart
    probabilityChart.innerHTML = '';
    
    // Sort probabilities in descending order
    const sortedProbs = Object.entries(probabilities)
        .sort((a, b) => b[1] - a[1]);
    
    // Create bars for each category
    sortedProbs.forEach(([category, probability], index) => {
        const barWrapper = document.createElement('div');
        barWrapper.className = 'probability-bar';
        
        // Determine color based on rank
        let barColor;
        if (index === 0) {
            barColor = 'linear-gradient(90deg, #2563eb, #60a5fa)';
        } else if (index === 1) {
            barColor = 'linear-gradient(90deg, #8b5cf6, #a78bfa)';
        } else {
            barColor = 'linear-gradient(90deg, #64748b, #94a3b8)';
        }
        
        barWrapper.innerHTML = `
            <div class="bar-label">${category}</div>
            <div class="bar-container">
                <div class="bar-fill" style="width: ${probability}%; background: ${barColor};">
                    ${probability >= 10 ? probability.toFixed(1) + '%' : ''}
                </div>
            </div>
            <div class="bar-value">${probability.toFixed(1)}%</div>
        `;
        
        probabilityChart.appendChild(barWrapper);
        
        // Animate bar
        setTimeout(() => {
            const barFill = barWrapper.querySelector('.bar-fill');
            barFill.style.width = `${probability}%`;
        }, 100 * index);
    });
}

// Helper Functions
function showLoading() {
    loadingOverlay.style.display = 'flex';
    classifyBtn.disabled = true;
}

function hideLoading() {
    loadingOverlay.style.display = 'none';
    classifyBtn.disabled = false;
}

function showError(message) {
    errorText.textContent = message;
    errorMessage.style.display = 'flex';
}

function hideError() {
    errorMessage.style.display = 'none';
}

function clearForm() {
    articleText.value = '';
    resultsSection.style.display = 'none';
    hideError();
    articleText.focus();
}

// Check API health on page load
async function checkAPIHealth() {
    try {
        const response = await fetch(`${API_BASE_URL}/health`);
        const data = await response.json();
        console.log('API Health:', data);
        
        if (!data.model_exists) {
            showError('Model not found. Please train the model first by running train_model.py');
        }
    } catch (error) {
        console.warn('API server is not running. Please start the server with: python backend/api_server.py');
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    checkAPIHealth();
    articleText.focus();
});

// Add keyboard shortcut (Ctrl/Cmd + Enter to classify)
articleText.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        classifyArticle();
    }
});
