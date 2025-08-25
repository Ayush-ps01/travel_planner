import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Calendar, 
  MapPin, 
  Clock, 
  Utensils, 
  Camera,
  Download,
  Share2,
  Heart,
  Star,
  Navigation,
  Phone,
  IndianRupee
} from 'lucide-react';
import MapViewer from '../components/MapViewer';

const ItineraryViewer = () => {
  const { id } = useParams();
  const [itinerary, setItinerary] = useState(null);
  const [loading, setLoading] = useState(true);

  // Mock itinerary data for demo
  useEffect(() => {
    const mockItinerary = {
      id: id,
      city: 'Mumbai',
      totalBudget: 150000,
      days: 5,
      generatedAt: new Date().toISOString(),
      summary: 'A perfect 5-day Mumbai adventure combining culture, cuisine, and iconic landmarks.',
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
            },
            {
              time: 'evening',
              place: 'Worli Sea Face',
              description: 'Evening walk along the scenic promenade with city views',
              cost: 0,
              duration_minutes: 75,
              category: 'attraction'
            }
          ],
          dining: [
            {
              name: 'Bademiya',
              cuisine: 'Indian',
              description: 'Famous street food joint known for kebabs and rolls',
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
    }, 1000);
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen pt-32 pb-20 flex items-center justify-center">
        <div className="text-center">
          <div className="spinner-cyber mx-auto mb-4"></div>
          <p className="text-dark-300">Loading your itinerary...</p>
        </div>
      </div>
    );
  }

  if (!itinerary) {
    return (
      <div className="min-h-screen pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl font-cyber font-bold mb-4 text-red-500">
            Itinerary Not Found
          </h1>
          <p className="text-dark-300">The requested itinerary could not be found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="card-cyber p-8 mb-8"
        >
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-cyber font-bold mb-4">
                <span className="text-neon-teal">{itinerary.city}</span> Adventure
              </h1>
              <p className="text-xl text-dark-300 mb-4">{itinerary.summary}</p>
              <div className="flex flex-wrap gap-4 text-sm">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-neon-teal" />
                  <span className="text-dark-300">{itinerary.days} days</span>
                </div>
                <div className="flex items-center space-x-2">
                  <IndianRupee className="w-4 h-4 text-neon-teal" />
                  <span className="text-dark-300">Budget: ₹{itinerary.totalBudget.toLocaleString()}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-neon-teal" />
                  <span className="text-dark-300">{itinerary.city}, India</span>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <motion.button
                className="btn-cyber text-sm px-6 py-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Download className="w-4 h-4 mr-2" />
                Export PDF
              </motion.button>
              <motion.button
                className="px-6 py-2 border border-neon-teal/30 text-neon-teal rounded-lg hover:bg-neon-teal/10 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
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

        {/* Location Map */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="mb-8"
        >
          <MapViewer location={itinerary.city} height="300px" />
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
                            <span className="px-2 py-1 bg-dark-700 rounded text-xs text-dark-300">
                              {activity.category}
                            </span>
                          </div>
                          <h4 className="text-lg font-semibold text-white mb-1">
                            {activity.place}
                          </h4>
                          <p className="text-dark-300 mb-3">{activity.description}</p>
                          <div className="flex items-center space-x-4 text-sm text-dark-400">
                            <span className="flex items-center">
                              <Clock className="w-4 h-4 mr-1" />
                              {activity.duration_minutes} min
                            </span>
                                                          <span className="flex items-center">
                                <IndianRupee className="w-4 h-4 mr-1" />
                                ₹{activity.cost.toLocaleString()}
                              </span>
                          </div>
                        </div>
                        <div className="flex space-x-2 ml-4">
                          <button className="p-2 bg-dark-700 rounded-lg hover:bg-neon-teal/20 transition-colors duration-300">
                            <Navigation className="w-4 h-4 text-neon-teal" />
                          </button>
                          <button className="p-2 bg-dark-700 rounded-lg hover:bg-neon-teal/20 transition-colors duration-300">
                            <Heart className="w-4 h-4 text-neon-teal" />
                          </button>
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {day.dining.map((restaurant, index) => (
                    <div key={index} className="bg-dark-800/50 rounded-lg p-4 border border-neon-purple/30">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="text-lg font-semibold text-white mb-1">
                            {restaurant.name}
                          </h4>
                          <div className="flex items-center space-x-2 mb-2">
                            <span className="px-2 py-1 bg-neon-purple/20 text-neon-purple rounded text-xs">
                              {restaurant.cuisine}
                            </span>
                            <span className="text-dark-400 text-sm">
                              {restaurant.price_range}
                            </span>
                          </div>
                          <p className="text-dark-300 text-sm mb-3">{restaurant.description}</p>
                          <div className="text-neon-teal font-semibold">
                            ₹{restaurant.price_per_person.toLocaleString()} per person
                          </div>
                        </div>
                        <div className="flex space-x-2 ml-4">
                          <button className="p-2 bg-dark-700 rounded-lg hover:bg-neon-purple/20 transition-colors duration-300">
                            <Phone className="w-4 h-4 text-neon-purple" />
                          </button>
                          <button className="p-2 bg-dark-700 rounded-lg hover:bg-neon-purple/20 transition-colors duration-300">
                            <Heart className="w-4 h-4 text-neon-purple" />
                          </button>
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

