'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { staggerContainer, staggerItem, progressBarVariants } from '../utils/animations';
import { SectionContainer, SectionHeader } from '../utils/componentFactory';
import { usePrefersReducedMotion, useIsMobile } from '../utils/mediaUtils';

// Define types for skills
type SkillItem = {
  name: string;
  level: string;
  icon: string;
};

type SkillsData = {
  [key: string]: SkillItem[];
};

// Skills data - extracted for easier maintenance
const skills: SkillsData = {
  frontend: [
    { name: 'React', level: 'Advanced', icon: '⚛️' },
    { name: 'TypeScript', level: 'Advanced', icon: '𝐓𝐒' },
    { name: 'JavaScript', level: 'Advanced', icon: '𝐉𝐒' },
    { name: 'HTML/CSS', level: 'Advanced', icon: '📄' },
    { name: 'Tailwind CSS', level: 'Advanced', icon: '🌊' },
    { name: 'd3.js', level: 'Intermediate', icon: '📊' },
  ],
  backend: [
    { name: 'Java', level: 'Advanced', icon: '☕' },
    { name: 'Spring Boot', level: 'Advanced', icon: '🍃' },
    { name: 'Microservices', level: 'Advanced', icon: '🧩' },
    { name: 'REST API', level: 'Advanced', icon: '🔄' },
    { name: 'SOAP API', level: 'Intermediate', icon: '📨' },
    { name: 'Hibernate', level: 'Advanced', icon: '🗄️' },
  ],
  databases: [
    { name: 'MySQL', level: 'Advanced', icon: '🐬' },
    { name: 'Oracle', level: 'Advanced', icon: '📀' },
    { name: 'PostgreSQL', level: 'Intermediate', icon: '🐘' },
    { name: 'MongoDB', level: 'Intermediate', icon: '🍃' },
    { name: 'SQLite', level: 'Intermediate', icon: '💾' },
  ],
  devops: [
    { name: 'Docker', level: 'Advanced', icon: '🐳' },
    { name: 'Kubernetes', level: 'Intermediate', icon: '☸️' },
    { name: 'Git', level: 'Advanced', icon: '🔀' },
    { name: 'CI/CD', level: 'Intermediate', icon: '🔄' },
    { name: 'Jenkins', level: 'Intermediate', icon: '🔧' },
    { name: 'Kafka', level: 'Intermediate', icon: '📬' },
    { name: 'ELK Stack', level: 'Intermediate', icon: '📊' },
  ]
};

export default function Skills() {
  const [activeTab, setActiveTab] = useState('frontend');
  const [hasMounted, setHasMounted] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();
  const isMobile = useIsMobile();
  const [tabPositions, setTabPositions] = useState<{ [key: string]: { left: number, width: number } }>({});
  const tabsRef = useRef<HTMLDivElement>(null);
  
  // Function to update tab positions
  const updateTabPositions = useCallback(() => {
    if (tabsRef.current) {
      const container = tabsRef.current;
      const buttons = container.querySelectorAll('button');
      const newPositions: { [key: string]: { left: number, width: number } } = {};
      
      buttons.forEach((button) => {
        const id = button.getAttribute('data-id') || '';
        const rect = button.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();
        
        newPositions[id] = {
          left: rect.left - containerRect.left,
          width: rect.width
        };
      });
      
      setTabPositions(newPositions);
    }
  }, []);
  
  // Mark component as mounted after first render
  useEffect(() => {
    setHasMounted(true);
    
    // Update positions after a short delay to ensure DOM is fully rendered
    const timer = setTimeout(() => {
      updateTabPositions();
    }, 100);
    
    return () => clearTimeout(timer);
  }, [updateTabPositions]);
  
  // Update positions when tabs or window size changes
  useEffect(() => {
    updateTabPositions();
    window.addEventListener('resize', updateTabPositions);
    return () => window.removeEventListener('resize', updateTabPositions);
  }, [activeTab, updateTabPositions]); // Include both dependencies
  
  // Categories for the tabs
  const categories = [
    { id: 'frontend', label: 'Frontend' },
    { id: 'backend', label: 'Backend' },
    { id: 'databases', label: 'Databases' },
    { id: 'devops', label: 'DevOps' },
  ];

  // Get the grid layout size based on the active tab
  const getGridLayout = () => {
    const count = skills[activeTab].length;
    if (count <= 3) return "grid-cols-1 md:grid-cols-3";
    if (count <= 4) return "grid-cols-1 sm:grid-cols-2 md:grid-cols-4";
    return "grid-cols-1 sm:grid-cols-2 md:grid-cols-3";
  };

  // Skill grid content
  const SkillsContent = (
    <>
      {/* Skills Category Navigation */}
      <motion.div 
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="flex justify-center mb-16"
      >
        <div 
          ref={tabsRef}
          className="inline-flex p-1 bg-gradient-to-br from-white/90 to-white/70 dark:from-gray-900/90 dark:to-gray-800/70 rounded-full shadow-sm border border-gray-100/50 dark:border-gray-800/50 relative"
        >
          {tabPositions[activeTab] && (
            <span 
              className="absolute bg-gradient-to-r from-primary/70 to-accent/70 rounded-full transition-all duration-300 ease-in-out opacity-40 backdrop-blur-sm"
              style={{
                top: '6px',
                left: tabPositions[activeTab].left + 6,
                width: tabPositions[activeTab].width - 12,
                height: 'calc(100% - 12px)',
                zIndex: 0
              }}
            />
          )}
          {categories.map((category, index) => (
            <button
              key={category.id}
              data-id={category.id}
              onClick={() => setActiveTab(category.id)}
              className={`relative px-5 py-2 text-sm font-medium rounded-full transition-all duration-300 z-10 ${
                activeTab === category.id ? 
                  'text-white' : 
                  'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>
      </motion.div>
      
      {/* Skills Grid */}
      <div className="mb-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={`grid ${getGridLayout()} gap-6`}
          >
            {skills[activeTab].map((skill) => (
              <motion.div
                key={skill.name}
                variants={staggerItem}
                layout={!prefersReducedMotion && !isMobile}
                className="bg-white dark:bg-gray-800/70 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 dark:border-gray-700/50 hover:border-primary/20 dark:hover:border-primary/20 group relative overflow-hidden"
              >
                {/* Subtle gradient background */}
                <div className="absolute inset-0 bg-gradient-to-br from-transparent to-primary/5 dark:to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                
                <div className="flex items-start relative z-10">
                  <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-primary/20 to-primary/10 dark:from-primary/30 dark:to-primary/20 rounded-lg flex items-center justify-center text-lg mr-4">
                    {skill.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1 group-hover:text-primary transition-colors font-title">
                      {skill.name}
                    </h3>
                    
                    <div className="flex items-center">
                      <div className="h-1.5 w-20 bg-gray-200 dark:bg-gray-700 rounded-full mr-2 overflow-hidden">
                        <motion.div 
                          className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
                          variants={progressBarVariants}
                          custom={skill.level}
                          initial="hidden"
                          animate="visible"
                        />
                      </div>
                      <span className="text-xs text-gray-500 dark:text-gray-400">{skill.level}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </>
  );

  return (
    <SectionContainer 
      id="skills"
      bgClassName="bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950"
    >
      <SectionHeader
        badge="MY TOOLKIT"
        title="Technical"
        highlight="Skills"
        description="With extensive experience in building modern web applications, I've developed proficiency in a wide range of technologies and tools."
      />
      {SkillsContent}
    </SectionContainer>
  );
} 