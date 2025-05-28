import React from 'react';
import { motion } from 'framer-motion';
import { Linkedin, Mail } from 'lucide-react';
import AditiImage from './assets/aditi.jpg';
import ShreyImage from './assets/shrey.jpg';
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
      name: "Aditi Bansal",
      role: "Co-founder",
      bio: "Aditi is currently pursuing Computer Science at BITS Pilani and leads external communications and platform operations at Mynt Studio. She oversees Mynt’s brand voice, social presence, and agency engagement across platforms.",
      imageUrl: AditiImage,
      linkedinUrl: "https://linkedin.com/in/aditibansalll",
      email: "aditi@mynt.studio"
    },
    {
      name: "Shrey Bansal",
      role: "Co-founder",
      bio: "Shrey is a Computer Science student at BITS Pilani and leads product development and AI integration at Mynt Studio. He is responsible for building the platform’s core infrastructure and applying intelligent systems to solve campaign challenges.",
      imageUrl: ShreyImage,
      linkedinUrl: "https://linkedin.com/in/-shreybansal",
      email: "shrey@mynt.studio"
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
              We're on a mission to revolutionize marketing with AI agents that deliver exceptional results.
            </p>

            <div className="bg-white/5 backdrop-blur-xl rounded-xl border border-white/15 p-6 md:p-8 text-left">
              <p className="text-white/80 mb-4">
                Founded in 2025, MYNT STUDIO emerged from a simple observation: despite advances in marketing technology, 
                businesses still struggle with fragmented tools and manual processes that fail to deliver consistent results.
              </p>
              
              <p className="text-white/80 mb-4">
                We believe that marketing should be driven by autonomous AI agents that can understand your business goals, 
                analyze customer behavior, and execute campaigns with minimal human intervention. Our platform replaces traditional 
                CRMs, analytics tools, and campaign managers with a unified system that learns and improves over time.
              </p>
              
              {/* <p className="text-white/80">
                Based in San Francisco with a distributed team across North America and Europe, we're backed by leading 
                venture capital firms and industry experts who share our vision for the future of marketing.
              </p> */}
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
              We're an enthusiastic team of entrepreneurs and engineers passionate about 
              creating the future of creator marketing.
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