import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Globe } from 'lucide-react';

const MapViewer = ({ location, height = "300px" }) => {
  // For demo purposes, we'll show a placeholder map
  // In production, you'd integrate with Google Maps API
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full"
    >
      <div className="bg-dark-800 rounded-lg overflow-hidden border border-neon-teal/20">
        {/* Map Header */}
        <div className="bg-gradient-to-r from-neon-teal/10 to-neon-purple/10 px-4 py-3 border-b border-neon-teal/20">
          <div className="flex items-center space-x-2">
            <MapPin className="w-5 h-5 text-neon-teal" />
            <span className="text-white font-medium">Location Map</span>
          </div>
        </div>
        
        {/* Map Placeholder */}
        <div 
          className="relative bg-gradient-to-br from-dark-700 to-dark-800"
          style={{ height }}
        >
          {/* Interactive Map Placeholder */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <Globe className="w-16 h-16 text-neon-teal/40 mx-auto mb-4" />
              <h3 className="text-white text-lg font-medium mb-2">
                {location || 'Location'}
              </h3>
              <p className="text-dark-300 text-sm mb-4">
                Interactive map view
              </p>
              
              {/* Map Controls */}
              <div className="flex items-center justify-center space-x-3">
                <div className="bg-neon-teal/20 rounded-lg px-3 py-2 border border-neon-teal/30">
                  <span className="text-neon-teal text-xs font-medium">Zoom</span>
                </div>
                <div className="bg-neon-purple/20 rounded-lg px-3 py-2 border border-neon-purple/30">
                  <span className="text-neon-purple text-xs font-medium">Street View</span>
                </div>
                <div className="bg-neon-pink/20 rounded-lg px-3 py-2 border border-neon-pink/30">
                  <span className="text-neon-pink text-xs font-medium">3D</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Map Grid Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="w-full h-full" style={{
              backgroundImage: `
                linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: '20px 20px'
            }} />
          </div>
          
          {/* Location Marker */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="w-4 h-4 bg-neon-teal rounded-full border-2 border-white shadow-lg animate-pulse" />
            <div className="w-2 h-2 bg-white rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
          </div>
        </div>
        
        {/* Map Footer */}
        <div className="bg-dark-800 px-4 py-2 border-t border-neon-teal/20">
          <div className="flex items-center justify-between text-xs text-dark-400">
            <span>Google Maps Integration</span>
            <span className="text-neon-teal">Ready for API Key</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default MapViewer;
