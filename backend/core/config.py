from pydantic_settings import BaseSettings
from typing import Optional
import os

class Settings(BaseSettings):
    """Application settings"""
    
    # App Configuration
    APP_NAME: str = "AtlasMind"
    DEBUG: bool = True
    HOST: str = "0.0.0.0"
    PORT: int = 8000
    
    # API Keys
    GEMINI_API_KEY: Optional[str] = None
    GOOGLE_MAPS_API_KEY: Optional[str] = None
    
    # Security
    SECRET_KEY: str = "atlasmind-secret-key-change-in-production"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    
    # AI Configuration
    GEMINI_MODEL: str = "gemini-pro"
    MAX_TOKENS: int = 4000
    TEMPERATURE: float = 0.7
    
    # Maps Configuration
    MAPS_LANGUAGE: str = "en"
    MAPS_REGION: str = "US"
    
    # ML Pipeline Configuration
    CLUSTERING_ALGORITHM: str = "kmeans"
    MAX_DAILY_ACTIVITIES: int = 8
    MAX_DAILY_DINING: int = 3
    
    class Config:
        env_file = ".env"
        case_sensitive = True

# Create settings instance
settings = Settings()

# Validate required settings
def validate_settings():
    """Validate that required settings are configured"""
    if not settings.GEMINI_API_KEY:
        print("⚠️  Warning: GEMINI_API_KEY not set")
    
    if not settings.GOOGLE_MAPS_API_KEY:
        print("⚠️  Warning: GOOGLE_MAPS_API_KEY not set")
    
    if settings.DEBUG:
        print(f"🚀 {settings.APP_NAME} starting in DEBUG mode")
        print(f"📍 Host: {settings.HOST}:{settings.PORT}")
        print(f"🤖 Gemini Model: {settings.GEMINI_MODEL}")

# Validate on import
validate_settings()

