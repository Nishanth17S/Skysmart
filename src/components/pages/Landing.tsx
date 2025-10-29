import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';
import { Plane, Sparkles } from 'lucide-react';

export default function Landing() {
  const navigate = useNavigate();

  // Floating cloud animation
  const cloudVariants = {
    animate: {
      x: [0, 30, 0],
      y: [0, -20, 0],
      transition: {
        duration: 20,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Gradient Background */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-br from-sky-100 via-blue-50 to-white"
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%'],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          repeatType: 'reverse',
        }}
      />

      {/* Animated Floating Clouds */}
      <div className="absolute inset-0 opacity-40 pointer-events-none">
        <motion.div
          variants={cloudVariants}
          animate="animate"
          className="absolute top-20 left-[10%]"
        >
          <svg width="120" height="60" viewBox="0 0 120 60" fill="none">
            <ellipse cx="30" cy="30" rx="30" ry="20" fill="white" opacity="0.6" />
            <ellipse cx="60" cy="25" rx="35" ry="22" fill="white" opacity="0.5" />
            <ellipse cx="90" cy="30" rx="30" ry="20" fill="white" opacity="0.6" />
          </svg>
        </motion.div>

        <motion.div
          variants={cloudVariants}
          animate="animate"
          style={{ animationDelay: '5s' }}
          className="absolute top-40 right-[15%]"
        >
          <svg width="100" height="50" viewBox="0 0 100 50" fill="none">
            <ellipse cx="25" cy="25" rx="25" ry="18" fill="white" opacity="0.5" />
            <ellipse cx="50" cy="20" rx="30" ry="20" fill="white" opacity="0.6" />
            <ellipse cx="75" cy="25" rx="25" ry="18" fill="white" opacity="0.5" />
          </svg>
        </motion.div>

        <motion.div
          variants={cloudVariants}
          animate="animate"
          style={{ animationDelay: '10s' }}
          className="absolute bottom-32 left-[20%]"
        >
          <svg width="140" height="70" viewBox="0 0 140 70" fill="none">
            <ellipse cx="35" cy="35" rx="35" ry="23" fill="white" opacity="0.6" />
            <ellipse cx="70" cy="30" rx="40" ry="25" fill="white" opacity="0.5" />
            <ellipse cx="105" cy="35" rx="35" ry="23" fill="white" opacity="0.6" />
          </svg>
        </motion.div>
      </div>

      {/* Sparkle Effects */}
      <motion.div
        className="absolute top-1/4 right-1/4"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <Sparkles className="w-6 h-6 text-primary" />
      </motion.div>

      <motion.div
        className="absolute bottom-1/3 left-1/4"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.5, 0.2],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1.5
        }}
      >
        <Sparkles className="w-5 h-5 text-accent" />
      </motion.div>

      {/* Main Content - Centered */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
        <div className="text-center max-w-4xl">
          {/* Logo/Icon with Scale Animation */}
          <motion.div
            initial={{ scale: 0, opacity: 0, rotateY: 180 }}
            animate={{ scale: 1, opacity: 1, rotateY: 0 }}
            transition={{ 
              duration: 0.8, 
              type: "spring", 
              stiffness: 150,
              delay: 0.2
            }}
            className="mb-8"
          >
            <motion.div 
              className="w-24 h-24 mx-auto bg-gradient-to-br from-[#007ACC] to-[#0056a3] rounded-3xl shadow-2xl flex items-center justify-center"
              whileHover={{ 
                scale: 1.1, 
                rotate: 5,
                boxShadow: "0 25px 50px -12px rgba(0, 122, 204, 0.5)"
              }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <Plane className="w-12 h-12 text-white" strokeWidth={2.5} />
            </motion.div>
          </motion.div>

          {/* Brand Name */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="mb-6"
          >
            <h2 className="text-4xl md:text-5xl text-[#2C3E50] mb-3">SkySmart</h2>
            <motion.div 
              className="w-24 h-1 bg-gradient-to-r from-[#007ACC] via-[#FF6B35] to-[#007ACC] mx-auto rounded-full"
              initial={{ width: 0 }}
              animate={{ width: 96 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            />
          </motion.div>

          {/* Main Tagline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-5xl md:text-6xl lg:text-7xl text-[#2C3E50] mb-6 leading-tight"
          >
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              Your Smart Travel
            </motion.span>
            <br />
            <motion.span 
              className="bg-gradient-to-r from-[#007ACC] via-[#0099ff] to-[#FF6B35] bg-clip-text text-transparent"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.6 }}
            >
              Starts Here
            </motion.span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="text-xl md:text-2xl text-[#2C3E50]/70 mb-12 max-w-3xl mx-auto leading-relaxed"
          >
            AI-powered flight booking, fare predictions, and personalized travel assistance.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            {/* Primary CTA */}
            <motion.div
              whileHover={{ scale: 1.08, y: -3 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                size="lg"
                className="bg-[#FF6B35] text-white hover:bg-[#ff5520] shadow-2xl shadow-[#FF6B35]/40 px-14 py-8 text-xl rounded-xl"
                onClick={() => navigate('/home')}
              >
                Start Your Journey
                <motion.svg
                  className="w-6 h-6 ml-3"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </motion.svg>
              </Button>
            </motion.div>

            {/* Secondary CTA */}
            <motion.div
              whileHover={{ scale: 1.08, y: -3 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                size="lg"
                variant="outline"
                className="bg-white/90 backdrop-blur-sm border-2 border-[#007ACC]/40 hover:border-[#007ACC] hover:bg-[#007ACC]/10 shadow-xl px-12 py-7 text-xl text-[#007ACC] rounded-xl"
                onClick={() => navigate('/home')}
              >
                Enter SkySmart
              </Button>
            </motion.div>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6, duration: 0.8 }}
            className="mt-20 flex flex-wrap justify-center items-center gap-10 text-[#2C3E50]/60"
          >
            <motion.div 
              className="flex items-center space-x-3"
              whileHover={{ scale: 1.05 }}
            >
              <svg className="w-6 h-6 text-[#007ACC]" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Secure Payments</span>
            </motion.div>
            <motion.div 
              className="flex items-center space-x-3"
              whileHover={{ scale: 1.05 }}
            >
              <svg className="w-6 h-6 text-[#007ACC]" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Best Price Guarantee</span>
            </motion.div>
            <motion.div 
              className="flex items-center space-x-3"
              whileHover={{ scale: 1.05 }}
            >
              <svg className="w-6 h-6 text-[#007ACC]" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>24/7 Support</span>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Decorative Bottom Gradient */}
      <motion.div 
        className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-[#007ACC] via-[#FF6B35] to-[#007ACC]"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 1.8, duration: 1 }}
      />
    </div>
  );
}
