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

const ItineraryViewer = () => {
  const { id } = useParams();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const cityParam = params.get('city');

  const [itinerary, setItinerary] = useState(null);
  const [loading, setLoading] = useState(true);

  // Mock itinerary data for demo
  useEffect(() => {
    const city = cityParam && cityParam.trim() ? cityParam : 'Mumbai';
    const mockItinerary = {
      id: id,
      city,
      totalBudget: 150000,
      days: 5,
      generatedAt: new Date().toISOString(),
      summary: `A perfect 5-day ${city} adventure combining culture, cuisine, and iconic landmarks.`,
      totalCost: 142000,
      savings: 8000,
      recommendations: [
        'Visit Gateway of India early morning to avoid crowds',
        'Book Elephanta Caves tickets in advance',
        'Try local street food at Juhu Beach',
        'Use local trains and taxis for efficient transportation'
      ],
      itinerary: [
        {
          day: 1,
          summary: 'Arrival and Mumbai landmarks',
          activities: [
            {
              time: 'morning',
              place: 'Eiffel Tower',
              description: 'Start your Paris adventure with the iconic symbol of the city',
              cost: 2000,
              duration_minutes: 120,
              category: 'attraction'
            },
            {
              time: 'afternoon',
              place: 'Gateway of India',
              description: 'Marvel at this historic monument and enjoy panoramic city views',
              cost: 0,
              duration_minutes: 90,
              category: 'attraction'
            },
            {
              time: 'evening',
              place: 'Marine Drive',
              description: 'Stroll down the famous promenade and enjoy evening atmosphere',
              cost: 0,
              duration_minutes: 60,
              category: 'shopping'
            }
          ],
          dining: [
            {
              name: 'Le Petit Bistrot',
              cuisine: 'French',
              description: 'Authentic French bistro with classic dishes',
              price_per_person: 1500,
              price_range: '₹₹'
            }
          ]
        },
        {
          day: 2,
          summary: 'Art, culture and heritage immersion',
          activities: [
            {
              time: 'morning',
              place: 'Chhatrapati Shivaji Maharaj Vastu Sangrahalaya',
              description: 'Explore Mumbai\'s premier museum with rich cultural heritage',
              cost: 500,
              duration_minutes: 180,
              category: 'museum'
            },
            {
              time: 'afternoon',
              place: 'Haji Ali Dargah',
              description: 'Visit this beautiful mosque located on an islet off the coast',
              cost: 0,
              duration_minutes: 60,
              category: 'attraction'
            }
          ],
          dining: [
            {
              name: 'Bademiya',
              cuisine: 'Indian',
              description: 'Famous kebab and North Indian eatery',
              price_per_person: 800,
              price_range: '₹₹'
            }
          ]
        }
      ]
    };

    setTimeout(() => {
      setItinerary(mockItinerary);
      setLoading(false);
    }, 800);
  }, [id, cityParam]);

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

