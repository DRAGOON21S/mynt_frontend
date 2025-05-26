import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar: React.FC = () => {
  const location = useLocation();
  const isAboutPage = location.pathname === '/about';

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-transparent">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold tracking-tighter">
            <span className="gradient-text">MYNT STUDIO</span>
          </Link>
          
          {/* Conditional Navigation - Right aligned */}
          <div>
            {isAboutPage ? (
              /* About Us page - show Join Waitlist button */
              <Link 
                to="/?showForm=true" 
                className="px-4 py-2 text-sm font-medium rounded-lg bg-gradient-to-r from-magenta-600 to-teal-600 text-white hover:shadow-lg hover:shadow-magenta-500/20 transition-all duration-300"
              >
                Join Waitlist
              </Link>
            ) : (
              /* Landing page - show About Us link */
              <Link 
                to="/about" 
                className="text-white hover:text-teal transition-colors duration-200"
              >
                About Us
              </Link>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;