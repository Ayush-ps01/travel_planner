import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Globe, Brain, MapPin } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', path: '/', icon: Globe },
    { name: 'Generate', path: '/generate', icon: Brain },
    { name: 'About', path: '/about', icon: MapPin },
  ];

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-dark-900/90 backdrop-blur-md border-b border-neon-teal/20' 
          : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <motion.div
              className="relative"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="w-10 h-10 bg-gradient-to-br from-neon-teal to-neon-purple rounded-lg flex items-center justify-center">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-neon-teal to-neon-purple rounded-lg blur-lg opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
            </motion.div>
            <div className="flex flex-col">
              <span className="text-xl font-cyber font-bold text-neon-teal">
                AtlasMind
              </span>
              <span className="text-xs text-dark-400 font-medium">
                AI Travel Planner
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 group ${
                    isActive
                      ? 'text-neon-teal bg-neon-teal/10 border border-neon-teal/30'
                      : 'text-dark-300 hover:text-neon-teal hover:bg-neon-teal/5'
                  }`}
                >
                  <Icon className={`w-4 h-4 transition-colors duration-300 ${
                    isActive ? 'text-neon-teal' : 'text-dark-400 group-hover:text-neon-teal'
                  }`} />
                  <span className="font-medium">{item.name}</span>
                  {isActive && (
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-neon-teal to-neon-purple"
                      layoutId="activeTab"
                      initial={false}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Link
              to="/generate"
              className="btn-cyber text-sm px-6 py-2"
            >
              Plan Your Trip
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-lg text-dark-300 hover:text-neon-teal hover:bg-neon-teal/10 transition-colors duration-300"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="md:hidden bg-dark-900/95 backdrop-blur-md border-t border-neon-teal/20"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-4 py-6 space-y-4">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                
                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                      isActive
                        ? 'text-neon-teal bg-neon-teal/10 border border-neon-teal/30'
                        : 'text-dark-300 hover:text-neon-teal hover:bg-neon-teal/5'
                    }`}
                  >
                    <Icon className={`w-5 h-5 ${
                      isActive ? 'text-neon-teal' : 'text-dark-400'
                    }`} />
                    <span className="font-medium">{item.name}</span>
                  </Link>
                );
              })}
              
              <div className="pt-4">
                <Link
                  to="/generate"
                  onClick={() => setIsMenuOpen(false)}
                  className="btn-cyber w-full text-center"
                >
                  Plan Your Trip
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;

