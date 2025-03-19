'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useInView, useAnimation, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

// Define types for animation data
interface WavePoint {
  x: number;
  y: number;
}

interface AnimationData {
  wavePoints: WavePoint[][];
  gridLines: { id: number; x1: number; y1: number; x2: number; y2: number }[];
  dataPoints: { x: number; y: number; size: number }[];
}

export default function Hero() {
  const heroRef = useRef(null);
  const isInView = useInView(heroRef, { once: false });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  // Track mouse movement with reduced sensitivity for subtle interactions
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      const x = (clientX / innerWidth - 0.5) * 0.3;
      const y = (clientY / innerHeight - 0.5) * 0.3;
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Name typing animation
  const [typedName, setTypedName] = useState("");
  const [nameComplete, setNameComplete] = useState(false);
  const fullName = "Rakib Ahmed";
  
  useEffect(() => {
    if (!isInView) {
      setTypedName("");
      setNameComplete(false);
      return;
    }
    
    let timeoutId: NodeJS.Timeout;
    const animateText = () => {
      const duration = 1500; // Total duration in milliseconds
      const frameDuration = 1000 / 60; // ~60fps for smooth animation
      const totalSteps = duration / frameDuration;
      let step = 0;
      
      const animationFrame = () => {
        step++;
        const progress = step / totalSteps;
        const charIndex = Math.floor(progress * fullName.length);
        
        if (charIndex <= fullName.length) {
          setTypedName(fullName.substring(0, charIndex));
          
          if (charIndex === fullName.length) {
            setNameComplete(true);
          } else {
            timeoutId = setTimeout(animationFrame, frameDuration);
          }
        }
      };
      
      timeoutId = setTimeout(animationFrame, 500); // Initial delay
    };
    
    animateText();
    
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [isInView, fullName]);

  // Client-side animation data generation for algorithmic waves
  const [animationData, setAnimationData] = useState<AnimationData>({ 
    wavePoints: [], 
    gridLines: [],
    dataPoints: []
  });
  
  // Generate animation data on client-side only
  useEffect(() => {
    // Generate waves data
    const waveCount = 5; // Increased number of wave lines
    const pointCount = 120; // Increased points per wave
    const wavePoints: WavePoint[][] = [];
    const dataPoints: { x: number; y: number; size: number }[] = [];
    
    // Create multiple waves with different parameters
    for (let w = 0; w < waveCount; w++) {
      const points: WavePoint[] = [];
      const amplitude = 3 + (w * 2); // More subtle amplitudes
      const frequency = 0.08 + (w * 0.04); // Different frequency for each wave
      const phase = w * 0.5; // Phase shift for each wave
      const yOffset = 35 + (w * 8); // Different vertical positions, more centered
      
      for (let i = 0; i < pointCount; i++) {
        const x = i * (100 / pointCount);
        // Create sine wave with phase based on index
        const y = yOffset + Math.sin(i * frequency + phase) * amplitude;
        points.push({ x, y });
        
        // Add strategic data points
        if (i % 18 === 0 && i > 0 && i < pointCount - 1) {
          const size = 0.8 + Math.random() * 0.8; // Increased size for better visibility
          dataPoints.push({ x, y, size });
        }
      }
      wavePoints.push(points);
    }
    
    // Add some practical data points at intersections
    for (let i = 1; i < waveCount; i++) {
      for (let j = i + 1; j < waveCount; j++) {
        for (let k = 15; k < pointCount; k += 30) {
          const wave1 = wavePoints[i][k];
          const wave2 = wavePoints[j][k];
          
          // If waves are close, add a data point
          const distance = Math.abs(wave1.y - wave2.y);
          if (distance < 5) {
            const midX = (wave1.x + wave2.x) / 2;
            const midY = (wave1.y + wave2.y) / 2;
            const size = 1.2 + Math.random() * 0.6; // Increased size for better visibility
            dataPoints.push({ x: midX, y: midY, size });
          }
        }
      }
    }
    
    // Generate refined grid lines
    const gridLines = [];
    const gridSize = 8; // More grid lines for a refined appearance
    
    // Horizontal lines (spaced differently)
    for (let i = 1; i < gridSize; i++) {
      if (i % 2 === 0) continue; // Skip every other line for sparser grid
      const y = (i / gridSize) * 85 + 7.5; // Adjusted to cover more area
      gridLines.push({
        id: i,
        x1: 5,
        y1: y,
        x2: 95,
        y2: y,
      });
    }
    
    // Vertical lines (spaced differently)
    for (let i = 1; i < gridSize; i++) {
      if (i % 2 === 0) continue; // Skip every other line for sparser grid
      const x = (i / gridSize) * 85 + 7.5; // Adjusted to cover more area
      gridLines.push({
        id: i + gridSize,
        x1: x,
        y1: 5,
        x2: x,
        y2: 95,
      });
    }
    
    setAnimationData({ wavePoints, gridLines, dataPoints });
  }, []);

  // Helper function to convert points to SVG path
  const pointsToPath = (points: WavePoint[]) => {
    if (points.length === 0) return "";
    
    let path = `M ${points[0].x} ${points[0].y}`;
    
    // Use a smooth curve for transitions between points
    for (let i = 1; i < points.length; i++) {
      path += ` L ${points[i].x} ${points[i].y}`;
    }
    
    return path;
  };

  return (
    <section 
      id="home" 
      ref={heroRef}
      className="min-h-screen flex items-center justify-center relative bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950 overflow-hidden"
    >
      {/* Interactive background gradient */}
      <motion.div 
        className="absolute inset-0 opacity-20 dark:opacity-30 -z-10"
        style={{
          background: 'radial-gradient(circle at center, rgba(79, 70, 229, 0.2), transparent 70%), radial-gradient(circle at 70% 30%, rgba(236, 72, 153, 0.2), transparent 60%)',
          filter: 'blur(60px)'
        }}
        animate={{
          scale: [1, 1.05, 1],
          opacity: [0.2, 0.25, 0.2]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      {/* Glowing orbs with improved animation */}
      <motion.div 
        className="absolute top-20 left-[10%] w-64 h-64 bg-gradient-to-br from-primary/20 to-purple-500/10 rounded-full blur-[100px] dark:from-primary/15 dark:to-purple-500/10"
        animate={{ 
          scale: [1, 1.2, 1],
          x: [0, 20, 0],
          opacity: [0.4, 0.7, 0.4] 
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div 
        className="absolute bottom-10 right-[10%] w-96 h-96 bg-gradient-to-br from-accent/20 to-primary/10 rounded-full blur-[120px] dark:from-accent/15 dark:to-primary/10"
        animate={{ 
          scale: [1, 1.3, 1],
          x: [0, -20, 0],
          opacity: [0.3, 0.6, 0.3] 
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />
      
      <div className="container mx-auto px-4 z-10">
        <div className="max-w-4xl mx-auto">
          {/* Content with center layout */}
          <div className="flex flex-col items-center text-center">
            
            {/* Practical Algorithmic Animation */}
            <div className="relative w-48 h-48 md:w-56 md:h-56 mb-6">
              {animationData.wavePoints.length > 0 && (
      <motion.div 
                  className="absolute inset-0"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1 }}
                  style={{
                    backgroundImage: 'radial-gradient(circle at center, rgba(249, 250, 251, 0.03) 0%, transparent 80%)',
                    backdropFilter: 'blur(1px)'
                  }}
                >
                  <svg viewBox="0 0 100 100" width="100%" height="100%">
                    <defs>
                      <linearGradient id="waveGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#4F46E5" stopOpacity="0.3" />
                        <stop offset="100%" stopColor="#EC4899" stopOpacity="0.3" />
                      </linearGradient>
                      <linearGradient id="waveGradient2" x1="100%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#EC4899" stopOpacity="0.25" />
                        <stop offset="100%" stopColor="#4F46E5" stopOpacity="0.25" />
                      </linearGradient>
                      <linearGradient id="gridGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#4F46E5" stopOpacity="0.08" />
                        <stop offset="100%" stopColor="#4F46E5" stopOpacity="0.04" />
                      </linearGradient>
                    </defs>
                    
                    {/* Minimal grid lines - more refined */}
                    <g>
                      {animationData.gridLines.map((line) => (
                        <motion.line
                          key={`grid-${line.id}`}
                          x1={line.x1}
                          y1={line.y1}
                          x2={line.x2}
                          y2={line.y2}
                          stroke="url(#gridGradient)"
                          strokeWidth="0.2"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: [0, 0.7, 0.4] }}
                          transition={{ 
                            duration: 3,
                            delay: line.id * 0.08,
                            times: [0, 0.7, 1]
                          }}
                        />
                      ))}
                    </g>
                    
                    {/* Animated wave paths - alternating gradients */}
                    <g>
                      {animationData.wavePoints.map((points, index) => (
                        <motion.path
                          key={`wave-${index}`}
                          d={pointsToPath(points)}
                          fill="none"
                          stroke={index % 2 === 0 ? "url(#waveGradient1)" : "url(#waveGradient2)"}
                          strokeWidth="0.6"
                          initial={{ pathLength: 0, opacity: 0 }}
                          animate={{ 
                            pathLength: 1,
                            opacity: 0.85,
                            y: [0, index % 2 === 0 ? 2.5 : -2.5, 0],
                          }}
                          transition={{ 
                            pathLength: { 
                              duration: 2.5,
                              delay: index * 0.3
                            },
                            opacity: { 
                              duration: 1,
                              delay: index * 0.3
                            },
                            y: {
                              duration: 4 + index,
                              repeat: Infinity,
                              ease: "easeInOut"
                            }
                          }}
                        />
                      ))}
                    </g>
                    
                    {/* Data points with practical animations */}
                    <g>
                      {/* Wave highlight points */}
                      {animationData.wavePoints.map((points, waveIndex) => 
                        points.filter((_, i) => i % 20 === 0 && i > 0).map((point, index) => (
                          <motion.circle
                            key={`point-${waveIndex}-${index}`}
                            cx={point.x}
                            cy={point.y}
                            r="0.8"
                            fill={waveIndex % 2 === 0 ? "#4F46E5" : "#EC4899"}
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ 
                              scale: [0, 1.2, 0.9, 1.1],
                              opacity: [0, 0.9, 0.6, 0.9],
                              cy: [point.y, point.y + (waveIndex % 2 === 0 ? 3 : -3), point.y],
                            }}
                            transition={{ 
                              scale: { 
                                duration: 1.5,
                                repeat: Infinity,
                                repeatType: "reverse",
                                delay: (waveIndex * 0.2) + (index * 0.1)
                              },
                              opacity: { 
                                duration: 1.5,
                                repeat: Infinity,
                                repeatType: "reverse",
                                delay: (waveIndex * 0.2) + (index * 0.1)
                              },
                              cy: {
                                duration: 4 + waveIndex,
                                repeat: Infinity,
                                ease: "easeInOut"
                              }
                            }}
                          />
                        ))
                      )}
                      
                      {/* Strategic data points */}
                      {animationData.dataPoints.map((point, index) => (
                        <motion.circle
                          key={`datapoint-${index}`}
                          cx={point.x}
                          cy={point.y}
                          r={point.size}
                          fill={index % 3 === 0 ? "#4F46E5" : index % 3 === 1 ? "#EC4899" : "#6366F1"}
                          fillOpacity={0.8}
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ 
                            scale: [0, 1.2, 0.9, 1.2],
                            opacity: [0, 0.9, 0.7, 0.9],
                            cy: [point.y, point.y + (index % 2 === 0 ? 2 : -2), point.y]
                          }}
                          transition={{ 
                            duration: 2 + (index % 3),
                            delay: 0.5 + (index * 0.1),
                            repeat: Infinity,
                            repeatType: "reverse",
                            cy: {
                              duration: 3 + (index % 3),
                              repeat: Infinity,
                              repeatType: "mirror",
                              ease: "easeInOut"
                            }
                          }}
                        />
                      ))}
                      
                      {/* Connection lines between some data points */}
                      {animationData.dataPoints.slice(0, -1).map((point, index) => {
                        const nextPoint = animationData.dataPoints[index + 1];
                        // Only connect points that are nearby
                        const distance = Math.sqrt(
                          Math.pow(point.x - nextPoint.x, 2) + 
                          Math.pow(point.y - nextPoint.y, 2)
                        );
                        
                        if (distance < 25 && index % 2 === 0) {
                          return (
                            <motion.line
                              key={`connection-${index}`}
                              x1={point.x}
                              y1={point.y}
                              x2={nextPoint.x}
                              y2={nextPoint.y}
                              stroke={index % 3 === 0 ? "#4F46E5" : "#EC4899"}
                              strokeWidth="0.4"
                              strokeOpacity="0.6"
                              initial={{ opacity: 0 }}
        animate={{
                                opacity: [0, 0.7, 0],
                                pathLength: [0, 1, 0]
        }}
        transition={{ 
                                duration: 3,
                                delay: 1 + (index * 0.2),
                                repeat: Infinity,
                                repeatDelay: 0.5
                              }}
                            />
                          );
                        }
                        return null;
                      })}
                    </g>
                  </svg>
                </motion.div>
              )}
            </div>
            
            {/* Subtle indicator line */}
          <motion.div 
              className="w-12 h-px bg-gradient-to-r from-transparent via-primary to-transparent mb-4"
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 48, opacity: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
            />
            
            {/* Name with typing animation */}
            <div className="mb-4 relative">
              <motion.h1 
                className="text-4xl md:text-5xl lg:text-6xl font-bold"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <span className="inline-block relative">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                    {typedName}
                  </span>
                  <motion.span 
                    className="absolute top-0 -right-[5px] w-[2px] h-[90%] bg-primary inline-block"
                    animate={{ opacity: [1, 0] }}
                    transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut", repeatType: "reverse" }}
                  />
                </span>
              </motion.h1>
              
              {/* Geometric accent shapes */}
              <motion.div 
                className="absolute -right-4 -top-4 w-8 h-8 border border-primary/30 rounded-sm"
                initial={{ opacity: 0, rotate: 45, scale: 0.5 }}
                animate={{ opacity: 0.7, rotate: 45, scale: 1 }}
                transition={{ duration: 1, delay: 1 }}
              />
              
              <motion.div 
                className="absolute -left-6 -bottom-2 w-10 h-10 border border-accent/30 rounded-full"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 0.7, scale: 1 }}
                transition={{ duration: 1, delay: 1.2 }}
              />
            </div>
            
            {/* Role label - moved below name */}
            <motion.div 
              className="mb-4 text-xs tracking-widest uppercase text-gray-500 dark:text-gray-400 font-mono bg-gradient-to-r from-primary/10 to-accent/10 dark:from-primary/20 dark:to-accent/20 py-1 px-3 rounded-full inline-block"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              Senior Software Engineer
            </motion.div>
            
            {/* Bio text with reveal animation */}
            <motion.p 
              className="text-sm sm:text-base md:text-lg max-w-md text-gray-600 dark:text-gray-300 mb-8 leading-relaxed mx-auto px-4 sm:px-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: nameComplete ? 1 : 0, y: nameComplete ? 0 : 20 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              4+ years of experience in building scalable banking applications and digital systems. Passionate about creating efficient, robust solutions to complex problems.
            </motion.p>
            
            {/* Animated CTA buttons */}
            <motion.div 
              className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-6 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: nameComplete ? 1 : 0, y: nameComplete ? 0 : 20 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Link 
                href="#projects" 
                className="px-5 py-2 text-sm rounded-lg bg-gradient-to-r from-primary to-accent text-white font-medium shadow-md hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 transform hover:-translate-y-1"
              >
                View My Work
              </Link>
              <Link 
                href="#contact" 
                className="px-5 py-2 text-sm rounded-lg bg-gradient-to-br from-white/90 to-white/70 dark:from-gray-900/90 dark:to-gray-800/70 border border-gray-200/50 dark:border-gray-700/50 text-gray-700 dark:text-gray-300 font-medium shadow-sm hover:shadow-md transition-all duration-300 hover:border-primary/20 dark:hover:border-primary/20 transform hover:-translate-y-1"
              >
                Contact Me
              </Link>
            </motion.div>
            
            {/* Social links with interactive animations */}
              <motion.div 
              className="flex items-center justify-center flex-wrap gap-3"
                initial={{ opacity: 0 }}
              animate={{ opacity: nameComplete ? 1 : 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              >
              <div className="flex space-x-4">
                  {[
                    { name: 'GitHub', icon: 'github', href: 'https://github.com/IamRakibAhmed' },
                    { name: 'LinkedIn', icon: 'linkedin', href: 'https://www.linkedin.com/in/iamrakibahmed' },
                    { name: 'Email', icon: 'email', href: 'mailto:rakibofficial@gmail.com' }
                  ].map((platform) => (
                    <motion.a
                      key={platform.name}
                      href={platform.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm hover:border-primary dark:hover:border-primary transition-all duration-300"
                      whileHover={{ y: -3, backgroundColor: 'rgba(79, 70, 229, 0.1)' }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <span className="sr-only">{platform.name}</span>
                      {platform.icon === 'github' && (
                      <svg className="w-4 h-4 text-gray-700 dark:text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                        </svg>
                      )}
                      {platform.icon === 'linkedin' && (
                      <svg className="w-4 h-4 text-gray-700 dark:text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                        </svg>
                      )}
                      {platform.icon === 'email' && (
                      <svg className="w-4 h-4 text-gray-700 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      )}
                    </motion.a>
                  ))}
                </div>
                
                <motion.div 
                className="text-xs text-gray-500 dark:text-gray-400 flex items-center"
                  whileHover={{ scale: 1.05, color: '#4F46E5' }}
                >
                <svg className="w-3 h-3 mr-1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M19.5 10C19.5 17 12 23 12 23C12 23 4.5 17 4.5 10C4.5 6.13401 7.6 3 12 3C16.4 3 19.5 6.13401 19.5 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Dhaka, Bangladesh
                </motion.div>
              </motion.div>
            </div>
        </div>
      </div>
    </section>
  );
} 