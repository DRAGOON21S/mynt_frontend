import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import DifferentiatorsSection from './components/DifferentiatorsSection';
import Footer from './components/Footer';
import ParallaxProvider from './components/ParallaxProvider';
import AboutUs from './pages/AboutUs';

function App() {
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