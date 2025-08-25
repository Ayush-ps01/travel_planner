from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any
from datetime import datetime
from enum import Enum

class TimeOfDay(str, Enum):
    """Time of day for activities"""
    MORNING = "morning"
    AFTERNOON = "afternoon"
    EVENING = "evening"

class Activity(BaseModel):
    """Individual activity model"""
    time: TimeOfDay
    place: str
    description: str
    map_link: Optional[str] = None
    cost: Optional[float] = None
    duration_minutes: Optional[int] = None
    category: Optional[str] = None  # attraction, museum, park, etc.
    coordinates: Optional[Dict[str, float]] = None  # lat, lng

class Dining(BaseModel):
    """Dining option model"""
    name: str
    cuisine: str
    description: Optional[str] = None
    map_link: Optional[str] = None
    price_range: Optional[str] = None  # $, $$, $$$
    price_per_person: Optional[float] = None
    coordinates: Optional[Dict[str, float]] = None
    rating: Optional[float] = None

class Day(BaseModel):
    """Single day itinerary model"""
    day: int
    summary: str
    activities: List[Activity]
    dining: List[Dining]
    total_cost: Optional[float] = None
    travel_time_minutes: Optional[int] = None

class ItineraryRequest(BaseModel):
    """Request model for generating itineraries"""
    city: str = Field(..., description="Destination city")
    budget: float = Field(..., description="Total budget in USD")
    days: int = Field(..., description="Number of travel days")
    interests: Optional[List[str]] = Field(default=[], description="Travel interests")
    dietary_restrictions: Optional[List[str]] = Field(default=[], description="Dietary restrictions")
    travel_style: Optional[str] = Field(default="balanced", description="Travel style: budget, luxury, balanced")
    group_size: Optional[int] = Field(default=1, description="Number of travelers")

class ItineraryResponse(BaseModel):
    """Response model for generated itineraries"""
    id: str
    city: str
    total_budget: float
    days: int
    generated_at: datetime
    itinerary: List[Day]
    summary: str
    total_cost: float
    savings: Optional[float] = None
    recommendations: Optional[List[str]] = None

class RouteOptimization(BaseModel):
    """Route optimization request/response"""
    day: int
    activities: List[Activity]
    dining: List[Dining]
    optimized_route: List[Dict[str, Any]]
    total_travel_time: int
    total_distance: float

class BudgetBreakdown(BaseModel):
    """Budget breakdown model"""
    activities_cost: float
    dining_cost: float
    transportation_cost: float
    accommodation_cost: Optional[float] = None
    total_cost: float
    remaining_budget: float
    cost_per_day: float

