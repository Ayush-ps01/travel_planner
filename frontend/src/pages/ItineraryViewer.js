import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Utensils, 
  Camera,
  Download,
  Share2,
  Star
} from 'lucide-react';
import LeafletMap from '../components/LeafletMap';

// normalize helper
const norm = (s) => (s || '').trim();

const cityPresets = {
  mumbai: {
    recommendations: [
      'Visit Gateway of India early morning to avoid crowds',
      'Book Elephanta Caves tickets in advance',
      'Try local street food at Juhu Beach',
      'Use local trains and taxis for efficient transportation'
    ],
    days: [
      {
        summary: 'Arrival and Mumbai landmarks',
        activities: [
          { time: 'morning', place: 'Gateway of India', description: 'Iconic waterfront arch-monument by the harbour', cost: 0, duration_minutes: 120, category: 'attraction' },
          { time: 'afternoon', place: 'Chhatrapati Shivaji Terminus (UNESCO)', description: 'Victorian Gothic railway station and landmark', cost: 0, duration_minutes: 90, category: 'heritage' },
          { time: 'evening', place: 'Marine Drive', description: 'Sunset walk along the Queen’s Necklace', cost: 0, duration_minutes: 60, category: 'leisure' }
        ],
        dining: [ { name: 'Bademiya', cuisine: 'Indian', description: 'Famous kebabs near Colaba', price_per_person: 800, price_range: '₹₹' } ]
      },
      {
        summary: 'Culture and seaside vibes',
        activities: [
          { time: 'morning', place: 'Elephanta Caves', description: 'Ferry trip to ancient rock-cut caves', cost: 600, duration_minutes: 180, category: 'heritage' },
          { time: 'afternoon', place: 'Haji Ali Dargah', description: 'Sea-linked mosque with serene views', cost: 0, duration_minutes: 60, category: 'attraction' },
          { time: 'evening', place: 'Juhu Beach', description: 'Street food and beachside vibe', cost: 200, duration_minutes: 90, category: 'leisure' }
        ],
        dining: [ { name: 'Prithvi Cafe', cuisine: 'Cafe', description: 'Cozy bites in Juhu', price_per_person: 700, price_range: '₹₹' } ]
      }
    ]
  },
  delhi: {
    recommendations: [
      'Start early to beat traffic and queues',
      'Pre-book Red Fort and Qutub Minar tickets',
      'Try local chaat in Chandni Chowk',
      'Use Metro for faster travel across the city'
    ],
    days: [
      {
        summary: 'Heritage circuit',
        activities: [
          { time: 'morning', place: 'Qutub Minar', description: 'UNESCO-listed minaret complex', cost: 600, duration_minutes: 120, category: 'heritage' },
          { time: 'afternoon', place: 'Humayun’s Tomb', description: 'Mughal-era garden-tomb', cost: 600, duration_minutes: 90, category: 'heritage' },
          { time: 'evening', place: 'India Gate & Kartavya Path', description: 'Evening stroll at national landmarks', cost: 0, duration_minutes: 60, category: 'leisure' }
        ],
        dining: [ { name: 'Karim’s', cuisine: 'Mughlai', description: 'Old Delhi culinary classic', price_per_person: 600, price_range: '₹₹' } ]
      },
      {
        summary: 'Old Delhi flavors',
        activities: [
          { time: 'morning', place: 'Red Fort', description: 'Historic fort complex', cost: 600, duration_minutes: 120, category: 'heritage' },
          { time: 'afternoon', place: 'Jama Masjid', description: 'Grand mosque with views from minaret', cost: 0, duration_minutes: 60, category: 'religious' },
          { time: 'evening', place: 'Chandni Chowk', description: 'Food and bazaars exploration', cost: 300, duration_minutes: 120, category: 'food' }
        ],
        dining: [ { name: 'Paranthe Wali Gali', cuisine: 'North Indian', description: 'Stuffed parathas alley', price_per_person: 300, price_range: '₹' } ]
      }
    ]
  },
  jaipur: {
    recommendations: [
      'Buy composite ticket for major forts',
      'Hydrate and wear comfortable footwear',
      'Best light is early morning for photos',
      'Try traditional thali for dinner'
    ],
    days: [
      {
        summary: 'Royal forts and views',
        activities: [
          { time: 'morning', place: 'Amber Fort', description: 'Hilltop fort with intricate palaces', cost: 500, duration_minutes: 180, category: 'heritage' },
          { time: 'afternoon', place: 'Jaigarh Fort', description: 'Fort with cannon and city views', cost: 200, duration_minutes: 90, category: 'heritage' },
          { time: 'evening', place: 'Jal Mahal View Point', description: 'Lake palace views at sunset', cost: 0, duration_minutes: 45, category: 'leisure' }
        ],
        dining: [ { name: 'Laxmi Mishthan Bhandar (LMB)', cuisine: 'Rajasthani', description: 'Sweets and thali', price_per_person: 500, price_range: '₹₹' } ]
      },
      {
        summary: 'Pink City icons',
        activities: [
          { time: 'morning', place: 'City Palace & Jantar Mantar', description: 'Royal residence and observatory', cost: 700, duration_minutes: 180, category: 'heritage' },
          { time: 'afternoon', place: 'Hawa Mahal', description: 'Iconic palace of winds facade', cost: 200, duration_minutes: 60, category: 'heritage' },
          { time: 'evening', place: 'Bapu Bazaar', description: 'Shopping for handicrafts', cost: 0, duration_minutes: 90, category: 'shopping' }
        ],
        dining: [ { name: 'Chokhi Dhani', cuisine: 'Rajasthani', description: 'Cultural village dinner', price_per_person: 1200, price_range: '₹₹₹' } ]
      }
    ]
  }
};

function generateMockItinerary(city) {
  const key = norm(city).toLowerCase();
  const preset = cityPresets[key] || null;
  const base = {
    recommendations: [
      'Start early to maximize your day',
      'Pre-book popular attractions where possible',
      'Use local transport or walk for short distances',
      'Keep some buffer for traffic and queues'
    ],
    days: [
      {
        summary: `Discovering ${city} highlights`,
        activities: [
          { time: 'morning', place: `${city} City Museum`, description: `Learn about ${city} heritage and culture`, cost: 300, duration_minutes: 120, category: 'museum' },
          { time: 'afternoon', place: `${city} Central Market`, description: 'Local shopping and snacks', cost: 200, duration_minutes: 90, category: 'shopping' },
          { time: 'evening', place: `${city} Riverside Promenade`, description: 'Relaxing walk and sunset views', cost: 0, duration_minutes: 60, category: 'leisure' }
        ],
        dining: [ { name: `${city} Kitchen`, cuisine: 'Local', description: 'Popular local dishes', price_per_person: 600, price_range: '₹₹' } ]
      },
      {
        summary: `Culture and food in ${city}`,
        activities: [
          { time: 'morning', place: `${city} Fort or Old Town`, description: 'Historic quarter exploration', cost: 300, duration_minutes: 150, category: 'heritage' },
          { time: 'afternoon', place: `${city} Art District`, description: 'Galleries and street art', cost: 200, duration_minutes: 90, category: 'art' },
          { time: 'evening', place: `${city} Night Bazaar`, description: 'Souvenirs and street food', cost: 300, duration_minutes: 120, category: 'food' }
        ],
        dining: [ { name: `${city} Spice House`, cuisine: 'Indian', description: 'Regional specialties', price_per_person: 700, price_range: '₹₹' } ]
      }
    ]
  };
  const data = preset || base;
  return {
    totalBudget: 150000,
    days: data.days.length,
    generatedAt: new Date().toISOString(),
    summary: `A perfect ${data.days.length}-day ${city} adventure combining culture, cuisine, and iconic landmarks.`,
    totalCost: 142000,
    savings: 8000,
    recommendations: data.recommendations,
    itinerary: data.days.map((d, idx) => ({ day: idx + 1, ...d }))
  };
}

const ItineraryViewer = () => {
  const { id } = useParams();
  const loc = useLocation();
  const params = new URLSearchParams(loc.search);

  const [itinerary, setItinerary] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let city = params.get('city');
    if (!city) {
      try { city = sessionStorage.getItem('selectedCity') || ''; } catch {}
    }
    city = norm(city) || 'Mumbai';

    const mock = generateMockItinerary(city);
    const mockItinerary = { id, city, ...mock };

    setItinerary(mockItinerary);
    setLoading(false);
  }, [id, loc.search]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900 text-white">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center text-dark-300">Loading itinerary...</div>
        </div>
      </div>
    );
  }

  if (!itinerary) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900 text-white">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="card-cyber p-8 mb-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-cyber font-bold text-white">{itinerary.city} – {itinerary.days} Days</h1>
              <p className="text-dark-300 mt-2">Generated on {new Date(itinerary.generatedAt).toLocaleDateString()}</p>
            </div>
            <div className="flex space-x-3">
              <motion.button className="btn-cyber-secondary">
                <Download className="w-4 h-4 mr-2" />
                Export PDF
              </motion.button>
              <motion.button className="btn-cyber-secondary">
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Budget Summary */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="card-cyber p-6 mb-8"
        >
          <h2 className="text-2xl font-cyber font-semibold mb-4 text-neon-teal">
            Budget Overview
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-cyber font-bold text-neon-teal mb-1">
                ₹{itinerary.totalCost.toLocaleString()}
              </div>
              <div className="text-dark-400">Total Cost</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-cyber font-bold text-green-400 mb-1">
                ₹{itinerary.savings.toLocaleString()}
              </div>
              <div className="text-dark-400">Savings</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-cyber font-bold text-neon-purple mb-1">
                ₹{Math.round(itinerary.totalCost / itinerary.days).toLocaleString()}
              </div>
              <div className="text-dark-400">Per Day</div>
            </div>
          </div>
        </motion.div>

        {/* Real OSM Map (Leaflet) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="mb-8"
        >
          <LeafletMap query={itinerary.city} height="320px" />
        </motion.div>

        {/* Recommendations */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="card-cyber p-6 mb-8"
        >
          <h2 className="text-2xl font-cyber font-semibold mb-4 text-neon-teal">
            <Star className="w-6 h-6 inline mr-2" />
            Travel Tips & Recommendations
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {itinerary.recommendations.map((rec, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-neon-teal rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-dark-300">{rec}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Daily Itineraries */}
        <div className="space-y-8">
          {itinerary.itinerary.map((day, dayIndex) => (
            <motion.div
              key={day.day}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 + dayIndex * 0.1 }}
              className="card-cyber p-8"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-cyber font-bold text-neon-teal">
                  Day {day.day}
                </h2>
                <div className="text-dark-300 text-sm">
                  {day.activities.length} activities • {day.dining.length} dining options
                </div>
              </div>
              
              <p className="text-lg text-white mb-6 italic">"{day.summary}"</p>

              {/* Activities */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                  <Camera className="w-5 h-5 mr-2 text-neon-teal" />
                  Activities
                </h3>
                <div className="space-y-4">
                  {day.activities.map((activity, index) => (
                    <div key={index} className="bg-dark-800/50 rounded-lg p-4 border-l-4 border-neon-teal">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                              activity.time === 'morning' ? 'bg-yellow-500/20 text-yellow-400' :
                              activity.time === 'afternoon' ? 'bg-orange-500/20 text-orange-400' :
                              'bg-blue-500/20 text-blue-400'
                            }`}>
                              {activity.time}
                            </span>
                            <span className="text-white font-medium">{activity.place}</span>
                          </div>
                          <p className="text-dark-300">{activity.description}</p>
                        </div>
                        <div className="text-right ml-4">
                          <div className="text-neon-teal font-bold">₹{activity.cost.toLocaleString()}</div>
                          <div className="text-dark-400 text-sm">{activity.duration_minutes} mins</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Dining */}
              <div>
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                  <Utensils className="w-5 h-5 mr-2 text-neon-teal" />
                  Dining
                </h3>
                <div className="space-y-4">
                  {day.dining.map((dine, index) => (
                    <div key={index} className="bg-dark-800/50 rounded-lg p-4 border-l-4 border-neon-purple">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="text-white font-medium">{dine.name}</div>
                          <div className="text-dark-400 text-sm mb-1">{dine.cuisine}</div>
                          <p className="text-dark-300">{dine.description}</p>
                        </div>
                        <div className="text-right ml-4">
                          <div className="text-neon-purple font-bold">₹{dine.price_per_person.toLocaleString()}</div>
                          <div className="text-dark-400 text-sm">{dine.price_range}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ItineraryViewer;

