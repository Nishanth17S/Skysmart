import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'motion/react';
import { ChevronDown, Sparkles, TrendingUp, Shield } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';

export default function Home() {
  const navigate = useNavigate();
  const [animationComplete, setAnimationComplete] = useState(false);
  const { scrollYProgress } = useScroll();
  const cloudY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const globeScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);
  const globeOpacity = useTransform(scrollYProgress, [0, 0.5], [0.2, 0.05]);

  useEffect(() => {
    // Set animation complete after plane animation finishes
    const timer = setTimeout(() => {
      setAnimationComplete(true);
      // Optional: Play a subtle sound when plane lands (commented out by default)
      // const audio = new Audio('/sounds/plane-land.mp3');
      // audio.volume = 0.3;
      // audio.play().catch(() => {}); // Catch in case user hasn't interacted yet
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  // SVG Path for plane flight - curved arc across the screen
  const flightPath = "M 50 400 Q 300 100, 600 350";

  return (
    <motion.div 
      className="min-h-screen overflow-hidden relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-sky-400 via-white to-orange-50"></div>
      <motion.div 
        className="absolute inset-0 bg-gradient-to-br from-sky-300/30 via-transparent to-orange-100/30"
        animate={{
          background: [
            'linear-gradient(to bottom right, rgba(125, 211, 252, 0.3), transparent, rgba(254, 215, 170, 0.3))',
            'linear-gradient(to bottom right, rgba(56, 189, 248, 0.3), transparent, rgba(251, 146, 60, 0.3))',
            'linear-gradient(to bottom right, rgba(125, 211, 252, 0.3), transparent, rgba(254, 215, 170, 0.3))',
          ]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      >
      </motion.div>

      {/* Hero Section with Animation */}
      <section className="relative min-h-[70vh] md:h-[70vh] flex items-center justify-center overflow-hidden pt-20 pb-16 md:pt-0 md:pb-0">
        {/* Ambient glow effects */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/20 rounded-full blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
        {/* Animated Clouds - Parallax Effect */}
        <motion.div style={{ y: cloudY }} className="absolute inset-0 pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              initial={{ x: -100, opacity: 0.3 }}
              animate={{ 
                x: ['0%', '100%'],
                y: [Math.random() * 200, Math.random() * 200 + 50]
              }}
              transition={{
                duration: 15 + i * 3,
                repeat: Infinity,
                ease: "linear",
                delay: i * 2
              }}
              style={{
                top: `${20 + i * 10}%`,
                left: `${i * 15}%`,
              }}
            >
              <svg width="120" height="60" viewBox="0 0 120 60" fill="none">
                <ellipse cx="60" cy="30" rx="50" ry="25" fill="white" opacity="0.6" />
                <ellipse cx="40" cy="35" rx="35" ry="20" fill="white" opacity="0.5" />
                <ellipse cx="80" cy="35" rx="30" ry="18" fill="white" opacity="0.5" />
              </svg>
            </motion.div>
          ))}
        </motion.div>

        {/* Globe/Skyline Background */}
        <motion.div 
          className="absolute inset-0 flex items-center justify-center"
          style={{ scale: globeScale, opacity: globeOpacity }}
          animate={{ rotate: 360 }}
          transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
        >
          <svg width="500" height="500" viewBox="0 0 500 500" className="text-primary">
            <circle cx="250" cy="250" r="200" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.3" />
            <circle cx="250" cy="250" r="180" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.2" />
            <circle cx="250" cy="250" r="160" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.2" />
            {/* Globe grid lines */}
            <path d="M 250 50 Q 250 250, 250 450" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.2" />
            <path d="M 150 250 Q 250 250, 350 250" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.2" />
            <path d="M 50 250 Q 250 200, 450 250" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.15" />
            <path d="M 50 250 Q 250 300, 450 250" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.15" />
            {/* Continent shapes - simplified */}
            <circle cx="200" cy="200" r="30" fill="currentColor" opacity="0.1" />
            <circle cx="320" cy="280" r="25" fill="currentColor" opacity="0.1" />
            <circle cx="280" cy="180" r="20" fill="currentColor" opacity="0.1" />
          </svg>
        </motion.div>

        {/* City Skyline Silhouette */}
        <div className="absolute bottom-0 left-0 right-0 h-32 opacity-20">
          <svg width="100%" height="128" viewBox="0 0 1200 128" preserveAspectRatio="none" className="text-foreground">
            <rect x="50" y="60" width="60" height="68" fill="currentColor" />
            <rect x="120" y="40" width="50" height="88" fill="currentColor" />
            <rect x="180" y="70" width="45" height="58" fill="currentColor" />
            <rect x="240" y="30" width="70" height="98" fill="currentColor" />
            <rect x="320" y="55" width="55" height="73" fill="currentColor" />
            <rect x="900" y="50" width="65" height="78" fill="currentColor" />
            <rect x="975" y="35" width="60" height="93" fill="currentColor" />
            <rect x="1045" y="65" width="50" height="63" fill="currentColor" />
            <rect x="1105" y="45" width="55" height="83" fill="currentColor" />
          </svg>
        </div>

        {/* Flight Path SVG - Hidden, used for animation */}
        <svg 
          className="absolute inset-0 w-full h-full pointer-events-none" 
          viewBox="0 0 800 600"
          preserveAspectRatio="xMidYMid meet"
          style={{ overflow: 'visible' }}
        >
          <defs>
            <path
              id="flightPath"
              d={flightPath}
              fill="none"
              stroke="transparent"
            />
          </defs>
          
          {/* Animated Plane */}
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.g
              animate={{
                offsetDistance: ['0%', '100%'],
              }}
              transition={{
                duration: 4,
                ease: [0.43, 0.13, 0.23, 0.96],
              }}
              style={{
                offsetPath: `path("${flightPath}")`,
                offsetRotate: 'auto',
              }}
            >
              {/* Plane SVG */}
              <g transform="translate(-25, -25)">
                <motion.g
                  animate={{ 
                    y: [0, -5, 0],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  {/* Plane body */}
                  <path
                    d="M 25 15 L 30 25 L 25 28 L 20 25 Z"
                    fill="#007ACC"
                    stroke="#005A9C"
                    strokeWidth="1"
                  />
                  {/* Wings */}
                  <path
                    d="M 15 20 L 35 20 L 32 25 L 18 25 Z"
                    fill="#007ACC"
                    stroke="#005A9C"
                    strokeWidth="1"
                  />
                  {/* Tail */}
                  <path
                    d="M 20 15 L 30 15 L 25 18 Z"
                    fill="#FF6B35"
                    stroke="#E55A25"
                    strokeWidth="1"
                  />
                  {/* Windows */}
                  <circle cx="25" cy="22" r="1.5" fill="white" opacity="0.8" />
                  <circle cx="23" cy="22" r="1" fill="white" opacity="0.6" />
                  <circle cx="27" cy="22" r="1" fill="white" opacity="0.6" />
                </motion.g>
              </g>
              
              {/* Contrail effect */}
              <motion.line
                x1="-50"
                y1="0"
                x2="0"
                y2="0"
                stroke="white"
                strokeWidth="2"
                opacity="0.4"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1, delay: 1 }}
              />
            </motion.g>
          </motion.g>
        </svg>

        {/* Hero Content */}
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <motion.div
              className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 mb-6"
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <Sparkles className="w-5 h-5 text-accent" />
              <span className="text-foreground">AI-Powered Flight Booking</span>
            </motion.div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl text-foreground mb-4 leading-tight font-bold">
              Your Smart Travel
              <br />
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Starts Here
              </span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Experience the future of flight booking with AI-powered insights, 
              instant price alerts, and personalized recommendations.
            </p>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 4.2, duration: 0.6 }}
            >
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  size="lg"
                  className="bg-accent text-accent-foreground hover:bg-accent/90 shadow-2xl shadow-accent/40 px-10 py-7 text-lg relative overflow-hidden group"
                  onClick={() => navigate('/flights/search')}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    initial={{ x: '-100%' }}
                    animate={{ x: '100%' }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  />
                  <span className="relative z-10 flex items-center">
                    Start Your Journey
                    <motion.svg
                      className="w-5 h-5 ml-2"
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </motion.svg>
                  </span>
                </Button>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-white/90 backdrop-blur-sm border-2 border-primary hover:bg-primary/10 shadow-lg px-10 py-7 text-lg"
                  onClick={() => navigate('/dashboard')}
                >
                  Enter SkySmart
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: animationComplete ? 1 : 0, y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="flex flex-col items-center text-muted-foreground">
            <span className="text-sm mb-2">Scroll to explore</span>
            <ChevronDown className="w-6 h-6" />
          </div>
        </motion.div>
      </section>

      {/* Powered by AI Section */}
      <section className="py-16 bg-gradient-to-b from-orange-50 to-white">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center space-x-2 bg-primary/10 rounded-full px-6 py-3 mb-4">
              <Sparkles className="w-5 h-5 text-primary" />
              <span className="text-primary">Powered by AI for Smarter Flight Booking</span>
            </div>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our advanced AI analyzes millions of flights to bring you the best deals, 
              predict price trends, and personalize your travel experience.
            </p>
          </motion.div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: Sparkles,
                title: 'AI-Powered Search',
                description: 'Smart recommendations based on your preferences and travel history',
                color: 'bg-primary/10 text-primary',
              },
              {
                icon: TrendingUp,
                title: 'Price Prediction',
                description: 'Know exactly when to book with our fare forecasting technology',
                color: 'bg-accent/10 text-accent',
              },
              {
                icon: Shield,
                title: 'Secure & Trusted',
                description: 'Bank-level encryption and PCI-DSS compliant payment processing',
                color: 'bg-green-500/10 text-green-600',
              },
            ].map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2, duration: 0.6 }}
                >
                  <Card className="h-full hover:shadow-xl transition-all duration-300 group cursor-pointer border-2 border-transparent hover:border-primary/20">
                    <CardContent className="p-8 text-center">
                      <motion.div
                        className={`w-16 h-16 ${feature.color} rounded-2xl flex items-center justify-center mx-auto mb-6`}
                        whileHover={{ rotate: 360, scale: 1.1 }}
                        transition={{ duration: 0.6 }}
                      >
                        <Icon className="w-8 h-8" />
                      </motion.div>
                      <h3 className="text-foreground mb-3 group-hover:text-primary transition-colors">
                        {feature.title}
                      </h3>
                      <p className="text-muted-foreground">
                        {feature.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          {/* Stats Section */}
          <motion.div
            className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            {[
              { number: '1M+', label: 'Flights Searched Daily' },
              { number: '500K+', label: 'Happy Travelers' },
              { number: '95%', label: 'Customer Satisfaction' },
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="p-6"
                whileHover={{ scale: 1.05 }}
              >
                <motion.div
                  className="text-4xl md:text-5xl font-bold text-foreground mb-2"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 + index * 0.1, type: "spring", stiffness: 200 }}
                >
                  {stat.number}
                </motion.div>
                <p className="text-muted-foreground">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Final CTA */}
          <motion.div
            className="text-center mt-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 shadow-lg"
              onClick={() => navigate('/flights/search')}
            >
              <Sparkles className="w-5 h-5 mr-2" />
              Explore Flights Now
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Journey Preview Section */}
      <section className="py-20 bg-gradient-to-b from-white to-secondary/20">
        <div className="container mx-auto px-4">
          <motion.div
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-foreground mb-6">
              Ready to Transform Your Travel Experience?
            </h2>
            <p className="text-muted-foreground mb-12 max-w-2xl mx-auto">
              Join thousands of travelers who save time and money with SkySmart's 
              intelligent booking platform. Your next adventure is just a click away.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  size="lg"
                  className="bg-accent text-accent-foreground hover:bg-accent/90 shadow-lg px-8"
                  onClick={() => navigate('/signup')}
                >
                  Get Started Free
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2"
                  onClick={() => navigate('/chat')}
                >
                  <Sparkles className="w-5 h-5 mr-2" />
                  Try AI Assistant
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
}
