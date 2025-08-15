import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import DifferentiatorsSection from './components/DifferentiatorsSection';
import Footer from './components/Footer';
import ParallaxProvider from './components/ParallaxProvider';
import AboutUs from './pages/AboutUs';

// Get API URL from environment or use default
const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://mynt2.onrender.com';

function App() {
  useEffect(() => {
    // Function to wake up the backend
    const wakeUpBackend = async () => {
      try {
        // Use the health endpoint as it's lightweight
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
        
        await fetch(`${API_BASE_URL}/health`, {
          method: 'GET',
          signal: controller.signal,
          // Add cache control to prevent caching
          headers: {
            'Cache-Control': 'no-cache, no-store, must-revalidate',
          },
        });
        
        clearTimeout(timeoutId);
        console.log('Backend warmed up successfully');
      } catch (error) {
        // Don't show errors to users, just log for debugging
        if (error instanceof Error && error.name === 'AbortError') {
          console.log('Backend warmup timed out - server might be starting up');
        } else {
          console.log('Backend warmup failed:', error);
        }
      }
    };

    // Wake up backend immediately when app loads
    wakeUpBackend();

    // Optional: Set up periodic ping to keep backend warm
    // This is useful if users stay on the page for a while before filling the form
    const keepAliveInterval = setInterval(() => {
      wakeUpBackend();
    }, 5 * 60 * 1000); // Ping every 5 minutes

    // Cleanup interval on unmount
    return () => clearInterval(keepAliveInterval);
  }, []);

  return (
    <ParallaxProvider>
      <Router>
        <div className="min-h-screen bg-primary-400 overflow-hidden">
          <Navbar />
          <Routes>
            <Route path="/" element={
              <main>
                <HeroSection />
                <DifferentiatorsSection />
              </main>
            } />
            <Route path="/about" element={<AboutUs />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </ParallaxProvider>
  );
}

export default App;