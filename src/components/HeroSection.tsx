import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { api, type WaitlistSubmission } from '../api';

interface FormData {
  name: string;
  position: string;
  company: string;
  email: string;
  niche: string;
  otherNiche?: string;
}

const ThankYouPopup = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  if (!isOpen) return null;
  
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
          />
          
          {/* Popup */}
          <motion.div
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md"
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -30, scale: 0.95 }}
            transition={{ 
              type: "spring", 
              damping: 20, 
              stiffness: 300,
              mass: 0.8 
            }}
          >
            <motion.div 
              className="bg-white/8 backdrop-blur-xl rounded-2xl border border-white/15 p-6 md:p-8 shadow-2xl shadow-magenta/10 text-center"
              initial={{ boxShadow: "0 0 0 rgba(236, 72, 153, 0)" }}
              animate={{ 
                boxShadow: "0 0 30px rgba(236, 72, 153, 0.2)",
              }}
              transition={{ 
                delay: 0.3, 
                duration: 1,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            >
              <motion.div 
                initial={{ scale: 0, rotate: -10 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ 
                  delay: 0.2, 
                  type: "spring", 
                  stiffness: 400,
                  damping: 10
                }}
                className="w-16 h-16 rounded-full bg-gradient-to-r from-magenta-500 to-teal-500 flex items-center justify-center mx-auto mb-5"
              >
                <motion.svg 
                  className="w-8 h-8 text-white" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24" 
                  xmlns="http://www.w3.org/2000/svg"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <motion.path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth="2" 
                    d="M5 13l4 4L19 7"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                  />
                </motion.svg>
              </motion.div>
              
              <motion.h3 
                className="text-2xl font-bold mb-2 gradient-text"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                Thank You!
              </motion.h3>
              
              <motion.p 
                className="text-white/80 mb-6"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                We've received your submission and will keep you updated on our progress.
              </motion.p>
              
              <motion.div 
                className="p-4 rounded-xl bg-white/5 border border-white/10 mb-6"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                <p className="text-white/80 mb-3">
                  Do you have an extra minute to fill out a quick survey? Your feedback would help us develop a better product.
                </p>
                <motion.a 
                  href="https://forms.gle/wvQpLGSWEMEKgAZN7" 
                  className="inline-block px-4 py-2 text-sm font-medium rounded-lg bg-gradient-to-r from-magenta-600 to-teal-600 text-white hover:shadow-lg hover:shadow-magenta-500/20 transition-all duration-300"
                  onClick={(e) => e.stopPropagation()}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Take the Survey
                </motion.a>
              </motion.div>
              
              <motion.button
                onClick={onClose}
                className="text-white/60 hover:text-white transition-colors text-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                whileHover={{ scale: 1.05 }}
              >
                Close
              </motion.button>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

const HeroSection = () => {
  const location = useLocation();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    position: '',
    company: '',
    email: '',
    niche: '',
    otherNiche: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formProgress, setFormProgress] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const [showThankYouPopup, setShowThankYouPopup] = useState(false);

  // Check URL params to see if we should show the form
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    if (searchParams.get('showForm') === 'true') {
      setShowForm(true);
    }
  }, [location]);

  const calculateProgress = (currentFormData: FormData): number => {
    let filledCount = 0;
    const requiredFields: (keyof FormData)[] = ['name', 'position', 'company', 'email', 'niche'];
    
    if (currentFormData.niche === 'Other') {
      requiredFields.push('otherNiche' as keyof FormData);
    }

    requiredFields.forEach(fieldKey => {
      const value = currentFormData[fieldKey];
      if (typeof value === 'string' && value.trim() !== '') {
        filledCount++;
      }
    });
    
    if (requiredFields.length === 0) return 0;
    return (filledCount / requiredFields.length) * 100;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prevFormData => {
      const updatedFormData = {
        ...prevFormData,
        [name]: value,
        ...(name === 'niche' && value !== 'Other' && { otherNiche: '' }),
      };
      setFormProgress(calculateProgress(updatedFormData));
      return updatedFormData;
    });
    // Clear error when user starts typing
    if (error) setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { name, position, company, email, niche, otherNiche } = formData;
    
    if (!name || !position || !company || !email || !niche || (niche === 'Other' && !otherNiche)) {
      setError('Please fill in all fields, including niche selection.');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      // Prepare submission data
      const submissionData: WaitlistSubmission = {
        name: name.trim(),
        position: position.trim(),
        company: company.trim(),
        email: email.trim().toLowerCase(),
        niche: niche,
        ...(niche === 'Other' && otherNiche ? { otherNiche: otherNiche.trim() } : {})
      };

      // Submit to API
      const response = await api.submitWaitlist(submissionData);

      if (response.success) {
        setIsSubmitted(true);
        setShowThankYouPopup(true);
        
        // Reset form after success
        setFormData({ 
          name: '', 
          position: '', 
          company: '', 
          email: '', 
          niche: '', 
          otherNiche: '' 
        });
        setFormProgress(0);
        
        // Hide form after delay
        setTimeout(() => {
          setIsSubmitted(false);
          setShowForm(false);
        }, 1000);
      }
    } catch (err) {
      // Handle different types of errors
      if (err instanceof Error) {
        if (err.message.includes('Email already registered')) {
          setError('This email is already registered in our waitlist.');
        } else if (err.message.includes('network')) {
          setError('Network error. Please check your connection and try again.');
        } else {
          setError(err.message || 'Failed to submit. Please try again.');
        }
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
      console.error('Form submission error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const closeThankYouPopup = () => {
    setShowThankYouPopup(false);
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
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
          className="text-center max-w-5xl mx-auto"
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight">
            Agentic AI
            <span className="gradient-text block">Marketing Revolution</span>
          </h1>

          <p className="text-xl md:text-2xl text-white/70 mb-12 max-w-3xl mx-auto leading-relaxed">
            The all-in-one AI agent platform replacing manual CRMs, analytics tools, and campaign managers
          </p>

          <AnimatePresence mode="wait">
            {!showForm ? (
              <motion.div
                key="cta-button"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="flex justify-center"
              >
                <motion.button
                  onClick={() => setShowForm(true)}
                  className="px-8 py-4 text-lg font-medium rounded-xl bg-gradient-to-r from-magenta-600 to-teal-600 text-white shadow-lg shadow-magenta-500/20 hover:shadow-xl hover:shadow-magenta-500/30 hover:scale-105 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="flex items-center">
                    Join The Waitlist
                    <svg className="ml-2 w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </span>
                </motion.button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                className="mx-auto relative"
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ 
                  type: "spring", 
                  stiffness: 300, 
                  damping: 25,
                  duration: 0.5 
                }}
              >
                <div className="bg-white/8 backdrop-blur-xl rounded-2xl border border-white/15 p-6 md:p-8 shadow-2xl shadow-magenta/5">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-semibold text-center gradient-text">Get Early Access</h3>
                    <button 
                      type="button"
                      onClick={() => setShowForm(false)}
                      className="text-white/60 hover:text-white transition-colors"
                      disabled={isSubmitting}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>

                  {/* Error Message */}
                  <AnimatePresence>
                    {error && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                        className="mb-4 p-3 rounded-lg bg-red-500/20 border border-red-500/30 text-red-300 text-sm"
                      >
                        <div className="flex items-center">
                          <svg className="w-4 h-4 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {error}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {/* First Column */}
                    <div className="space-y-5">
                      <div className="relative">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-magenta-400 opacity-70">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Your Name"
                          className="w-full pl-12 pr-6 py-4 rounded-xl bg-white/10 border border-white/20 placeholder-white/40 text-white focus:border-magenta-500 focus:ring-2 focus:ring-magenta-500/20 outline-none transition-all duration-300 disabled:opacity-50"
                          required
                          disabled={isSubmitting}
                        />
                      </div>
                      
                      <div className="relative">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-magenta-400 opacity-70">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <input
                          type="text"
                          name="position"
                          value={formData.position}
                          onChange={handleChange}
                          placeholder="Your Position"
                          className="w-full pl-12 pr-6 py-4 rounded-xl bg-white/10 border border-white/20 placeholder-white/40 text-white focus:border-magenta-500 focus:ring-2 focus:ring-magenta-500/20 outline-none transition-all duration-300 disabled:opacity-50"
                          required
                          disabled={isSubmitting}
                        />
                      </div>
                      
                      <div className="relative">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-magenta-400 opacity-70">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M2 5a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm3.293 1.293a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 01-1.414-1.414L7.586 10 5.293 7.707a1 1 0 010-1.414zM11 12a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div className="relative">
                          <select
                            name="niche"
                            value={formData.niche}
                            onChange={handleChange}
                            className="w-full pl-12 pr-10 py-4 rounded-xl bg-white/10 border border-white/20 placeholder-white/40 text-white focus:border-magenta-500 focus:ring-2 focus:ring-magenta-500/20 outline-none transition-all duration-300 appearance-none disabled:opacity-50"
                            required
                            disabled={isSubmitting}
                          >
                            <option value="" disabled className="text-gray-500">Select your niche</option>
                            <option value="Technology" className="text-black">Technology</option>
                            <option value="Finance" className="text-black">Finance</option>
                            <option value="Healthcare" className="text-black">Healthcare</option>
                            <option value="Education" className="text-black">Education</option>
                            <option value="Other" className="text-black">Other</option>
                          </select>
                          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-white/70">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Second Column */}
                    <div className="space-y-5">
                      <div className="relative">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-magenta-400 opacity-70">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4zm3 1h6v4H7V5zm2 5h4v1H9v-1zm0 2h4v1H9v-1zm-2 1h6v1H7v-1z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <input
                          type="text"
                          name="company"
                          value={formData.company}
                          onChange={handleChange}
                          placeholder="Company Name"
                          className="w-full pl-12 pr-6 py-4 rounded-xl bg-white/10 border border-white/20 placeholder-white/40 text-white focus:border-magenta-500 focus:ring-2 focus:ring-magenta-500/20 outline-none transition-all duration-300 disabled:opacity-50"
                          required
                          disabled={isSubmitting}
                        />
                      </div>
                      
                      <div className="relative">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-magenta-400 opacity-70">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                          </svg>
                        </div>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="Enter your work email"
                          className="w-full pl-12 pr-6 py-4 rounded-xl bg-white/10 border border-white/20 placeholder-white/40 text-white focus:border-magenta-500 focus:ring-2 focus:ring-magenta-500/20 outline-none transition-all duration-300 disabled:opacity-50"
                          required
                          disabled={isSubmitting}
                        />
                      </div>
                      
                      {formData.niche === 'Other' ? (
                        <motion.div 
                          className="relative"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          transition={{ duration: 0.3 }}
                        >
                          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-magenta-400 opacity-70">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <input
                            type="text"
                            name="otherNiche"
                            value={formData.otherNiche}
                            onChange={handleChange}
                            placeholder="Please specify your niche"
                            className="w-full pl-12 pr-6 py-4 rounded-xl bg-white/10 border border-white/20 placeholder-white/40 text-white focus:border-magenta-500 focus:ring-2 focus:ring-magenta-500/20 outline-none transition-all duration-300 disabled:opacity-50"
                            required
                            disabled={isSubmitting}
                          />
                        </motion.div>
                      ) : (
                        <div className="h-[56px] flex items-center justify-center">
                          <div className="text-white/40 text-sm">
                            All fields are required to proceed
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <div className="h-1 w-full bg-white/10 rounded-full mb-4 overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-magenta-500 to-teal-500"
                        initial={{ width: '0%' }}
                        animate={{ width: `${formProgress}%` }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                      />
                    </div>
                    
                    <button
                      type="submit"
                      className="w-full relative overflow-hidden group rounded-xl"
                      disabled={isSubmitted || isSubmitting || formProgress < 100}
                    >
                      <div className={`absolute inset-0 bg-gradient-to-r from-magenta-600 to-teal-600 transition-all duration-300 ${
                        formProgress < 100 || isSubmitting ? 'opacity-50' : 'opacity-100 group-hover:scale-105'
                      }`}></div>
                      
                      <motion.div 
                        className="relative z-10 py-3 font-medium text-white flex items-center justify-center space-x-2"
                        whileTap={{ scale: 0.98 }}
                      >
                        {isSubmitting ? (
                          <div className="flex items-center">
                            <svg className="animate-spin h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            <span>Submitting...</span>
                          </div>
                        ) : isSubmitted ? (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 400, damping: 10 }}
                            className="flex items-center"
                          >
                            <svg className="w-5 h-5 mr-2 text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                            <span>Thanks for joining!</span>
                          </motion.div>
                        ) : (
                          <>
                            <span className="text-lg">Get Early Access</span>
                            {formProgress >= 100 && (
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 animate-pulse" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                              </svg>
                            )}
                          </>
                        )}
                      </motion.div>
                    </button>
                  </div>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
      
      {/* Thank You Popup */}
      <ThankYouPopup isOpen={showThankYouPopup} onClose={closeThankYouPopup} />
    </section>
  );
};

export default HeroSection;