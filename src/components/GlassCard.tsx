import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface GlassCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  delay?: number;
}

const GlassCard: React.FC<GlassCardProps> = ({ icon, title, description, delay = 0 }) => {
  return (
    <motion.div 
      className="glass-card p-6 transition-transform duration-300 ease-out hover:scale-105 hover:shadow-2xl hover:bg-white/10 cursor-pointer"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true, margin: "-100px" }}
    >
      <motion.div 
        className="w-16 h-16 mb-6 flex items-center justify-center rounded-full bg-gradient-to-br from-magenta/20 to-teal/20 text-teal"
        whileHover={{ scale: 1.05, rotate: 5 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
      >
        {icon}
      </motion.div>
      
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      
      <p className="text-white/70">{description}</p>
    </motion.div>
  );
};

export default GlassCard;