import React, { useCallback } from 'react';
import Particles from 'react-tsparticles';
import { loadSlim } from 'tsparticles-slim';
import type { Engine } from 'tsparticles-engine';
import { motion } from 'framer-motion';

const ParticleOrb: React.FC = () => {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  return (
    <div className="relative w-full h-full">
      {/* Central Orb */}
      <motion.div 
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full z-10"
        animate={{ 
          boxShadow: [
            '0 0 30px 10px rgba(0, 247, 245, 0.3), 0 0 50px 20px rgba(255, 0, 214, 0.2)', 
            '0 0 30px 15px rgba(255, 0, 214, 0.3), 0 0 50px 20px rgba(0, 247, 245, 0.2)',
            '0 0 30px 10px rgba(0, 247, 245, 0.3), 0 0 50px 20px rgba(255, 0, 214, 0.2)'
          ]
        }}
        transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
      >
        {/* Gradient Sphere */}
        <div className="w-full h-full rounded-full bg-gradient-to-br from-teal/80 to-magenta/80 backdrop-blur-sm animate-pulse-slow"></div>
        
        {/* Central core with different pulse animation */}
        <motion.div 
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-white/30 backdrop-blur-md"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
        />
      </motion.div>
      
      {/* Particle Effects */}
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          fpsLimit: 60,
          interactivity: {
            events: {
              onHover: {
                enable: true,
                mode: "grab",
              },
              resize: true,
            },
            modes: {
              grab: {
                distance: 140,
                links: {
                  opacity: 0.5,
                },
              },
            },
          },
          particles: {
            color: {
              value: ["#00F7F5", "#FF00D6", "#FFFFFF"],
            },
            links: {
              color: "#ffffff",
              distance: 150,
              enable: true,
              opacity: 0.3,
              width: 1,
            },
            move: {
              direction: "none",
              enable: true,
              outModes: {
                default: "bounce",
              },
              random: true,
              speed: 1,
              straight: false,
            },
            number: {
              density: {
                enable: true,
                area: 800,
              },
              value: 60,
            },
            opacity: {
              value: 0.5,
            },
            shape: {
              type: "circle",
            },
            size: {
              value: { min: 1, max: 3 },
            },
          },
          detectRetina: true,
        }}
        className="absolute inset-0"
      />
    </div>
  );
};

export default ParticleOrb;