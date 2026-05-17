import os
import io
import base64
import torch
import numpy as np
from PIL import Image
from fastapi import APIRouter, File, UploadFile, HTTPException
import sys

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..")))

from ml.disease_model.train_disease import (
    AgriMultiDiseaseModel, DISEASE_CLASSES, TREATMENT_RECOMMENDATIONS,
    transform_pipeline, generate_grad_cam
)

router = APIRouter(prefix="/disease", tags=["Disease Services"])

# Load Attention model
disease_model_path = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..", "models", "disease_model.pt"))
disease_model = AgriMultiDiseaseModel(num_classes=len(DISEASE_CLASSES))
if os.path.exists(disease_model_path):
    disease_model.load_state_dict(torch.load(disease_model_path, map_location=torch.device('cpu')))
disease_model.eval()

@router.post("/predict")
async def predict_multi_label_disease(file: UploadFile = File(...)):
    try:
        contents = await file.read()
        image = Image.open(io.BytesIO(contents)).convert("RGB")
        input_tensor = transform_pipeline(image).unsqueeze(0)
        
        with torch.set_grad_enabled(True):
            logits, features = disease_model(input_tensor)
            # Use Sigmoid for multi-label attention scores
            probs = torch.sigmoid(logits)[0]
            
            detected_indices = (probs > 0.35).nonzero(as_tuple=True)[0].tolist()
            if not detected_indices:
                detected_indices = [torch.argmax(probs).item()]
                
            results = []
            for idx in detected_indices:
                name = DISEASE_CLASSES[idx]
                score = probs[idx].item()
                rec = TREATMENT_RECOMMENDATIONS.get(name, {
                    "treatment": "No specific treatment needed.",
                    "pesticides": "N/A",
                    "hindi": "स्वस्थ फसल: किसी विशेष उपचार की आवश्यकता नहीं है।",
                    "punjabi": "ਸਿਹਤਮੰਦ ਫਸਲ: ਕਿਸੇ ਖਾਸ ਇਲਾਜ ਦੀ ਲੋੜ ਨਹੀਂ ਹੈ।"
                })
                
                # Grad-CAM specifically for each target class
                cam = generate_grad_cam(disease_model, input_tensor, idx)
                cam_img = Image.fromarray((cam * 255).astype(np.uint8))
                cam_img = cam_img.resize((224, 224), resample=Image.Resampling.BILINEAR)
                
                buffered = io.BytesIO()
                cam_img.save(buffered, format="JPEG")
                cam_base64 = base64.b64encode(buffered.getvalue()).decode('utf-8')
                
                results.append({
                    "disease": name,
                    "confidence": round(score, 4),
                    "treatment": rec["treatment"],
                    "pesticides": rec["pesticides"],
                    "hindi": rec["hindi"],
                    "punjabi": rec["punjabi"],
                    "grad_cam": f"data:image/jpeg;base64,{cam_base64}"
                })
                
        return {"detected_diseases": results}
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Inference error: {e}")
