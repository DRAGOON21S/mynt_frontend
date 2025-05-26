import React from 'react';
import { motion } from 'framer-motion';
import { Linkedin, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

interface TeamMemberProps {
  name: string;
  role: string;
  bio: string;
  imageUrl: string;
  linkedinUrl: string;
  email: string;
}

const TeamMember: React.FC<TeamMemberProps> = ({ name, role, bio, imageUrl, linkedinUrl, email }) => {
  return (
    <motion.div 
      className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <div className="aspect-square overflow-hidden">
        <img 
          src={imageUrl} 
          alt={name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-1">{name}</h3>
        <p className="text-teal mb-3">{role}</p>
        <p className="text-white/70 mb-4 text-sm">{bio}</p>
        <div className="flex space-x-4">
          <a 
            href={linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full bg-white/10 hover:bg-teal/20 transition-colors"
            aria-label={`${name}'s LinkedIn`}
          >
            <Linkedin size={18} />
          </a>
          <a 
            href={`mailto:${email}`}
            className="p-2 rounded-full bg-white/10 hover:bg-teal/20 transition-colors"
            aria-label={`Email ${name}`}
          >
            <Mail size={18} />
          </a>
        </div>
      </div>
    </motion.div>
  );
};

const AboutUs: React.FC = () => {
  const teamMembers = [
    {
      name: "Alex Johnson",
      role: "CEO & Co-founder",
      bio: "Alex has over 15 years of experience in digital marketing and AI. Prior to founding MYNT STUDIO, he led innovation teams at several Fortune 500 companies.",
      imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
      linkedinUrl: "https://linkedin.com",
      email: "alex@myntstudio.com"
    },
    {
      name: "Sophia Chen",
      role: "CTO & Co-founder",
      bio: "Sophia is an AI researcher with a PhD from MIT. Her groundbreaking work in generative models and autonomous agents forms the backbone of our technology.",
      imageUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=776&q=80",
      linkedinUrl: "https://linkedin.com",
      email: "sophia@myntstudio.com"
    }
  ];

  return (
    <main>
      {/* Company Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center pt-28 pb-20 overflow-hidden">
        {/* Animated Grid Background */}
        <div className="absolute inset-0">
          <div className="grid-background"></div>
        </div>

        {/* Content Container */}
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
              About <span className="gradient-text">MYNT STUDIO</span>
            </h1>

            <p className="text-xl text-white/70 mb-6 max-w-3xl mx-auto leading-relaxed">
              We're on a mission to revolutionize marketing with autonomous AI agents that deliver exceptional results.
            </p>

            <div className="bg-white/5 backdrop-blur-xl rounded-xl border border-white/15 p-6 md:p-8 text-left">
              <p className="text-white/80 mb-4">
                Founded in 2023, MYNT STUDIO emerged from a simple observation: despite advances in marketing technology, 
                businesses still struggle with fragmented tools and manual processes that fail to deliver consistent results.
              </p>
              
              <p className="text-white/80 mb-4">
                We believe that marketing should be driven by autonomous AI agents that can understand your business goals, 
                analyze customer behavior, and execute campaigns with minimal human intervention. Our platform replaces traditional 
                CRMs, analytics tools, and campaign managers with a unified system that learns and improves over time.
              </p>
              
              <p className="text-white/80">
                Based in San Francisco with a distributed team across North America and Europe, we're backed by leading 
                venture capital firms and industry experts who share our vision for the future of marketing.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Team Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center max-w-4xl mx-auto mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight">
              Meet Our <span className="gradient-text">Team</span>
            </h2>

            <p className="text-lg text-white/70 max-w-3xl mx-auto leading-relaxed">
              We're a diverse team of entrepreneurs, scientists, and engineers passionate about 
              creating the future of autonomous marketing.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {teamMembers.map((member, index) => (
              <TeamMember key={index} {...member} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default AboutUs; 