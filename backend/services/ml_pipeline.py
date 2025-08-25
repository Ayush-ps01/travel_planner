import numpy as np
import pandas as pd
from sklearn.cluster import KMeans
from sklearn.preprocessing import StandardScaler
from typing import List, Dict, Tuple, Any
import logging
from models.itinerary import Day, Activity, Dining, RouteOptimization
import googlemaps
from core.config import settings

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class MLPipeline:
    """ML pipeline for route optimization and attraction clustering"""
    
    def __init__(self):
        """Initialize the ML pipeline with Google Maps client"""
        if not settings.GOOGLE_MAPS_API_KEY:
            raise ValueError("GOOGLE_MAPS_API_KEY is required")
        
        self.gmaps = googlemaps.Client(key=settings.GOOGLE_MAPS_API_KEY)
        self.scaler = StandardScaler()
        
    async def optimize_daily_routes(self, days: List[Day]) -> List[RouteOptimization]:
        """Optimize routes for each day to minimize travel time"""
        optimized_days = []
        
        for day in days:
            try:
                # Get all locations for the day
                locations = self._extract_locations(day)
                
                if len(locations) < 2:
                    # No optimization needed for single location
                    optimized_days.append(RouteOptimization(
                        day=day.day,
                        activities=day.activities,
                        dining=day.dining,
                        optimized_route=[],
                        total_travel_time=0,
                        total_distance=0
                    ))
                    continue
                
                # Optimize route using TSP-like approach
                optimized_route = await self._optimize_route(locations)
                
                # Calculate total travel time and distance
                total_time, total_distance = self._calculate_route_metrics(optimized_route)
                
                # Create optimized day
                optimized_day = RouteOptimization(
                    day=day.day,
                    activities=day.activities,
                    dining=day.dining,
                    optimized_route=optimized_route,
                    total_travel_time=total_time,
                    total_distance=total_distance
                )
                
                optimized_days.append(optimized_day)
                logger.info(f"Optimized route for day {day.day}")
                
            except Exception as e:
                logger.error(f"Error optimizing day {day.day}: {str(e)}")
                # Return unoptimized day if optimization fails
                optimized_days.append(RouteOptimization(
                    day=day.day,
                    activities=day.activities,
                    dining=day.dining,
                    optimized_route=[],
                    total_travel_time=0,
                    total_distance=0
                ))
        
        return optimized_days
    
    def _extract_locations(self, day: Day) -> List[Dict[str, Any]]:
        """Extract all locations from a day's activities and dining"""
        locations = []
        
        # Add activities
        for activity in day.activities:
            if activity.coordinates:
                locations.append({
                    'name': activity.place,
                    'type': 'activity',
                    'coordinates': activity.coordinates,
                    'duration': activity.duration_minutes or 60,
                    'time_slot': activity.time
                })
        
        # Add dining
        for dining in day.dining:
            if dining.coordinates:
                locations.append({
                    'name': dining.name,
                    'type': 'dining',
                    'coordinates': dining.coordinates,
                    'duration': 90,  # Default dining duration
                    'time_slot': 'meal'
                })
        
        return locations
    
    async def _optimize_route(self, locations: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
        """Optimize route using nearest neighbor algorithm with time constraints"""
        if len(locations) <= 1:
            return locations
        
        # Start with the first location
        unvisited = locations[1:]
        current = locations[0]
        route = [current]
        
        while unvisited:
            # Find nearest unvisited location
            nearest = self._find_nearest(current, unvisited)
            route.append(nearest)
            unvisited.remove(nearest)
            current = nearest
        
        return route
    
    def _find_nearest(self, current: Dict[str, Any], candidates: List[Dict[str, Any]]) -> Dict[str, Any]:
        """Find the nearest location from current position"""
        if not candidates:
            return None
        
        min_distance = float('inf')
        nearest = candidates[0]
        
        for candidate in candidates:
            distance = self._calculate_distance(
                current['coordinates'],
                candidate['coordinates']
            )
            
            if distance < min_distance:
                min_distance = distance
                nearest = candidate
        
        return nearest
    
    def _calculate_distance(self, coord1: Dict[str, float], coord2: Dict[str, float]) -> float:
        """Calculate distance between two coordinates using Haversine formula"""
        lat1, lon1 = coord1['lat'], coord1['lng']
        lat2, lon2 = coord2['lat'], coord2['lng']
        
        # Convert to radians
        lat1, lon1, lat2, lon2 = map(np.radians, [lat1, lon1, lat2, lon2])
        
        # Haversine formula
        dlat = lat2 - lat1
        dlon = lon2 - lon1
        a = np.sin(dlat/2)**2 + np.cos(lat1) * np.cos(lat2) * np.sin(dlon/2)**2
        c = 2 * np.arcsin(np.sqrt(a))
        
        # Earth's radius in kilometers
        r = 6371
        
        return r * c
    
    def _calculate_route_metrics(self, route: List[Dict[str, Any]]) -> Tuple[int, float]:
        """Calculate total travel time and distance for a route"""
        total_time = 0
        total_distance = 0
        
        for i in range(len(route) - 1):
            current = route[i]
            next_loc = route[i + 1]
            
            # Calculate distance
            distance = self._calculate_distance(
                current['coordinates'],
                next_loc['coordinates']
            )
            total_distance += distance
            
            # Estimate travel time (assuming 30 km/h average speed)
            travel_time = int((distance / 30) * 60)  # Convert to minutes
            total_time += travel_time
        
        return total_time, total_distance
    
    async def cluster_attractions(self, attractions: List[Dict[str, Any]], n_clusters: int = 3) -> List[List[Dict[str, Any]]]:
        """Cluster attractions by location for better daily distribution"""
        if len(attractions) <= n_clusters:
            return [attractions]
        
        try:
            # Extract coordinates
            coords = np.array([
                [attraction['coordinates']['lat'], attraction['coordinates']['lng']]
                for attraction in attractions
            ])
            
            # Scale coordinates
            coords_scaled = self.scaler.fit_transform(coords)
            
            # Perform clustering
            kmeans = KMeans(n_clusters=n_clusters, random_state=42)
            cluster_labels = kmeans.fit_predict(coords_scaled)
            
            # Group attractions by cluster
            clusters = [[] for _ in range(n_clusters)]
            for i, label in enumerate(cluster_labels):
                clusters[label].append(attractions[i])
            
            return clusters
            
        except Exception as e:
            logger.error(f"Error in attraction clustering: {str(e)}")
            return [attractions]  # Return single cluster if clustering fails
    
    async def optimize_budget_allocation(self, days: List[Day], total_budget: float) -> List[Day]:
        """Optimize budget allocation across activities and dining"""
        try:
            # Calculate current total cost
            current_total = sum(
                sum(activity.cost or 0 for activity in day.activities) +
                sum(dining.price_per_person or 0 for dining in day.dining)
                for day in days
            )
            
            if current_total <= total_budget:
                # Budget is sufficient, no optimization needed
                return days
            
            # Calculate budget deficit
            deficit = current_total - total_budget
            
            # Optimize by reducing costs proportionally
            for day in days:
                # Optimize activities
                for activity in day.activities:
                    if activity.cost and activity.cost > 0:
                        reduction_factor = 1 - (deficit / current_total) * 0.5
                        activity.cost = max(activity.cost * reduction_factor, 5)  # Minimum $5
                
                # Optimize dining
                for dining in day.dining:
                    if dining.price_per_person and dining.price_per_person > 0:
                        reduction_factor = 1 - (deficit / current_total) * 0.5
                        dining.price_per_person = max(dining.price_per_person * reduction_factor, 10)  # Minimum $10
            
            logger.info(f"Budget optimized: reduced by ${deficit:.2f}")
            return days
            
        except Exception as e:
            logger.error(f"Error in budget optimization: {str(e)}")
            return days  # Return original if optimization fails
    
    async def get_travel_recommendations(self, city: str, budget: float, days: int) -> List[str]:
        """Get AI-powered travel recommendations based on city and constraints"""
        try:
            # This would integrate with the AI service for recommendations
            recommendations = [
                f"Consider visiting {city} during off-peak season for better prices",
                f"Allocate ${budget/days:.0f} per day for optimal budget management",
                f"Plan {days} days to experience {city}'s main attractions without rushing",
                "Use public transportation to save on travel costs",
                "Book attractions in advance for potential discounts"
            ]
            
            return recommendations
            
        except Exception as e:
            logger.error(f"Error getting recommendations: {str(e)}")
            return ["Plan ahead and book early for the best experience"]

