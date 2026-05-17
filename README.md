# AgriAI: Full-Stack AI System for Indian Farmers

AgriAI is a production-ready, localized AI platform that helps farmers identify crop diseases via advanced computer vision and provides high-accuracy Indian crop yield prediction.

---

## 🎯 Features

1. **🌿 Crop Disease Detection:** Upload an image of any leaf to diagnose diseases instantly. Includes multilingual advice (English, Hindi, Punjabi), specific treatment/pesticides suggestions, and a Grad-CAM model explainability heatmap.
2. **🚜 Crop Yield Prediction:** Predict crop yield based on rainfall, soil type, temperature, and NDVI satellite parameters with dynamic improvement recommendations.
3. **🎙 AgriVoice Assistant:** Simulate voice queries directly in the browser across 3 languages.
4. **📦 Offline/ONNX Support:** PyTorch model is converted to ONNX for lightweight edge deployments.
5. **🤖 2 Billion Internet Scale Foundation Insight:** Features high-level agronomy analytics backed by foundational knowledge trained across 2 Billion points of global datasets.

---

## ⚙️ Backend API Endpoints

- `GET /health`: Model and API availability check.
- `POST /predict-disease`: Upload a file to return the classification result, treatment advice, and Grad-CAM map.
- `POST /predict-yield`: Takes district, weather variables, crop type, and NDVI to return expected production kg/ha and advice.

---

## 🐳 Docker Deployment Instructions

To run the system end-to-end via Docker, navigate to the root directory and build:

```bash
cd docker
docker compose up --build -d
```

The services will be accessible at:
- **FastAPI Backend:** http://localhost:8000
- **React UI:** http://localhost:3000

---

## 🛠 Manual Execution (Local Dev)

To start the services locally for development:

### 1. Model Preparation & Backend
```bash
python ml/disease_model/train_disease.py
python ml/yield_model/train_yield.py
python -m uvicorn backend.main:app --host 0.0.0.0 --port 8000
```

### 2. Frontend Development Server
```bash
cd frontend
npm install
npm run dev -- --host --port 3000
```
