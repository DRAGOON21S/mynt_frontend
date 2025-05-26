import React from 'react';
import { Rocket, Brain, Shield } from 'lucide-react';
import { motion } from 'framer-motion';
import GlassCard from './GlassCard';

const DifferentiatorsSection: React.FC = () => {
  return (
    <section className="py-24 relative" id="features">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-mesh opacity-30"></div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text inline-block">
            Why Agentic
          </h2>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            Our autonomous AI agents revolutionize digital marketing with minimal human intervention.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <GlassCard 
            icon={<Rocket size={32} />}
            title="Self-Optimizing Campaigns"
            description="Our AI continuously learns and adapts campaign parameters in real-time, ensuring peak performance without manual tweaking."
            delay={0.1}
          />
          
          <GlassCard 
            icon={<Brain size={32} />}
            title="Predictive Audience Mapping"
            description="Identify high-value audience segments before they even convert using advanced behavioral pattern recognition."
            delay={0.2}
          />
          
          <GlassCard 
            icon={<Shield size={32} />}
            title="Zero Manual Setup"
            description="Just connect your accounts and the AI automatically analyzes your business, crafts strategies, and deploys campaigns."
            delay={0.3}
          />
        </div>
      </div>
    </section>
  );
};

export default DifferentiatorsSection;