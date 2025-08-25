from fastapi import APIRouter, HTTPException, Query
from typing import List, Dict, Any, Optional
import googlemaps
from core.config import settings

router = APIRouter()

# Initialize Google Maps client
gmaps = googlemaps.Client(key=settings.GOOGLE_MAPS_API_KEY)

@router.get("/places/search")
async def search_places(
    query: str = Query(..., description="Search query for places"),
    location: Optional[str] = Query(None, description="Location bias (city name)"),
    type: Optional[str] = Query(None, description="Place type filter"),
    radius: int = Query(50000, description="Search radius in meters")
):
    """
    Search for places using Google Places API
    """
    try:
        # Build search parameters
        search_params = {
            'query': query,
            'radius': radius
        }
        
        if location:
            # Geocode the location for bias
            geocode_result = gmaps.geocode(location)
            if geocode_result:
                search_params['location'] = geocode_result[0]['geometry']['location']
        
        if type:
            search_params['type'] = type
        
        # Perform search
        places_result = gmaps.places(**search_params)
        
        # Format results
        places = []
        for place in places_result.get('results', []):
            places.append({
                'place_id': place.get('place_id'),
                'name': place.get('name'),
                'formatted_address': place.get('formatted_address'),
                'rating': place.get('rating'),
                'types': place.get('types'),
                'geometry': place.get('geometry'),
                'photos': place.get('photos', []),
                'price_level': place.get('price_level')
            })
        
        return {
            'query': query,
            'results': places,
            'total_results': len(places)
        }
        
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Failed to search places: {str(e)}"
        )

@router.get("/places/details/{place_id}")
async def get_place_details(place_id: str):
    """
    Get detailed information about a specific place
    """
    try:
        place_details = gmaps.place(
            place_id,
            fields=['name', 'formatted_address', 'geometry', 'rating', 'types', 
                   'photos', 'price_level', 'opening_hours', 'website', 'formatted_phone_number']
        )
        
        return place_details.get('result', {})
        
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Failed to get place details: {str(e)}"
        )

@router.get("/directions")
async def get_directions(
    origin: str = Query(..., description="Starting location"),
    destination: str = Query(..., description="Ending location"),
    mode: str = Query("driving", description="Travel mode: driving, walking, bicycling, transit")
):
    """
    Get directions between two locations
    """
    try:
        directions_result = gmaps.directions(origin, destination, mode=mode)
        
        if not directions_result:
            raise HTTPException(
                status_code=404,
                detail="No route found between the specified locations"
            )
        
        route = directions_result[0]
        leg = route['legs'][0]
        
        return {
            'origin': leg['start_address'],
            'destination': leg['end_address'],
            'distance': leg['distance']['text'],
            'duration': leg['duration']['text'],
            'steps': [
                {
                    'instruction': step['html_instructions'],
                    'distance': step['distance']['text'],
                    'duration': step['duration']['text']
                }
                for step in leg['steps']
            ]
        }
        
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Failed to get directions: {str(e)}"
        )

@router.get("/geocode")
async def geocode_address(address: str = Query(..., description="Address to geocode")):
    """
    Convert address to coordinates
    """
    try:
        geocode_result = gmaps.geocode(address)
        
        if not geocode_result:
            raise HTTPException(
                status_code=404,
                detail="Address not found"
            )
        
        location = geocode_result[0]['geometry']['location']
        
        return {
            'address': address,
            'coordinates': location,
            'formatted_address': geocode_result[0]['formatted_address']
        }
        
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Failed to geocode address: {str(e)}"
        )

@router.get("/reverse-geocode")
async def reverse_geocode(
    lat: float = Query(..., description="Latitude"),
    lng: float = Query(..., description="Longitude")
):
    """
    Convert coordinates to address
    """
    try:
        reverse_result = gmaps.reverse_geocode((lat, lng))
        
        if not reverse_result:
            raise HTTPException(
                status_code=404,
                detail="No address found for coordinates"
            )
        
        return {
            'coordinates': {'lat': lat, 'lng': lng},
            'formatted_address': reverse_result[0]['formatted_address'],
            'address_components': reverse_result[0]['address_components']
        }
        
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Failed to reverse geocode: {str(e)}"
        )

@router.get("/nearby-restaurants")
async def get_nearby_restaurants(
    lat: float = Query(..., description="Latitude"),
    lng: float = Query(..., description="Longitude"),
    radius: int = Query(5000, description="Search radius in meters"),
    price_level: Optional[int] = Query(None, description="Price level (0-4)")
):
    """
    Find nearby restaurants
    """
    try:
        search_params = {
            'location': (lat, lng),
            'radius': radius,
            'type': 'restaurant'
        }
        
        if price_level is not None:
            search_params['price'] = price_level
        
        places_result = gmaps.places_nearby(**search_params)
        
        restaurants = []
        for place in places_result.get('results', []):
            restaurants.append({
                'name': place.get('name'),
                'place_id': place.get('place_id'),
                'rating': place.get('rating'),
                'price_level': place.get('price_level'),
                'types': place.get('types'),
                'vicinity': place.get('vicinity'),
                'geometry': place.get('geometry')
            })
        
        return {
            'location': {'lat': lat, 'lng': lng},
            'radius': radius,
            'restaurants': restaurants,
            'total_results': len(restaurants)
        }
        
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Failed to find nearby restaurants: {str(e)}"
        )

@router.get("/map-embed-url")
async def get_map_embed_url(
    center: str = Query(..., description="Center location (lat,lng or address)"),
    zoom: int = Query(12, description="Map zoom level"),
    size: str = Query("600x450", description="Map size (widthxheight)")
):
    """
    Generate Google Maps embed URL
    """
    try:
        # If center is coordinates, use as is; otherwise geocode
        if ',' in center and all(c.replace('.', '').replace('-', '').isdigit() for c in center.split(',')):
            center_coords = center
        else:
            geocode_result = gmaps.geocode(center)
            if not geocode_result:
                raise HTTPException(status_code=400, detail="Invalid center location")
            location = geocode_result[0]['geometry']['location']
            center_coords = f"{location['lat']},{location['lng']}"
        
        embed_url = (
            f"https://www.google.com/maps/embed/v1/view?"
            f"key={settings.GOOGLE_MAPS_API_KEY}&"
            f"center={center_coords}&"
            f"zoom={zoom}&"
            f"size={size}"
        )
        
        return {
            'embed_url': embed_url,
            'center': center_coords,
            'zoom': zoom,
            'size': size
        }
        
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Failed to generate map embed URL: {str(e)}"
        )

@router.get("/health")
async def health_check():
    """Health check for maps service"""
    return {"status": "healthy", "service": "Google Maps Integration"}

