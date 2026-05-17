from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.services.auth import router as auth_router
from backend.services.disease import router as disease_router
from backend.services.yield_service import router as yield_router
from backend.services.recommendation import router as rec_router

app = FastAPI(title="AgriAI Enterprise Platform API", version="2.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Route the advanced production microservices
app.include_router(auth_router)
app.include_router(disease_router)
app.include_router(yield_router)
app.include_router(rec_router)

@app.get("/health")
def health():
    return {"status": "healthy", "version": "2.0.0"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
