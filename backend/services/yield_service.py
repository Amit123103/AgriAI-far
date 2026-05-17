import os
import pickle
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import sys

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..")))

router = APIRouter(prefix="/yield", tags=["Yield Services"])

# Custom unpickler to match AdvancedCropYieldModel correctly
class CustomUnpickler(pickle.Unpickler):
    def find_class(self, module, name):
        if name in ('AdvancedCropYieldModel', 'TrainedCropYieldModel', 'ScaleTrainedCropYieldModel'):
            from ml.yield_model.train_yield import AdvancedCropYieldModel
            return AdvancedCropYieldModel
        return super().find_class(module, name)

yield_model_path = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..", "models", "yield_model.pkl"))
yield_model = None
if os.path.exists(yield_model_path):
    with open(yield_model_path, "rb") as f:
        yield_model = CustomUnpickler(f).load()

class AdvancedYieldInput(BaseModel):
    crop: str
    district_state: str
    soil: str
    rainfall: float
    temperature: float
    humidity: float
    ndvi: float

@router.post("/predict")
def predict_advanced_yield(data: AdvancedYieldInput):
    if yield_model is None:
        raise HTTPException(status_code=500, detail="Yield model not loaded.")
    try:
        res = yield_model.predict(
            crop=data.crop,
            district_state=data.district_state,
            soil=data.soil,
            rainfall=data.rainfall,
            temperature=data.temperature,
            humidity=data.humidity,
            ndvi=data.ndvi
        )
        return {
            "predicted_yield": res["predicted_yield"],
            "lower_bound": res["lower_bound"],
            "upper_bound": res["upper_bound"],
            "climate_impact": res["climate_impact"],
            "recommendations": res["recommendations"]
        }
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Inference processing failed: {e}")
