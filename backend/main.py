from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import uvicorn
from dotenv import load_dotenv
import os

from routers import itinerary, maps, export
from core.config import settings

# Load environment variables
load_dotenv()

# Create FastAPI app
app = FastAPI(
    title="AtlasMind API",
    description="AI-Powered Travel Planner with Gemini AI and Google Maps",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(itinerary.router, prefix="/api/v1", tags=["Itinerary"])
app.include_router(maps.router, prefix="/api/v1", tags=["Maps"])
app.include_router(export.router, prefix="/api/v1", tags=["Export"])

@app.get("/")
async def root():
    """Root endpoint with app information"""
    return {
        "message": "🌌 Welcome to AtlasMind API",
        "version": "1.0.0",
        "description": "AI-Powered Travel Planner",
        "docs": "/docs"
    }

@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {"status": "healthy", "service": "AtlasMind API"}

@app.exception_handler(HTTPException)
async def http_exception_handler(request, exc):
    """Custom HTTP exception handler"""
    return JSONResponse(
        status_code=exc.status_code,
        content={"error": exc.detail, "status_code": exc.status_code}
    )

if __name__ == "__main__":
    uvicorn.run(
        "main:app",
        host=settings.HOST,
        port=settings.PORT,
        reload=settings.DEBUG
    )

