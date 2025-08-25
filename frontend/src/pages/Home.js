import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Brain, 
  MapPin, 
  Globe, 
  Zap, 
  Shield, 
  Star,
  ArrowRight,
  Plane,
  Compass,
  Clock
} from 'lucide-react';

const Home = () => {
  const features = [
    {
      icon: Brain,
      title: 'AI-Powered Planning',
      description: 'Advanced Gemini AI creates personalized itineraries based on your preferences, budget, and travel style.',
      color: 'from-neon-teal to-neon-blue'
    },
    {
      icon: MapPin,
      title: 'Smart Route Optimization',
      description: 'ML algorithms optimize daily routes to minimize travel time and maximize your experience.',
      color: 'from-neon-purple to-neon-pink'
    },
    {
      icon: Globe,
      title: 'Google Maps Integration',
      description: 'Seamless integration with Google Maps for real-time directions, places, and interactive maps.',
      color: 'from-neon-blue to-neon-teal'
    },
    {
      icon: Zap,
      title: 'Instant Generation',
      description: 'Get complete travel plans in seconds with our advanced AI prompt chaining technology.',
      color: 'from-neon-pink to-neon-yellow'
    },
    {
      icon: Shield,
      title: 'Budget Optimization',
      description: 'Intelligent budget allocation ensures you get the most value from your travel budget.',
      color: 'from-neon-yellow to-neon-teal'
    },
    {
      icon: Star,
      title: 'Local Insights',
      description: 'Discover hidden gems and local recommendations that only AI-powered analysis can provide.',
      color: 'from-neon-teal to-neon-purple'
    }
  ];

  const stats = [
    { number: '100+', label: 'Cities Covered', icon: Globe },
    { number: '50K+', label: 'Itineraries Generated', icon: Brain },
    { number: '95%', label: 'User Satisfaction', icon: Star },
    { number: '<30s', label: 'Generation Time', icon: Zap }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-animated opacity-50"></div>
        <div className="absolute inset-0 bg-stars opacity-30"></div>
        
        {/* Floating Elements */}
        <motion.div
          className="absolute top-20 left-10 w-20 h-20 bg-neon-teal/20 rounded-full blur-xl"
          animate={{ 
            y: [0, -20, 0],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        <motion.div
          className="absolute top-40 right-20 w-32 h-32 bg-neon-purple/20 rounded-full blur-xl"
          animate={{ 
            y: [0, 30, 0],
            opacity: [0.2, 0.5, 0.2]
          }}
          transition={{ duration: 6, repeat: Infinity, delay: 1 }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <h1 className="text-5xl md:text-7xl font-cyber font-bold mb-6">
              <span className="text-neon-teal">Atlas</span>
              <span className="text-neon-purple">Mind</span>
            </h1>
            <p className="text-xl md:text-2xl text-dark-300 max-w-3xl mx-auto leading-relaxed">
              Experience the future of travel planning with AI-powered itineraries that adapt to your style, 
              optimize your routes, and unlock hidden gems in every destination.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link
              to="/generate"
              className="btn-cyber text-lg px-8 py-4 group"
            >
              Start Planning Now
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
            <button className="px-8 py-4 border border-neon-teal/30 text-neon-teal rounded-lg hover:bg-neon-teal/10 transition-all duration-300">
              Watch Demo
            </button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20"
          >
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center">
                  <div className="flex justify-center mb-3">
                    <Icon className="w-8 h-8 text-neon-teal" />
                  </div>
                  <div className="text-3xl md:text-4xl font-cyber font-bold text-neon-teal mb-1">
                    {stat.number}
                  </div>
                  <div className="text-dark-400 text-sm">{stat.label}</div>
                </div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-dark-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-cyber font-bold mb-6">
              Powered by <span className="text-neon-teal">Advanced AI</span>
            </h2>
            <p className="text-xl text-dark-300 max-w-2xl mx-auto">
              Our cutting-edge technology combines the power of Gemini AI with intelligent route optimization 
              to create travel experiences that are truly extraordinary.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="card-cyber p-8 group hover:border-neon-teal/40"
                >
                  <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-cyber font-semibold mb-4 text-white">
                    {feature.title}
                  </h3>
                  <p className="text-dark-300 leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-cyber font-bold mb-6">
              How <span className="text-neon-teal">AtlasMind</span> Works
            </h2>
            <p className="text-xl text-dark-300 max-w-2xl mx-auto">
              Three simple steps to your perfect travel itinerary
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                title: 'Tell Us Your Dreams',
                description: 'Share your destination, budget, travel style, and interests. Our AI understands your preferences.',
                icon: Compass
              },
              {
                step: '02',
                title: 'AI Magic Happens',
                description: 'Gemini AI generates personalized itineraries using advanced prompt chaining and local knowledge.',
                icon: Brain
              },
              {
                step: '03',
                title: 'Get Your Perfect Plan',
                description: 'Receive optimized routes, budget breakdowns, and interactive maps ready for your adventure.',
                icon: Plane
              }
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="text-center relative"
                >
                  <div className="relative mb-6">
                    <div className="w-20 h-20 bg-gradient-to-br from-neon-teal to-neon-purple rounded-full flex items-center justify-center mx-auto">
                      <span className="text-2xl font-cyber font-bold text-white">{item.step}</span>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-br from-neon-teal to-neon-purple rounded-full blur-lg opacity-30"></div>
                  </div>
                  
                  <div className="w-16 h-16 bg-dark-800 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-neon-teal" />
                  </div>
                  
                  <h3 className="text-xl font-cyber font-semibold mb-4 text-white">
                    {item.title}
                  </h3>
                  <p className="text-dark-300 leading-relaxed">
                    {item.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-neon-teal/10 to-neon-purple/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-cyber font-bold mb-6">
              Ready to Transform Your Travel?
            </h2>
            <p className="text-xl text-dark-300 mb-8">
              Join thousands of travelers who have discovered the power of AI-powered trip planning.
            </p>
            <Link
              to="/generate"
              className="btn-cyber text-lg px-8 py-4 inline-flex items-center group"
            >
              Start Your Journey
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;

