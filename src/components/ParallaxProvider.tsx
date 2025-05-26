import React, { ReactNode, useEffect, useState } from 'react';

interface ParallaxProviderProps {
  children: ReactNode;
}

const ParallaxProvider: React.FC<ParallaxProviderProps> = ({ children }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Get viewport dimensions
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;
      
      // Calculate normalized position (-1 to 1)
      const normalizedX = (e.clientX / windowWidth) * 2 - 1;
      const normalizedY = (e.clientY / windowHeight) * 2 - 1;
      
      setMousePosition({ x: normalizedX, y: normalizedY });
      
      // Apply parallax effect to elements with the parallax class
      document.querySelectorAll('.parallax').forEach((element) => {
        const depth = parseFloat(element.getAttribute('data-depth') || '0.1');
        const moveX = normalizedX * depth * 30;
        const moveY = normalizedY * depth * 30;
        
        // Apply transform with slight delay for natural feel
        (element as HTMLElement).style.transform = `translate3d(${moveX}px, ${moveY}px, 0)`;
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="parallax-container">
      {children}
    </div>
  );
};

export default ParallaxProvider;