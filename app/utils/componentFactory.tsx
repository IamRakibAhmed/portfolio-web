'use client';

import React, { ReactNode, useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from './hooks';
import { fadeInUp } from './animations';

type SectionHeaderProps = {
  badge: string;
  title: string;
  highlight?: string;
  description: string;
  className?: string;
};

/**
 * Reusable section header component that maintains consistent styling
 */
export const SectionHeader = ({
  badge,
  title,
  highlight,
  description,
  className = ''
}: SectionHeaderProps) => {
  return (
    <div className={`text-center mb-16 ${className}`}>
      <motion.span
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="inline-block text-primary text-sm font-mono tracking-wider bg-gradient-to-r from-primary/10 to-accent/10 dark:from-primary/20 dark:to-accent/20 py-1 px-3 rounded-full mb-4"
      >
        {badge}
      </motion.span>
      
      <motion.h2
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="text-3xl md:text-4xl font-bold mt-2 mb-4 font-title"
      >
        {title}
        {highlight && (
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
            {' '}{highlight}
          </span>
        )}
      </motion.h2>
      
      <motion.p
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
        className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
      >
        {description}
      </motion.p>
    </div>
  );
};

type SectionContainerProps = {
  id: string;
  children: ReactNode;
  className?: string;
  bgClassName?: string;
};

/**
 * Reusable section container component with animation visibility detection
 */
export const SectionContainer = ({
  id,
  children,
  className = '',
  bgClassName = 'bg-white dark:bg-gray-950',
}: SectionContainerProps) => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-10% 0px" });

  return (
    <section
      id={id}
      ref={sectionRef}
      className={`py-24 ${bgClassName}`}
    >
      <div className="container mx-auto px-4">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className={`max-w-5xl mx-auto ${className}`}
        >
          {children}
        </motion.div>
      </div>
    </section>
  );
};

/**
 * Factory function to create a section with standardized layout
 */
export function createSection({
  id,
  badge,
  title,
  highlight,
  description,
  content,
  bgClassName,
}: {
  id: string;
  badge: string;
  title: string;
  highlight?: string;
  description: string;
  content: ReactNode;
  bgClassName?: string;
}) {
  return (
    <SectionContainer id={id} bgClassName={bgClassName}>
      <SectionHeader 
        badge={badge}
        title={title}
        highlight={highlight}
        description={description}
      />
      {content}
    </SectionContainer>
  );
} 