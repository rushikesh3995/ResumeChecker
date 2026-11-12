
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routes.interview import router as interview_router

app = FastAPI(
    title="AI Mock Interview API",
    description="AI-powered mock interview backend",
    version="1.0.0"
)

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://resumechecker-ai.vercel.app",
        "http://localhost:5173",
        "http://localhost:3000"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register interview routes
app.include_router(interview_router)


@app.get("/")
def home():
    return {
        "success": True,
        "message": "AI Mock Interview API is running!"
    }


@app.get("/health")
def health():
    return {"status": "healthy"}

