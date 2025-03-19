'use client';

import { motion, useInView, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useRef, useState } from 'react';

export default function About() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-10% 0px" });
  const [expandedItem, setExpandedItem] = useState<number | null>(0);
  
  const toggleItem = (index: number) => {
    setExpandedItem(index);
  };
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
        when: "beforeChildren"
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };
  
  const fadeInScale = {
    hidden: { opacity: 0, scale: 0.98 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  const experienceItems = [
    { 
      title: 'Senior Software Development Officer',
      company: 'The City Bank PLC',
      period: 'Mar 2022 - Present',
      description: 'Leading development of scalable banking applications using Java, Spring Boot, and microservices architecture.',
      responsibilities: [
        'Spearheaded the development of CityLive, a digital corporate banking system, utilizing Java, Spring Boot, React, Docker, and Microservices to enable 24/7 banking transactions globally',
        'Developed and enhanced the CityTouch application, focusing on improving NPSB and BEFTN payment systems for seamless transactions',
        'Optimized database operations using Oracle and PostgreSQL, ensuring efficient data management and retrieval',
        'Led the Bancassurance project, implementing a verification document upload system and secure file transfer to SFTP servers',
        'Conducted code reviews, mentored junior developers, and implemented CI/CD pipelines using Jenkins and Docker'
      ],
      skills: ['Java', 'Spring Boot', 'Microservices', 'React', 'Docker']
    },
    { 
      title: 'Software Engineer',
      company: 'Apurba Technologies Ltd.',
      period: 'Nov 2020 - Feb 2022',
      description: 'Developed software solutions for government projects focused on Bengali language technology.',
      responsibilities: [
        'Developed and maintained software solutions for National Bangla Screen Reader and Bangla Font Interoperability projects',
        'Collaborated closely with the ICT Ministry of Bangladesh to gather requirements and ensure alignment with national standards',
        'Implemented RESTful APIs using Spring Boot to facilitate seamless data exchange between services',
        'Optimized MySQL database performance, ensuring high availability and reliability of the software systems',
        'Employed agile methodologies, participating in sprint planning, daily stand-ups, and retrospectives to ensure timely delivery'
      ],
      skills: ['Java', 'Spring Boot', 'MySQL', 'REST API', 'Docker', 'Kubernetes']
    },
  ];

  return (
    <section 
      id="about" 
      ref={sectionRef}
      className="py-24 bg-gradient-to-b from-white to-gray-50 dark:from-gray-950 dark:to-gray-900 overflow-hidden relative"
    >
      {/* Background elements for modern aesthetic */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[30%] -right-[10%] w-[500px] h-[500px] bg-gradient-to-br from-primary/10 to-purple-500/5 dark:from-primary/15 dark:to-purple-500/10 rounded-full blur-3xl opacity-70"></div>
        <div className="absolute -bottom-[20%] -left-[10%] w-[600px] h-[600px] bg-gradient-to-tr from-accent/10 to-primary/5 dark:from-accent/15 dark:to-primary/10 rounded-full blur-3xl opacity-70"></div>
      </div>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-6xl mx-auto" 
        >
          {/* Section header */}
          <div className="text-center mb-16">
            <motion.span
              variants={itemVariants}
              className="inline-block text-primary text-sm font-mono tracking-wider bg-gradient-to-r from-primary/10 to-accent/10 dark:from-primary/20 dark:to-accent/20 py-1 px-3 rounded-full mb-4"
            >
              ABOUT ME
            </motion.span>
            <motion.h2 
              variants={itemVariants}
              className="text-3xl md:text-4xl font-bold mb-4"
            >
              Experience & <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">Background</span>
            </motion.h2>
            <motion.p 
            variants={itemVariants}
              className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
            >
              With 4+ years of experience in Software Engineering, I'm passionate about creating exceptional digital experiences through clean code and modern technologies.
            </motion.p>
            </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left column: Photo, Skills, Location and Contact */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="lg:col-span-5 flex flex-col space-y-6"
            >
              {/* Photo container */}
              <div className="flex justify-center lg:justify-start">
                <motion.div 
                  className="relative w-72 h-80 md:w-96 md:h-[26rem]"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ 
                    duration: 0.6, 
                    ease: [0.22, 1, 0.36, 1] 
                  }}
                  whileHover={{ 
                    scale: 1.02,
                    transition: { duration: 0.2, ease: "easeOut" }
                  }}
                >
                  {/* Background layer */}
                  <motion.div 
                    className="absolute inset-0 -translate-x-3 -translate-y-3 bg-primary/10 rounded-xl dark:bg-primary/5"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4, delay: 0.3 }}
                    style={{ backdropFilter: "blur(8px)" }}
                  />
                  
                  {/* Main image container */}
                  <motion.div 
                    className="absolute inset-0 rounded-xl overflow-hidden border border-gray-100 dark:border-gray-800 shadow-md"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    <div className="absolute inset-0 bg-[url('/images/me.jpg')] bg-cover bg-center" />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/5 to-black/30" />
                  </motion.div>
                  
                  {/* Accent circle */}
                  <motion.div 
                    className="absolute -right-2 -bottom-2 w-10 h-10 bg-white dark:bg-gray-900 rounded-full flex items-center justify-center shadow-md"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ 
                      delay: 0.5, 
                      type: "spring", 
                      stiffness: 300, 
                      damping: 15 
                    }}
                  >
                    <div className="w-5 h-5 bg-gradient-to-br from-primary to-accent rounded-full" />
                  </motion.div>
                </motion.div>
              </div>
              
              {/* Location - MOVED TO LEFT */}
              <motion.div 
                variants={fadeInScale} 
                className="bg-white dark:bg-gray-900/50 p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 dark:border-gray-800"
              >
                <h3 className="text-sm font-semibold text-primary uppercase mb-4 tracking-wider">Location</h3>
                <div className="flex items-start space-x-3">
                  <svg className="w-5 h-5 text-gray-500 dark:text-gray-400 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <div>
                    <p className="font-medium">Dhaka, Bangladesh</p>
                    <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Available for remote work</p>
                  </div>
                </div>
              </motion.div>
              
              {/* Skills Section */}
              <motion.div 
                variants={fadeInScale} 
                className="bg-white dark:bg-gray-900/50 p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 dark:border-gray-800"
              >
                <h3 className="text-sm font-semibold text-primary uppercase mb-4 tracking-wider">Core Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {["Java", "Spring Boot", "Microservices", "React", "JavaScript", "REST API", "Docker", "MySQL", "Oracle", "Git", "TypeScript"].map((skill, i) => (
                    <motion.span 
                      key={skill} 
                      className="px-3 py-1.5 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-md text-xs font-medium"
                      variants={itemVariants}
                      custom={i}
                      initial="hidden"
                      animate={isInView ? "visible" : "hidden"}
                      transition={{ delay: i * 0.05 }}
                      whileHover={{ scale: 1.05, backgroundColor: "#f0f9ff", color: "#3b82f6" }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            </motion.div>
            
            {/* Right column: Experience and Education */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="lg:col-span-7 space-y-6"
            >
              {/* Experience Section */}
              <motion.div 
                variants={fadeInScale} 
                className="bg-gradient-to-br from-white to-white/90 dark:from-gray-900 dark:to-gray-900/80 p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 dark:border-gray-800"
              >
                <h3 className="text-sm font-semibold text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent uppercase mb-6 tracking-wider">Experience</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                  {/* Company names list - left side */}
                  <div className="md:col-span-4 space-y-2">
                    {experienceItems.map((item, index) => (
                      <div 
                        key={index}
                        onClick={() => toggleItem(index)}
                        className={`relative pl-4 border-l-2 py-3 px-3 -ml-3 rounded-md transition-all duration-300 cursor-pointer ${
                          expandedItem === index 
                            ? "border-primary bg-gradient-to-r from-primary/10 to-accent/5 dark:from-primary/20 dark:to-accent/10" 
                            : "border-gray-200 dark:border-gray-700 hover:border-primary/50 hover:bg-gray-50 dark:hover:bg-gray-800/30"
                        }`}
                      >
                        <div className={`absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-[4px] w-2 h-2 rounded-full ${
                          expandedItem === index 
                            ? "bg-gradient-to-r from-primary to-accent" 
                            : "bg-gray-300 dark:bg-gray-600"
                        }`}></div>
                        
                        <p className={`font-medium ${expandedItem === index ? "text-primary" : "text-gray-700 dark:text-gray-200"}`}>
                          {item.company}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {item.period}
                        </p>
                      </div>
                    ))}
                  </div>
                  
                  {/* Experience details - right side */}
                  <div className="md:col-span-8 min-h-[280px]">
                    <AnimatePresence mode="wait">
                      {expandedItem !== null && (
                        <motion.div
                          key={expandedItem}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                          className="h-full"
                        >
                          <h4 className="text-lg font-medium">
                            {experienceItems[expandedItem].title}
                          </h4>
                          <p className="text-primary font-medium text-sm mb-3">
                            {experienceItems[expandedItem].company}
                          </p>
                          
                          <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                            {experienceItems[expandedItem].description}
                          </p>
                          
                          <div className="space-y-3 mb-6">
                            <p className="text-sm font-medium text-gray-700 dark:text-gray-200">Key Responsibilities:</p>
                            <ul className="space-y-1.5 text-xs text-gray-600 dark:text-gray-300">
                              {experienceItems[expandedItem].responsibilities.map((responsibility, i) => (
                                <motion.li
                                  key={i}
                                  initial={{ opacity: 0, x: 10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: i * 0.1 }}
                                  className="flex items-start"
                                >
                                  <span className="inline-block w-1.5 h-1.5 bg-primary/60 dark:bg-primary/70 rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
                                  <span>{responsibility}</span>
                                </motion.li>
                              ))}
                            </ul>
                          </div>
                          
                          <div className="flex flex-wrap gap-2 mt-4">
                            {experienceItems[expandedItem].skills.map((skill, i) => (
                              <motion.span 
                                key={i}
                                initial={{ opacity: 0, y: 5 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.05 }}
                                className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-md text-xs font-medium"
                              >
                                {skill}
                              </motion.span>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>
              
              {/* Education - KEPT ON RIGHT */}
              <motion.div 
                variants={fadeInScale} 
                className="bg-gradient-to-br from-white to-white/90 dark:from-gray-900 dark:to-gray-900/80 p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 dark:border-gray-800 relative overflow-hidden"
              >
                {/* Subtle gradient background */}
                <div className="absolute inset-0 bg-gradient-to-br from-transparent to-primary/5 dark:to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                
                <h3 className="text-sm font-semibold text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent uppercase mb-6 tracking-wider relative z-10">Education</h3>
                
                <div className="relative z-10">
                  {/* Degree */}
                  <div className="flex items-center mb-2">
                    <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-blue-500 mb-4">
                        <path d="M11.7 2.805a.75.75 0 01.6 0A60.65 60.65 0 0122.83 8.72a.75.75 0 01-.231 1.337 49.949 49.949 0 00-9.902 3.912l-.003.002-.34.18a.75.75 0 01-.707 0A50.009 50.009 0 007.5 12.174v-.224c0-.131.067-.248.172-.311a54.614 54.614 0 014.653-2.52.75.75 0 00-.65-1.352 56.129 56.129 0 00-4.78 2.589 1.858 1.858 0 00-.859 1.228 49.803 49.803 0 00-4.634-1.527.75.75 0 01-.231-1.337A60.653 60.653 0 0111.7 2.805z" />
                        <path d="M13.06 15.473a48.45 48.45 0 017.666-3.282c.134 1.414.22 2.843.255 4.285a.75.75 0 01-.46.71 47.878 47.878 0 00-8.105 4.342.75.75 0 01-.832 0 47.877 47.877 0 00-8.104-4.342.75.75 0 01-.461-.71c.035-1.442.121-2.87.255-4.286A48.4 48.4 0 016 13.18v1.27a1.5 1.5 0 00-.14 2.508c-.09.38-.222.753-.397 1.11.452.213.901.434 1.346.661a6.729 6.729 0 00.551-1.608 1.5 1.5 0 00.14-2.67v-.645a48.549 48.549 0 013.44 1.668 2.25 2.25 0 002.12 0z" />
                        <path d="M4.462 19.462c.42-.419.753-.89 1-1.394.453.213.902.434 1.347.661a6.743 6.743 0 01-1.286 1.794.75.75 0 11-1.06-1.06z" />
                      </svg>
                    </div>
                    <p className="font-bold text-lg leading-tight">B.Sc. in Computer Science & Engineering</p>
                  </div>
                  
                  {/* University */}
                  <div className="flex items-center mb-5">
                    <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-gray-500 mb-4">
                        <path d="M11.584 2.376a.75.75 0 01.832 0l9 6a.75.75 0 11-.832 1.248L12 3.901 3.416 9.624a.75.75 0 01-.832-1.248l9-6z" />
                        <path fill-rule="evenodd" d="M20.25 10.332v9.918H21a.75.75 0 010 1.5H3a.75.75 0 010-1.5h.75v-9.918a.75.75 0 01.634-.74A49.109 49.109 0 0112 9c2.59 0 5.134.202 7.616.592a.75.75 0 01.634.74zm-7.5 2.418a.75.75 0 00-1.5 0v6.75a.75.75 0 001.5 0v-6.75zm3-.75a.75.75 0 01.75.75v6.75a.75.75 0 01-1.5 0v-6.75a.75.75 0 01.75-.75zM9 12.75a.75.75 0 00-1.5 0v6.75a.75.75 0 001.5 0v-6.75z" clip-rule="evenodd" />
                        <path d="M12 7.875a1.125 1.125 0 100-2.25 1.125 1.125 0 000 2.25z" />
                      </svg>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">University of Liberal Arts Bangladesh</p>
                  </div>
                  
                  <div className="flex flex-wrap gap-3 mb-6">
                    <div className="px-4 py-1.5 bg-transparent border border-primary/30 dark:border-primary/40 rounded-md text-sm font-medium text-primary">
                      Feb 2019 - Oct 2022
                    </div>
                    
                    <div className="px-4 py-1.5 bg-transparent border border-primary/30 dark:border-primary/40 rounded-md text-sm font-medium text-primary">
                      Graduated
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-gray-100 dark:border-gray-800">
                    <p className="text-xs font-semibold uppercase tracking-wider mb-2 text-gray-700 dark:text-gray-300">Relevant Coursework</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {["Data Structures and Algorithms", "Software Engineering", "Artificial Intelligence", "Machine Learning", "System Design"].map((course, i) => (
                        <motion.span 
                          key={course} 
                          className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-md text-xs font-medium"
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.05 }}
                          whileHover={{ scale: 1.05, backgroundColor: "#f0f9ff", color: "#3b82f6" }}
                          whileTap={{ scale: 0.95 }}
                        >
                          {course}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
} 