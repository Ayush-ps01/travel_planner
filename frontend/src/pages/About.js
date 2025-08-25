import React from 'react';
import { motion } from 'framer-motion';
import { 
  Brain, 
  Globe, 
  Zap, 
  Shield, 
  Users, 
  Heart,
  Code,
  Rocket
} from 'lucide-react';

const About = () => {
  const team = [
    {
      name: 'AI Research Team',
      role: 'Gemini AI Integration',
      description: 'Experts in prompt engineering and AI optimization',
      icon: Brain
    },
    {
      name: 'ML Engineers',
      role: 'Route Optimization',
      description: 'Specialists in clustering algorithms and TSP solutions',
      icon: Code
    },
    {
      name: 'Frontend Developers',
      role: 'User Experience',
      description: 'Crafting beautiful, responsive interfaces',
      icon: Rocket
    },
    {
      name: 'Backend Engineers',
      role: 'API & Infrastructure',
      description: 'Building robust, scalable systems',
      icon: Shield
    }
  ];

  const stats = [
    { number: '100+', label: 'Cities Covered', icon: Globe },
    { number: '50K+', label: 'Itineraries Generated', icon: Brain },
    { number: '95%', label: 'User Satisfaction', icon: Heart },
    { number: '<30s', label: 'Generation Time', icon: Zap }
  ];

  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-cyber font-bold mb-6">
            About <span className="text-neon-teal">AtlasMind</span>
          </h1>
          <p className="text-xl text-dark-300 max-w-3xl mx-auto leading-relaxed">
            We're revolutionizing travel planning by combining the power of artificial intelligence 
            with cutting-edge machine learning to create personalized, optimized itineraries.
          </p>
        </motion.div>

        {/* Mission Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="card-cyber p-8 mb-16"
        >
          <div className="text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-neon-teal to-neon-purple rounded-full flex items-center justify-center mx-auto mb-6">
              <Rocket className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl font-cyber font-bold mb-4 text-neon-teal">
              Our Mission
            </h2>
            <p className="text-lg text-dark-300 max-w-3xl mx-auto leading-relaxed">
              To democratize intelligent travel planning by making AI-powered itinerary generation 
              accessible to everyone. We believe that every traveler deserves a personalized, 
              optimized experience that maximizes their time, budget, and enjoyment.
            </p>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16"
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

        {/* Technology Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-3xl font-cyber font-bold text-center mb-12 text-neon-teal">
            Our Technology Stack
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Brain,
                title: 'Gemini AI',
                description: 'Advanced language model for intelligent itinerary generation and natural language processing.',
                color: 'from-neon-teal to-neon-blue'
              },
              {
                icon: Code,
                title: 'Machine Learning',
                description: 'Custom algorithms for route optimization, attraction clustering, and budget allocation.',
                color: 'from-neon-purple to-neon-pink'
              },
              {
                icon: Globe,
                title: 'Google Maps API',
                description: 'Comprehensive mapping, places, and directions data for accurate travel planning.',
                color: 'from-neon-blue to-neon-teal'
              },
              {
                icon: Zap,
                title: 'FastAPI Backend',
                description: 'High-performance Python backend with async processing and real-time optimization.',
                color: 'from-neon-pink to-neon-yellow'
              },
              {
                icon: Rocket,
                title: 'React Frontend',
                description: 'Modern, responsive web interface with smooth animations and intuitive UX.',
                color: 'from-neon-yellow to-neon-teal'
              },
              {
                icon: Shield,
                title: 'Security & Privacy',
                description: 'Enterprise-grade security with data encryption and privacy protection.',
                color: 'from-neon-teal to-neon-purple'
              }
            ].map((tech, index) => {
              const Icon = tech.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="card-cyber p-6 group hover:border-neon-teal/40"
                >
                  <div className={`w-16 h-16 bg-gradient-to-br ${tech.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-cyber font-semibold mb-3 text-white">
                    {tech.title}
                  </h3>
                  <p className="text-dark-300 leading-relaxed">
                    {tech.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Team Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-3xl font-cyber font-bold text-center mb-12 text-neon-teal">
            Meet Our Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, index) => {
              const Icon = member.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="card-cyber p-6 text-center group hover:border-neon-teal/40"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-neon-teal to-neon-purple rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-cyber font-semibold mb-2 text-white">
                    {member.name}
                  </h3>
                  <div className="text-neon-teal text-sm font-medium mb-2">
                    {member.role}
                  </div>
                  <p className="text-dark-300 text-sm">
                    {member.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Values Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="card-cyber p-8"
        >
          <h2 className="text-3xl font-cyber font-bold text-center mb-8 text-neon-teal">
            Our Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Brain,
                title: 'Innovation',
                description: 'We constantly push the boundaries of what\'s possible with AI and machine learning.'
              },
              {
                icon: Heart,
                title: 'User-Centric',
                description: 'Every decision we make is driven by creating the best possible experience for our users.'
              },
              {
                icon: Shield,
                title: 'Trust & Security',
                description: 'We prioritize the security and privacy of our users\' data above all else.'
              }
            ].map((value, index) => {
              const Icon = value.icon;
              return (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-neon-teal to-neon-purple rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-cyber font-semibold mb-3 text-white">
                    {value.title}
                  </h3>
                  <p className="text-dark-300 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;

