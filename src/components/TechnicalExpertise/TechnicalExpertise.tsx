/**
 * Technical Expertise Section Component
 * Purpose: Demonstrate breadth and depth of technical skills
 * Content from rules.txt Phase 7
 */

'use client';

import { motion } from 'framer-motion';
import styles from './TechnicalExpertise.module.css';

export default function TechnicalExpertise() {
  const categories = [
    {
      label: 'Backend',
      technologies: ['Node.js', 'Express', 'PostgreSQL', 'MongoDB', 'Redis', 'REST APIs']
    },
    {
      label: 'Cloud/DevOps',
      technologies: ['AWS', 'Docker', 'Git', 'Linux']
    },
    {
      label: 'Frontend',
      technologies: ['React', 'TypeScript', 'JavaScript', 'HTML5', 'CSS3']
    },
    {
      label: 'Tools',
      technologies: ['Postman', 'VS Code', 'Figma', 'Firebase']
    }
  ];

  return (
    <div className={styles.expertise}>
      {/* Section Heading */}
      <motion.h2 
        id="skills-heading" 
        className={styles.heading}
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      >
        Technical Expertise
      </motion.h2>

      {/* Skills Grid */}
      <div className={styles.skillsGrid}>
        {categories.map((category, categoryIndex) => (
          <motion.div 
            key={category.label} 
            className={styles.category}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ 
              duration: 0.3, 
              ease: 'easeOut',
              delay: categoryIndex * 0.1
            }}
          >
            <h3 className={styles.categoryLabel}>{category.label}</h3>
            <div className={styles.techList}>
              {category.technologies.map((tech, techIndex) => (
                <motion.span 
                  key={tech} 
                  className={styles.techTag}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ 
                    duration: 0.3, 
                    ease: 'easeOut',
                    delay: (categoryIndex * 0.1) + (techIndex * 0.05)
                  }}
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
