'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

// Define sample projects with a more minimalistic approach
const projects = [
  {
    id: 1,
    title: 'Bengali Parts-of-Speech Tagger',
    description: 'Created and deployed an NLP model that can predict the Parts-of-Speech of a given Bengali word or sequence with 98.39% accuracy.',
    image: 'https://images.unsplash.com/photo-1555952494-efd681c7e3f9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fG5hdHVyYWwlMjBsYW5ndWFnZSUyMHByb2Nlc3Npbmd8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60',
    tags: ['Python', 'TensorFlow', 'Keras', 'LSTM', 'NLP'],
    category: 'ai',
    github: 'https://github.com/IamRakibAhmed',
    live: '#',
  },
  {
    id: 2,
    title: 'Bengali Next Word Prediction',
    description: 'Developed a system that can predict the next word of a given word or sequence and complete the whole sentence with 84.13% accuracy.',
    image: 'https://images.unsplash.com/photo-1535378917042-10a22c95931a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGFydGlmaWNpYWwlMjBpbnRlbGxpZ2VuY2V8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60',
    tags: ['Python', 'TensorFlow', 'Keras', 'LSTM', 'NLP'],
    category: 'ai',
    github: 'https://github.com/IamRakibAhmed',
    live: '#',
  },
  {
    id: 3,
    title: 'Profile Management System',
    description: 'A web application that manages user profiles and information. Users can log in, log out, and view other users\' profiles.',
    image: 'https://images.unsplash.com/photo-1480694313141-fce5e697ee25?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8d2ViJTIwYXBwbGljYXRpb258ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60',
    tags: ['React.js', 'Spring Boot', 'MySQL'],
    category: 'fullstack',
    github: 'https://github.com/IamRakibAhmed',
    live: '#',
  },
  {
    id: 4,
    title: 'Video Recorder using Webcam',
    description: 'Windows application that allows users to record videos using their webcam and microphone, with digital processing capabilities.',
    image: 'https://images.unsplash.com/photo-1616763355548-1b606f439f86?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8d2ViY2FtfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60',
    tags: ['C#', 'OpenCV', 'DirectShowLib'],
    category: 'desktop',
    github: 'https://github.com/IamRakibAhmed',
    live: '#',
  },
  {
    id: 5,
    title: 'Smart System to Reduce High Beam Glare',
    description: 'Research project focused on developing an IoT solution to reduce high beam glare in vehicles, published in ICT4SD 2022.',
    image: 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    tags: ['IoT', 'Research', 'Hardware', 'Embedded Systems'],
    category: 'research',
    github: 'https://github.com/IamRakibAhmed',
    live: 'https://doi.org/10.1007/978-981-19-5224-1.7',
  },
  {
    id: 6,
    title: 'Bank Management System',
    description: 'Banking application with digital banking features, transaction processing, and account management capabilities.',
    image: 'https://images.unsplash.com/photo-1601597111158-2fceff292cdc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YmFua2luZ3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60',
    tags: ['Java', 'Spring Boot', 'MySQL', 'React'],
    category: 'fullstack',
    github: 'https://github.com/IamRakibAhmed',
    live: '#',
  },
];

// Filter categories
const categories = [
  { id: 'all', name: 'All Work' },
  { id: 'fullstack', name: 'Full Stack' },
  { id: 'ai', name: 'AI/ML' },
  { id: 'desktop', name: 'Desktop Apps' },
  { id: 'research', name: 'Research' },
];

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [categoryPositions, setCategoryPositions] = useState<{ [key: string]: { left: number, width: number } }>({});
  const categoriesRef = useRef<HTMLDivElement>(null);
  
  // Function to update category positions
  const updateCategoryPositions = useCallback(() => {
    if (categoriesRef.current) {
      const container = categoriesRef.current;
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
      
      setCategoryPositions(newPositions);
    }
  }, []);
  
  // Effect for initial mounting and updates
  useEffect(() => {
    // Update positions after a short delay to ensure DOM is fully rendered
    const timer = setTimeout(() => {
      updateCategoryPositions();
    }, 100);
    
    return () => clearTimeout(timer);
  }, [updateCategoryPositions]);
  
  // Update positions when categories or window size changes
  useEffect(() => {
    updateCategoryPositions();
    window.addEventListener('resize', updateCategoryPositions);
    return () => window.removeEventListener('resize', updateCategoryPositions);
  }, [activeCategory, updateCategoryPositions]);
  
  const filteredProjects = activeCategory === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeCategory);
  
  // Animation variants for container and items
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.2,
      }
    },
    exit: { 
      opacity: 0,
      transition: { duration: 0.2 }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }
    },
    exit: { 
      opacity: 0,
      transition: { duration: 0.2 }
    }
  };
  
  return (
    <section id="projects" className="py-24 bg-gradient-to-b from-white to-gray-50 dark:from-gray-950 dark:to-gray-900 relative overflow-hidden">
      {/* Background elements for modern aesthetic */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[30%] -right-[10%] w-[500px] h-[500px] bg-gradient-to-br from-primary/10 to-purple-500/5 dark:from-primary/15 dark:to-purple-500/10 rounded-full blur-3xl opacity-70"></div>
        <div className="absolute -bottom-[20%] -left-[10%] w-[600px] h-[600px] bg-gradient-to-tr from-accent/10 to-primary/5 dark:from-accent/15 dark:to-primary/10 rounded-full blur-3xl opacity-70"></div>
      </div>
      
      <div className="container relative z-10 mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto mb-16 text-center"
        >
          <span className="inline-block text-primary text-sm font-mono tracking-wider bg-gradient-to-r from-primary/10 to-accent/10 dark:from-primary/20 dark:to-accent/20 py-1 px-3 rounded-full mb-4">MY WORK</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4 font-title">Selected <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">Projects</span></h2>
          <p className="text-secondary dark:text-gray-400 max-w-2xl mx-auto font-poppins">
            A showcase of my recent work, ranging from web applications to software solutions 
            that solve real-world problems.
          </p>
          
          {/* Category Filter - Redesigned to match Skills section */}
          <div className="flex justify-center mt-10">
            <div 
              ref={categoriesRef}
              className="inline-flex p-1 bg-gradient-to-br from-white/90 to-white/70 dark:from-gray-900/90 dark:to-gray-800/70 rounded-full shadow-sm border border-gray-100/50 dark:border-gray-800/50 relative"
            >
              {categoryPositions[activeCategory] && (
                <span 
                  className="absolute bg-gradient-to-r from-primary/70 to-accent/70 rounded-full transition-all duration-300 ease-in-out opacity-40 backdrop-blur-sm"
                  style={{
                    top: '6px',
                    left: categoryPositions[activeCategory].left + 6,
                    width: categoryPositions[activeCategory].width - 12,
                    height: 'calc(100% - 12px)',
                    zIndex: 0
                  }}
                />
              )}
              {categories.map(category => (
                <button
                  key={category.id}
                  data-id={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`relative px-5 py-2 text-sm font-medium rounded-full transition-all duration-300 z-10 ${
                    activeCategory === category.id ? 
                      'text-white' : 
                      'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </motion.div>
        
        {/* Projects Grid with fixed animation issues */}
        <div className="max-w-6xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div 
              key={activeCategory}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredProjects.map(project => (
                <motion.div
                  key={project.id}
                  variants={itemVariants}
                  className="bg-white dark:bg-gray-800/70 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 dark:border-gray-700/50 group relative"
                >
                  {/* Simple background hover effect without using border */}
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/0 to-accent/0 group-hover:from-primary/5 group-hover:to-accent/5 transition-colors duration-300 pointer-events-none"></div>
                  
                  {/* Project Image */}
                  <div className="h-48 bg-gray-200 dark:bg-gray-700 relative overflow-hidden">
                    <Image 
                      src={project.image} 
                      alt={project.title}
                      fill
                      style={{ objectFit: 'cover' }}
                      className="transition-transform duration-500 group-hover:scale-105"
                    />
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-br from-primary/80 to-accent/80 dark:from-primary/90 dark:to-accent/90 flex items-center justify-center"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 0.95 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="flex gap-4">
                        <Link
                          href={project.github}
                          className="p-2 bg-white/20 hover:bg-white/30 rounded-full transition-all duration-200"
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="View GitHub Repository"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                          </svg>
                        </Link>
                        <Link
                          href={project.live}
                          className="p-2 bg-white/20 hover:bg-white/30 rounded-full transition-all duration-200"
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="View Live Demo"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </Link>
                      </div>
                    </motion.div>
                  </div>
                  
                  {/* Project Content */}
                  <div className="p-6">
                    <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors font-title">{project.title}</h3>
                    <p className="text-secondary dark:text-gray-400 text-sm mb-4 line-clamp-2 font-poppins">{project.description}</p>
                    
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      {project.tags.slice(0, 3).map(tag => (
                        <span 
                          key={tag} 
                          className="px-2 py-1 bg-gradient-to-r from-gray-100 to-gray-50 dark:from-gray-700/60 dark:to-gray-800/60 text-secondary dark:text-gray-400 text-xs rounded-md"
                        >
                          {tag}
                        </span>
                      ))}
                      {project.tags.length > 3 && (
                        <span className="px-2 py-1 text-secondary dark:text-gray-400 text-xs">
                          +{project.tags.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
        
        {/* Call to action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16 text-center"
        >
          <Link 
            href="https://github.com/IamRakibAhmed" 
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2 text-sm bg-gradient-to-r from-primary to-accent text-white rounded-lg font-medium shadow-md hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 transform hover:-translate-y-1"
          >
            <span>View More on GitHub</span>
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 12H19M19 12L13 6M19 12L13 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
} 