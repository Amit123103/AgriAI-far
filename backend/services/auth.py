import time
import jwt
from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel

router = APIRouter(prefix="/auth", tags=["Authentication"])

SECRET_KEY = "AgriAiSecretSuperSecureTokenSecret"
ALGORITHM = "HS256"

class LoginRequest(BaseModel):
    username: str
    password: str

@router.post("/login")
def login(data: LoginRequest):
    if data.username == "farmer" and data.password == "agriai123":
        payload = {
            "sub": data.username,
            "exp": time.time() + 3600
        }
        token = jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)
        return {"access_token": token, "token_type": "bearer"}
    else:
        raise HTTPException(status_code=401, detail="Invalid username or password.")
