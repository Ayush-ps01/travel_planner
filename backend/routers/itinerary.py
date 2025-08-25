from fastapi import APIRouter, HTTPException, Depends
from typing import List
import uuid
from datetime import datetime

from models.itinerary import (
    ItineraryRequest, 
    ItineraryResponse, 
    Day, 
    RouteOptimization,
    BudgetBreakdown
)
from services.ai_service import AIService
from services.ml_pipeline import MLPipeline

router = APIRouter()

# Initialize services
ai_service = AIService()
ml_pipeline = MLPipeline()

@router.post("/generate-itinerary", response_model=ItineraryResponse)
async def generate_itinerary(request: ItineraryRequest):
    """
    Generate a complete AI-powered travel itinerary
    
    Uses Gemini API with prompt chaining to create personalized travel plans
    """
    try:
        # Generate itinerary using AI service
        days = await ai_service.generate_itinerary(request)
        
        # Optimize routes using ML pipeline
        optimized_routes = await ml_pipeline.optimize_daily_routes(days)
        
        # Optimize budget allocation
        optimized_days = await ml_pipeline.optimize_budget_allocation(days, request.budget)
        
        # Calculate total cost
        total_cost = sum(
            sum(activity.cost or 0 for activity in day.activities) +
            sum(dining.price_per_person or 0 for dining in day.dining)
            for day in optimized_days
        )
        
        # Create response
        response = ItineraryResponse(
            id=str(uuid.uuid4()),
            city=request.city,
            total_budget=request.budget,
            days=request.days,
            generated_at=datetime.utcnow(),
            itinerary=optimized_days,
            summary=f"AI-generated {request.days}-day itinerary for {request.city}",
            total_cost=total_cost,
            savings=max(0, request.budget - total_cost),
            recommendations=await ml_pipeline.get_travel_recommendations(
                request.city, request.budget, request.days
            )
        )
        
        return response
        
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Failed to generate itinerary: {str(e)}"
        )

@router.post("/optimize-route", response_model=List[RouteOptimization])
async def optimize_route(days: List[Day]):
    """
    Optimize daily routes to minimize travel time and distance
    """
    try:
        optimized_routes = await ml_pipeline.optimize_daily_routes(days)
        return optimized_routes
        
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Failed to optimize routes: {str(e)}"
        )

@router.post("/enhance-itinerary", response_model=List[Day])
async def enhance_itinerary(days: List[Day], request: ItineraryRequest):
    """
    Enhance itinerary with additional details and local insights
    """
    try:
        enhanced_days = await ai_service.enhance_itinerary(days, request)
        return enhanced_days
        
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Failed to enhance itinerary: {str(e)}"
        )

@router.post("/budget-breakdown", response_model=BudgetBreakdown)
async def get_budget_breakdown(days: List[Day], total_budget: float):
    """
    Get detailed budget breakdown for the itinerary
    """
    try:
        activities_cost = sum(
            sum(activity.cost or 0 for activity in day.activities)
            for day in days
        )
        
        dining_cost = sum(
            sum(dining.price_per_person or 0 for dining in day.dining)
            for day in days
        )
        
        # Estimate transportation cost (10% of total budget)
        transportation_cost = total_budget * 0.1
        
        total_cost = activities_cost + dining_cost + transportation_cost
        remaining_budget = total_budget - total_cost
        cost_per_day = total_cost / len(days) if days else 0
        
        breakdown = BudgetBreakdown(
            activities_cost=activities_cost,
            dining_cost=dining_cost,
            transportation_cost=transportation_cost,
            total_cost=total_cost,
            remaining_budget=remaining_budget,
            cost_per_day=cost_per_day
        )
        
        return breakdown
        
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Failed to calculate budget breakdown: {str(e)}"
        )

@router.get("/recommendations/{city}")
async def get_recommendations(city: str, budget: float, days: int):
    """
    Get travel recommendations for a specific city
    """
    try:
        recommendations = await ml_pipeline.get_travel_recommendations(city, budget, days)
        return {
            "city": city,
            "budget": budget,
            "days": days,
            "recommendations": recommendations
        }
        
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Failed to get recommendations: {str(e)}"
        )

@router.get("/health")
async def health_check():
    """Health check for itinerary service"""
    return {"status": "healthy", "service": "Itinerary Generation"}

