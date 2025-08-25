import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { 
  MapPin, 
  Calendar, 
  Users, 
  Brain, 
  Globe,
  Sparkles,
  ArrowRight,
  Loader2,
  IndianRupee
} from 'lucide-react';
import GoogleEarthViewer from '../components/GoogleEarthViewer';

const ItineraryGenerator = () => {
  const navigate = useNavigate();
  const [isGenerating, setIsGenerating] = useState(false);
  const [formData, setFormData] = useState({
    city: '',
    budget: '',
    days: '',
    interests: [],
    dietaryRestrictions: [],
    travelStyle: 'balanced',
    groupSize: 1
  });
  const [selectedLocation, setSelectedLocation] = useState(null);

  const interests = [
    'Culture & History', 'Food & Dining', 'Nature & Outdoors', 'Art & Museums',
    'Shopping', 'Nightlife', 'Adventure', 'Relaxation', 'Photography', 'Local Markets'
  ];

  const dietaryRestrictions = [
    'Vegetarian', 'Vegan', 'Gluten-Free', 'Dairy-Free', 'Halal', 'Kosher', 'None'
  ];

  const travelStyles = [
    { value: 'budget', label: 'Budget', description: 'Maximize value, minimize cost' },
    { value: 'balanced', label: 'Balanced', description: 'Good mix of experiences and value' },
    { value: 'luxury', label: 'Luxury', description: 'Premium experiences and accommodations' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleInterestToggle = (interest) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const handleDietaryToggle = (diet) => {
    setFormData(prev => ({
      ...prev,
      dietaryRestrictions: prev.dietaryRestrictions.includes(diet)
        ? prev.dietaryRestrictions.filter(d => d !== diet)
        : [...prev.dietaryRestrictions, diet]
    }));
  };

  const handleLocationSelect = (location) => {
    setSelectedLocation(location);
    // You can add additional logic here like fetching location details
  };

  const handleCityChange = (city) => {
    handleInputChange('city', city);
    // Simulate location data for demo
    if (city.trim()) {
      setSelectedLocation({
        name: city,
        country: 'India', // Default to India for demo
        coordinates: { lat: 20.5937, lng: 78.9629 } // Default to India center
      });
    } else {
      setSelectedLocation(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.city || !formData.budget || !formData.days) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsGenerating(true);
    
    try {
      // Simulate API call for demo
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Generate a mock itinerary ID
      const itineraryId = `itinerary_${Date.now()}`;
      
      toast.success('Itinerary generated successfully!');
      // Pass city to the viewer so map centers correctly
      navigate(`/itinerary/${itineraryId}?city=${encodeURIComponent(formData.city)}`);
      
    } catch (error) {
      toast.error('Failed to generate itinerary. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-neon-teal to-neon-purple rounded-full flex items-center justify-center">
              <Brain className="w-10 h-10 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-cyber font-bold mb-6">
            Generate Your <span className="text-neon-teal">Perfect</span> Itinerary
          </h1>
          <p className="text-xl text-dark-300 max-w-2xl mx-auto">
            Tell us about your dream trip and let our AI create a personalized travel plan 
            that matches your style, budget, and interests.
          </p>
        </motion.div>

        {/* Form */}
        <motion.form
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          onSubmit={handleSubmit}
          className="space-y-8"
        >
          {/* Basic Information */}
          <div className="card-cyber p-8">
            <h2 className="text-2xl font-cyber font-semibold mb-6 text-neon-teal">
              Basic Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-white font-medium mb-2">
                  <MapPin className="w-4 h-4 inline mr-2" />
                  Destination City *
                </label>
                <input
                  type="text"
                  value={formData.city}
                  onChange={(e) => handleCityChange(e.target.value)}
                  placeholder="e.g., Mumbai, Delhi, Bangalore"
                  className="input-cyber"
                  required
                />
              </div>
              
              <div>
                <label className="block text-white font-medium mb-2">
                  <IndianRupee className="w-4 h-4 inline mr-2" />
                  Budget (₹) *
                </label>
                <input
                  type="number"
                  value={formData.budget}
                  onChange={(e) => handleInputChange('budget', e.target.value)}
                  placeholder="e.g., 150000"
                  className="input-cyber"
                  min="1000"
                  required
                />
              </div>
              
              <div>
                <label className="block text-white font-medium mb-2">
                  <Calendar className="w-4 h-4 inline mr-2" />
                  Number of Days *
                </label>
                <input
                  type="number"
                  value={formData.days}
                  onChange={(e) => handleInputChange('days', e.target.value)}
                  placeholder="e.g., 7"
                  className="input-cyber"
                  min="1"
                  max="30"
                  required
                />
              </div>
            </div>
          </div>

          {/* Travel Preferences */}
          <div className="card-cyber p-8">
            <h2 className="text-2xl font-cyber font-semibold mb-6 text-neon-teal">
              Travel Preferences
            </h2>
            
            {/* Travel Style */}
            <div className="mb-8">
              <label className="block text-white font-medium mb-4">
                <Globe className="w-4 h-4 inline mr-2" />
                Travel Style
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {travelStyles.map((style) => (
                  <label
                    key={style.value}
                    className={`relative cursor-pointer p-4 rounded-lg border-2 transition-all duration-300 ${
                      formData.travelStyle === style.value
                        ? 'border-neon-teal bg-neon-teal/10'
                        : 'border-dark-700 hover:border-neon-teal/30'
                    }`}
                  >
                    <input
                      type="radio"
                      name="travelStyle"
                      value={style.value}
                      checked={formData.travelStyle === style.value}
                      onChange={(e) => handleInputChange('travelStyle', e.target.value)}
                      className="sr-only"
                    />
                    <div className="text-center">
                      <div className="font-semibold text-white mb-1">{style.label}</div>
                      <div className="text-sm text-dark-300">{style.description}</div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Group Size */}
            <div className="mb-8">
              <label className="block text-white font-medium mb-4">
                <Users className="w-4 h-4 inline mr-2" />
                Group Size
              </label>
              <div className="flex items-center space-x-4">
                <button
                  type="button"
                  onClick={() => handleInputChange('groupSize', Math.max(1, formData.groupSize - 1))}
                  className="w-10 h-10 bg-dark-800 rounded-lg flex items-center justify-center text-neon-teal hover:bg-neon-teal/10 transition-colors duration-300"
                >
                  -
                </button>
                <span className="text-2xl font-cyber font-bold text-white w-16 text-center">
                  {formData.groupSize}
                </span>
                <button
                  type="button"
                  onClick={() => handleInputChange('groupSize', formData.groupSize + 1)}
                  className="w-10 h-10 bg-dark-800 rounded-lg flex items-center justify-center text-neon-teal hover:bg-neon-teal/10 transition-colors duration-300"
                >
                  +
                </button>
              </div>
            </div>

            {/* Interests */}
            <div className="mb-8">
              <label className="block text-white font-medium mb-4">
                <Sparkles className="w-4 h-4 inline mr-2" />
                Interests (Select all that apply)
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {interests.map((interest) => (
                  <label
                    key={interest}
                    className={`relative cursor-pointer p-3 rounded-lg border transition-all duration-300 ${
                      formData.interests.includes(interest)
                        ? 'border-neon-teal bg-neon-teal/10'
                        : 'border-dark-700 hover:border-neon-teal/30'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={formData.interests.includes(interest)}
                      onChange={() => handleInterestToggle(interest)}
                      className="sr-only"
                    />
                    <span className="text-sm text-white">{interest}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Dietary Restrictions */}
            <div>
              <label className="block text-white font-medium mb-4">
                <Brain className="w-4 h-4 inline mr-2" />
                Dietary Restrictions
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {dietaryRestrictions.map((diet) => (
                  <label
                    key={diet}
                    className={`relative cursor-pointer p-3 rounded-lg border transition-all duration-300 ${
                      formData.dietaryRestrictions.includes(diet)
                        ? 'border-neon-teal bg-neon-teal/10'
                        : 'border-dark-700 hover:border-neon-teal/30'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={formData.dietaryRestrictions.includes(diet)}
                      onChange={() => handleDietaryToggle(diet)}
                      className="sr-only"
                    />
                    <span className="text-sm text-white">{diet}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <motion.button
              type="submit"
              disabled={isGenerating}
              className="btn-cyber text-lg px-12 py-4 disabled:opacity-50 disabled:cursor-not-allowed"
              whileHover={!isGenerating ? { scale: 1.05 } : {}}
              whileTap={!isGenerating ? { scale: 0.95 } : {}}
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Generating Your Itinerary...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5 mr-2" />
                  Generate Itinerary
                  <ArrowRight className="w-5 h-5 ml-2" />
                </>
              )}
            </motion.button>
            
            {isGenerating && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-4 text-dark-300"
              >
                Our AI is crafting your perfect travel plan...
              </motion.div>
            )}
          </div>
        </motion.form>

        {/* Google Earth Viewer */}
        {selectedLocation && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-12"
          >
            <GoogleEarthViewer 
              location={selectedLocation}
              onLocationSelect={handleLocationSelect}
            />
          </motion.div>
        )}

        {/* Info Cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16"
        >
          {[
            {
              icon: Brain,
              title: 'AI-Powered',
              description: 'Advanced Gemini AI creates personalized itineraries based on your preferences.'
            },
            {
              icon: Globe,
              title: 'Global Coverage',
              description: 'Access to comprehensive information about destinations worldwide.'
            },
            {
              icon: Sparkles,
              title: 'Smart Optimization',
              description: 'ML algorithms optimize routes and budget allocation for the best experience.'
            }
          ].map((card, index) => {
            const Icon = card.icon;
            return (
              <div key={index} className="card-cyber p-6 text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-neon-teal to-neon-purple rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-cyber font-semibold mb-2 text-white">
                  {card.title}
                </h3>
                <p className="text-dark-300 text-sm">
                  {card.description}
                </p>
              </div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
};

export default ItineraryGenerator;

