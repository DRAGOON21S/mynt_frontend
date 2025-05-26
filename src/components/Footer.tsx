import React from 'react';
import { Mail, Linkedin, Instagram } from 'lucide-react';
import { motion } from 'framer-motion';

const socialLinks = [
  { icon: <Linkedin size={20} />, href: '#', label: 'LinkedIn' },
  { icon: <Instagram size={20} />, href: '#', label: 'Instagram' },
];

const Footer: React.FC = () => {
  return (
    <footer className="relative overflow-hidden pt-12">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary-500 to-primary-400"></div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pb-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <span className="text-xl font-bold">MYNT STUDIO</span>
            </div>
            
            <p className="text-white/70 mb-4">
              Redefining marketing automation with autonomous AI agents that deliver exceptional results.
            </p>
            
            <div className="flex space-x-3">
              {socialLinks.map((link, index) => (
                <a 
                  key={index}
                  href={link.href}
                  aria-label={link.label}
                  className="w-10 h-10 rounded-full flex items-center justify-center bg-primary-300 hover:bg-teal hover:text-primary-500 transition-colors duration-300"
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>
          
          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Get in Touch</h3>
            <div className="flex items-center space-x-3 mb-4">
              <Mail size={18} className="text-teal" />
              <a href="mailto:hello@agentic.ai" className="text-white/70 hover:text-teal transition-colors duration-200">
                hello@agentic.ai
              </a>
            </div>
          </div>
        </div>
        
        {/* Bottom bar */}
        <div className="border-t border-white/10 py-6 flex justify-center items-center">
          <p className="text-white/50 text-sm">
            © {new Date().getFullYear()} MYNT STUDIO. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;