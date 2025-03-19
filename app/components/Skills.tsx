'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';

const skills = {
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
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-10% 0px" });

  const categories = [
    { id: 'frontend', label: 'Frontend' },
    { id: 'backend', label: 'Backend' },
    { id: 'databases', label: 'Databases' },
    { id: 'devops', label: 'DevOps' },
  ];
  
  // Animation variants for smoother transitions between categories
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1
      }
    },
    exit: {
      opacity: 0,
      transition: { 
        duration: 0.2,
        when: "afterChildren",
        staggerChildren: 0.03,
        staggerDirection: -1
      }
    }
  };
  
  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 20,
      scale: 0.95
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: { 
        type: "spring",
        stiffness: 260,
        damping: 20,
        mass: 0.5
      }
    },
    exit: { 
      opacity: 0, 
      y: -10,
      scale: 0.95,
      transition: { duration: 0.2 }
    }
  };

  // Progress bar animation
  const progressVariants = {
    hidden: { width: 0 },
    visible: (level) => ({
      width: level === 'Advanced' ? '100%' : level === 'Intermediate' ? '65%' : '40%',
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
    })
  };

  // Get the grid layout size based on the active tab
  const getGridLayout = () => {
    const count = skills[activeTab].length;
    if (count <= 3) return "grid-cols-1 md:grid-cols-3";
    if (count <= 4) return "grid-cols-1 sm:grid-cols-2 md:grid-cols-4";
    return "grid-cols-1 sm:grid-cols-2 md:grid-cols-3";
  };

  return (
    <section 
      id="skills" 
      ref={sectionRef}
      className="py-24 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950"
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="max-w-5xl mx-auto"
        >
          {/* Section Header */}
          <div className="text-center mb-16">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-block text-primary text-sm font-mono tracking-wider bg-gradient-to-r from-primary/10 to-accent/10 dark:from-primary/20 dark:to-accent/20 py-1 px-3 rounded-full mb-4"
            >
              MY TOOLKIT
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-3xl md:text-4xl font-bold mt-2 mb-4"
            >
              Technical <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">Skills</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
            >
              With extensive experience in building modern web applications, I've developed
              proficiency in a wide range of technologies and tools.
            </motion.p>
          </div>
          
          {/* Skills Category Navigation */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 0.4, delay: 0.4 }}
            className="flex justify-center mb-16"
          >
            <div className="inline-flex p-1 bg-gradient-to-br from-white/90 to-white/70 dark:from-gray-900/90 dark:to-gray-800/70 rounded-full shadow-sm border border-gray-100/50 dark:border-gray-800/50">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveTab(category.id)}
                  className={`relative px-5 py-2 text-sm font-medium rounded-full transition-all duration-300 ${
                    activeTab === category.id ? 
                      'text-white' : 
                      'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                  }`}
                >
                  {activeTab === category.id && (
                    <motion.span 
                      layoutId="activeTabBg"
                      className="absolute inset-0 bg-gradient-to-r from-primary to-accent rounded-full -z-10"
                      transition={{ 
                        type: "spring", 
                        stiffness: 300, 
                        damping: 30,
                        duration: 0.3
                      }}
                    />
                  )}
                  {category.label}
                </button>
              ))}
            </div>
          </motion.div>
          
          {/* Skills Grid */}
          <div className="mb-16">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className={`grid ${getGridLayout()} gap-6`}
              >
                {skills[activeTab].map((skill) => (
                  <motion.div
                    key={skill.name}
                    variants={itemVariants}
                    layout
                    className="bg-white dark:bg-gray-800/70 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 dark:border-gray-700/50 hover:border-primary/20 dark:hover:border-primary/20 group relative overflow-hidden"
                  >
                    {/* Subtle gradient background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-transparent to-primary/5 dark:to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                    
                    <div className="flex items-start relative z-10">
                      <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-primary/20 to-primary/10 dark:from-primary/30 dark:to-primary/20 rounded-lg flex items-center justify-center text-lg mr-4">
                        {skill.icon}
                      </div>
                      <div>
                        <h3 className="font-bold text-lg mb-1 group-hover:text-primary transition-colors">
                          {skill.name}
                        </h3>
                        
                        <div className="flex items-center">
                          <div className="h-1.5 w-20 bg-gray-200 dark:bg-gray-700 rounded-full mr-2 overflow-hidden">
                            <motion.div 
                              className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
                              variants={progressVariants}
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
          
          {/* Learning Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-16 text-center"
          >
            <h3 className="text-xl font-bold mb-6 inline-flex items-center">
              <span className="mr-2">Currently <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">Learning</span></span>
              <motion.div
                animate={{ rotate: [0, 10, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
                className="inline-block"
              >
                🚀
              </motion.div>
            </h3>
            <div className="flex flex-wrap gap-3 justify-center">
              {['Machine Learning', 'Artificial Intelligence', 'NLP', 'Cloud Architecture', 'Blockchain Technology'].map((tech) => (
                <motion.span
                  key={tech}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, delay: Math.random() * 0.5 }}
                  className="px-4 py-2 rounded-full bg-gradient-to-br from-white/90 to-white/70 dark:from-gray-900/90 dark:to-gray-800/70 text-gray-700 dark:text-gray-300 text-sm font-medium border border-gray-100/50 dark:border-gray-800/50 shadow-sm hover:border-primary/30 hover:text-primary dark:hover:text-primary transition-all duration-300 hover:shadow-md"
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
} 