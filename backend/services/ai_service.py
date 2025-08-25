import google.generativeai as genai
from typing import Dict, Any, List
import json
import logging
from core.config import settings
from models.itinerary import ItineraryRequest, Day, Activity, Dining

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class AIService:
    """Service for AI-powered itinerary generation using Gemini API"""
    
    def __init__(self):
        """Initialize the AI service with Gemini"""
        if not settings.GEMINI_API_KEY:
            raise ValueError("GEMINI_API_KEY is required")
        
        genai.configure(api_key=settings.GEMINI_API_KEY)
        self.model = genai.GenerativeModel(settings.GEMINI_MODEL)
        
    async def generate_itinerary(self, request: ItineraryRequest) -> List[Day]:
        """
        Generate a complete itinerary using prompt chaining
        
        Step 1: Generate raw itinerary
        Step 2: Refine into structured JSON
        """
        try:
            # Step 1: Generate raw itinerary
            raw_itinerary = await self._generate_raw_itinerary(request)
            logger.info(f"Generated raw itinerary for {request.city}")
            
            # Step 2: Refine into structured JSON
            structured_itinerary = await self._refine_to_json(raw_itinerary, request)
            logger.info(f"Refined itinerary to structured format")
            
            return structured_itinerary
            
        except Exception as e:
            logger.error(f"Error generating itinerary: {str(e)}")
            raise Exception(f"Failed to generate itinerary: {str(e)}")
    
    async def _generate_raw_itinerary(self, request: ItineraryRequest) -> str:
        """Step 1: Generate raw day-by-day itinerary using Gemini"""
        
        planner_prompt = f"""
        You are an expert travel planner AI with deep knowledge of destinations worldwide.
        
        Generate a detailed travel itinerary for the following request:
        
        City: {request.city}
        Budget: ${request.budget}
        Days: {request.days}
        Interests: {', '.join(request.interests) if request.interests else 'General sightseeing'}
        Dietary Restrictions: {', '.join(request.dietary_restrictions) if request.dietary_restrictions else 'None'}
        Travel Style: {request.travel_style}
        Group Size: {request.group_size}
        
        Requirements:
        - Create a balanced itinerary for each day (morning, afternoon, evening)
        - Include must-visit attractions and hidden gems
        - Suggest local dining options within budget
        - Consider travel time between locations
        - Balance cultural, historical, and entertainment activities
        - Include estimated costs for activities and dining
        - Make it personal and engaging
        
        Return the itinerary in natural language format, organized by day.
        Be specific about locations, timing, and costs.
        """
        
        try:
            response = self.model.generate_content(planner_prompt)
            return response.text
        except Exception as e:
            logger.error(f"Error in raw itinerary generation: {str(e)}")
            raise Exception(f"Failed to generate raw itinerary: {str(e)}")
    
    async def _refine_to_json(self, raw_itinerary: str, request: ItineraryRequest) -> List[Day]:
        """Step 2: Convert raw itinerary to structured JSON format"""
        
        refiner_prompt = f"""
        Take the following travel itinerary and convert it into structured JSON format.
        
        Raw Itinerary:
        {raw_itinerary}
        
        Convert this into a JSON array where each day has the following structure:
        {{
            "day": <day_number>,
            "summary": "<brief summary of the day>",
            "activities": [
                {{
                    "time": "<morning|afternoon|evening>",
                    "place": "<location name>",
                    "description": "<brief description>",
                    "cost": <estimated_cost_in_usd>,
                    "duration_minutes": <estimated_duration>,
                    "category": "<attraction|museum|park|shopping|etc>"
                }}
            ],
            "dining": [
                {{
                    "name": "<restaurant name>",
                    "cuisine": "<cuisine type>",
                    "description": "<brief description>",
                    "price_per_person": <estimated_price_per_person>,
                    "price_range": "<$|$$|$$$>"
                }}
            ]
        }}
        
        Important:
        - Ensure all costs are in USD
        - Use proper JSON formatting
        - Include realistic durations and costs
        - Make sure each day has activities for all three time periods
        - Include at least 2-3 activities per day and 1-2 dining options
        - Return ONLY the JSON array, no additional text
        """
        
        try:
            response = self.model.generate_content(refiner_prompt)
            json_text = response.text.strip()
            
            # Clean up the response to extract just the JSON
            if json_text.startswith("```json"):
                json_text = json_text[7:]
            if json_text.endswith("```"):
                json_text = json_text[:-3]
            
            json_text = json_text.strip()
            
            # Parse the JSON response
            itinerary_data = json.loads(json_text)
            
            # Convert to Day objects
            days = []
            for day_data in itinerary_data:
                activities = [
                    Activity(**activity) for activity in day_data.get("activities", [])
                ]
                dining = [
                    Dining(**dining) for dining in day_data.get("dining", [])
                ]
                
                day = Day(
                    day=day_data["day"],
                    summary=day_data["summary"],
                    activities=activities,
                    dining=dining
                )
                days.append(day)
            
            return days
            
        except json.JSONDecodeError as e:
            logger.error(f"JSON parsing error: {str(e)}")
            logger.error(f"Raw response: {response.text}")
            raise Exception("Failed to parse AI response into JSON format")
        except Exception as e:
            logger.error(f"Error in JSON refinement: {str(e)}")
            raise Exception(f"Failed to refine itinerary: {str(e)}")
    
    async def enhance_itinerary(self, days: List[Day], request: ItineraryRequest) -> List[Day]:
        """Enhance itinerary with additional details and recommendations"""
        
        enhancement_prompt = f"""
        Enhance the following travel itinerary with additional details and local insights:
        
        City: {request.city}
        Budget: ${request.budget}
        Days: {request.days}
        
        Current Itinerary:
        {json.dumps([day.dict() for day in days], indent=2)}
        
        Add the following enhancements:
        1. Local tips and insider knowledge
        2. Best times to visit each attraction
        3. Alternative options for bad weather
        4. Cultural etiquette and local customs
        5. Transportation tips between locations
        6. Budget-saving alternatives
        
        Return the enhanced itinerary in the same JSON format with additional fields.
        """
        
        try:
            response = self.model.generate_content(enhancement_prompt)
            # Process enhancement response and update days
            # This would parse the response and merge with existing data
            return days
        except Exception as e:
            logger.error(f"Error enhancing itinerary: {str(e)}")
            return days  # Return original if enhancement fails

