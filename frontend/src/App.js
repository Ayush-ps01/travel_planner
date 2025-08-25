import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import ItineraryGenerator from './pages/ItineraryGenerator';
import ItineraryViewer from './pages/ItineraryViewer';
import About from './pages/About';

function App() {
  return (
    <div className="min-h-screen bg-dark-950">
      <Header />
      <AnimatePresence mode="wait">
        <Routes>
          <Route 
            path="/" 
            element={
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <Home />
              </motion.div>
            } 
          />
          <Route 
            path="/generate" 
            element={
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <ItineraryGenerator />
              </motion.div>
            } 
          />
          <Route 
            path="/itinerary/:id" 
            element={
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <ItineraryViewer />
              </motion.div>
            } 
          />
          <Route 
            path="/about" 
            element={
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <About />
              </motion.div>
            } 
          />
        </Routes>
      </AnimatePresence>
      <Footer />
    </div>
  );
}

export default App;

