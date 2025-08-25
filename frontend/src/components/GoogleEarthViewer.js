import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Globe, MapPin, ZoomIn, ZoomOut, RotateCcw, Navigation } from 'lucide-react';

const GoogleEarthViewer = ({ location, onLocationSelect }) => {
  const earthRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(1);

  useEffect(() => {
    if (location) {
      setCurrentLocation(location);
      setIsLoading(false);
    }
  }, [location]);

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 0.5, 5));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 0.5, 0.5));
  };

  const handleReset = () => {
    setZoomLevel(1);
  };

  const handleLocationClick = () => {
    if (onLocationSelect && currentLocation) {
      onLocationSelect(currentLocation);
    }
  };

  if (isLoading) {
    return (
      <div className="card-cyber p-8 text-center">
        <div className="spinner-cyber mx-auto mb-4"></div>
        <p className="text-dark-300">Loading Earth view...</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
      className="card-cyber p-6"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-cyber font-semibold text-neon-teal flex items-center gap-2">
          <Globe className="w-5 h-5" />
          Earth View
        </h3>
        <div className="flex gap-2">
          <button
            onClick={handleZoomOut}
            className="p-2 bg-dark-800 hover:bg-dark-700 rounded-lg transition-colors"
            title="Zoom Out"
          >
            <ZoomOut className="w-4 h-4 text-neon-teal" />
          </button>
          <button
            onClick={handleZoomIn}
            className="p-2 bg-dark-800 hover:bg-dark-700 rounded-lg transition-colors"
            title="Zoom In"
          >
            <ZoomIn className="w-4 h-4 text-neon-teal" />
          </button>
          <button
            onClick={handleReset}
            className="p-2 bg-dark-800 hover:bg-dark-700 rounded-lg transition-colors"
            title="Reset View"
          >
            <RotateCcw className="w-4 h-4 text-neon-teal" />
          </button>
        </div>
      </div>

      {/* 3D Earth Visualization */}
      <div className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 rounded-xl overflow-hidden h-80 mb-4">
        {/* Earth Sphere */}
        <div 
          ref={earthRef}
          className="absolute inset-0 flex items-center justify-center"
          style={{
            transform: `scale(${zoomLevel})`,
            transition: 'transform 0.3s ease-in-out'
          }}
        >
          {/* Earth with Continents */}
          <div className="relative w-48 h-48">
            {/* Base Earth Sphere */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 rounded-full shadow-2xl"></div>
            
            {/* Continent Overlays */}
            <div className="absolute inset-0 rounded-full overflow-hidden">
              <div className="absolute top-1/4 left-1/4 w-16 h-8 bg-green-600 rounded-full opacity-80"></div>
              <div className="absolute top-1/3 right-1/4 w-12 h-6 bg-green-600 rounded-full opacity-80"></div>
              <div className="absolute bottom-1/4 left-1/3 w-14 h-7 bg-green-600 rounded-full opacity-80"></div>
              <div className="absolute top-1/2 right-1/3 w-10 h-5 bg-green-600 rounded-full opacity-80"></div>
            </div>

            {/* Location Marker */}
            {currentLocation && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5, type: "spring" }}
                className="absolute -top-2 -right-2"
              >
                <div className="relative">
                  <div className="w-6 h-6 bg-red-500 rounded-full animate-pulse"></div>
                  <div className="absolute inset-0 w-6 h-6 bg-red-400 rounded-full animate-ping"></div>
                  <MapPin className="absolute inset-0 w-6 h-6 text-white" />
                </div>
              </motion.div>
            )}

            {/* Atmospheric Glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-300/20 to-transparent rounded-full"></div>
          </div>
        </div>

        {/* Stars Background */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full animate-twinkle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`
              }}
            ></div>
          ))}
        </div>

        {/* Location Info Overlay */}
        {currentLocation && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="absolute bottom-4 left-4 right-4 bg-dark-900/90 backdrop-blur-sm rounded-lg p-3 border border-neon-teal/30"
          >
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-cyber font-semibold text-white">{currentLocation.name}</h4>
                <p className="text-sm text-dark-300">{currentLocation.country}</p>
              </div>
              <button
                onClick={handleLocationClick}
                className="p-2 bg-neon-teal hover:bg-neon-purple rounded-lg transition-colors"
                title="View Details"
              >
                <Navigation className="w-4 h-4 text-white" />
              </button>
            </div>
          </motion.div>
        )}
      </div>

      {/* Controls Info */}
      <div className="text-center text-sm text-dark-400">
        <p>Use the controls above to explore the Earth view</p>
        <p className="mt-1">Click the navigation button to view location details</p>
      </div>
    </motion.div>
  );
};

export default GoogleEarthViewer;
