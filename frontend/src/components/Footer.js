import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Brain, Github, Twitter, Linkedin, Mail, Heart } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    product: [
      { name: 'Features', href: '/#features' },
      { name: 'Pricing', href: '/pricing' },
      { name: 'API', href: '/api' },
      { name: 'Documentation', href: '/docs' }
    ],
    company: [
      { name: 'About', href: '/about' },
      { name: 'Blog', href: '/blog' },
      { name: 'Careers', href: '/careers' },
      { name: 'Contact', href: '/contact' }
    ],
    support: [
      { name: 'Help Center', href: '/help' },
      { name: 'Community', href: '/community' },
      { name: 'Status', href: '/status' },
      { name: 'Feedback', href: '/feedback' }
    ],
    legal: [
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms of Service', href: '/terms' },
      { name: 'Cookie Policy', href: '/cookies' },
      { name: 'GDPR', href: '/gdpr' }
    ]
  };

  const socialLinks = [
    { name: 'GitHub', href: 'https://github.com/atlasmind', icon: Github },
    { name: 'Twitter', href: 'https://twitter.com/atlasmind', icon: Twitter },
    { name: 'LinkedIn', href: 'https://linkedin.com/company/atlasmind', icon: Linkedin },
    { name: 'Email', href: 'mailto:hello@atlasmind.com', icon: Mail }
  ];

  return (
    <footer className="bg-dark-900/80 border-t border-neon-teal/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 mb-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center space-x-2 mb-4 group">
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
            <p className="text-dark-300 text-sm leading-relaxed mb-4">
              Experience the future of travel planning with AI-powered itineraries that adapt to your style, 
              optimize your routes, and unlock hidden gems in every destination.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-dark-800 rounded-lg flex items-center justify-center text-dark-400 hover:text-neon-teal hover:bg-neon-teal/10 transition-all duration-300"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Icon className="w-5 h-5" />
                  </motion.a>
                );
              })}
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Product</h3>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-dark-300 hover:text-neon-teal transition-colors duration-300 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-dark-300 hover:text-neon-teal transition-colors duration-300 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Support</h3>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-dark-300 hover:text-neon-teal transition-colors duration-300 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Legal</h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-dark-300 hover:text-neon-teal transition-colors duration-300 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="border-t border-neon-teal/20 pt-8 mb-8">
          <div className="max-w-md">
            <h3 className="text-white font-semibold mb-2">Stay Updated</h3>
            <p className="text-dark-300 text-sm mb-4">
              Get the latest updates on new features and travel tips.
            </p>
            <div className="flex space-x-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 input-cyber text-sm"
              />
              <motion.button
                className="btn-cyber text-sm px-4 py-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Subscribe
              </motion.button>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-neon-teal/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2 text-dark-400 text-sm">
              <span>© {currentYear} AtlasMind. All rights reserved.</span>
              <span>•</span>
              <span>Made with</span>
              <Heart className="w-4 h-4 text-red-500" />
              <span>for travelers</span>
            </div>
            
            <div className="flex items-center space-x-6 text-sm">
              <span className="text-dark-400">Powered by</span>
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-gradient-to-br from-neon-teal to-neon-purple rounded"></div>
                <span className="text-neon-teal font-medium">Gemini AI</span>
              </div>
              <span className="text-dark-400">•</span>
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-gradient-to-br from-neon-blue to-neon-teal rounded"></div>
                <span className="text-neon-blue font-medium">Google Maps</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="relative">
        <motion.div
          className="absolute bottom-4 left-4 w-16 h-16 bg-neon-teal/10 rounded-full blur-xl"
          animate={{ 
            y: [0, -10, 0],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-8 right-8 w-20 h-20 bg-neon-purple/10 rounded-full blur-xl"
          animate={{ 
            y: [0, 15, 0],
            opacity: [0.1, 0.3, 0.1]
          }}
          transition={{ duration: 6, repeat: Infinity, delay: 2 }}
        />
      </div>
    </footer>
  );
};

export default Footer;

