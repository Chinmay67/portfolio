/**
 * Technical Expertise Section Component
 * Purpose: Demonstrate breadth and depth of technical skills
 * Premium visualizations with multiple view options
 */

'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import SkillGraph from './SkillGraph';
import SkillGridEnhanced from './SkillGridEnhanced';
import SkillCarousel3D from './SkillCarousel3D';
import styles from './TechnicalExpertise.module.css';

interface TechnicalExpertiseProps {
  onSkillSelect?: (skill: string | null) => void;
  selectedSkill?: string | null;
}

export default function TechnicalExpertise({ onSkillSelect, selectedSkill }: TechnicalExpertiseProps) {
  const [viewMode, setViewMode] = useState<'grid-enhanced' | 'carousel' | 'constellation' | 'grid'>('grid-enhanced');
  const categories = [
    {
      label: 'Backend',
      icon: '⚡',
      color: '#3b82f6',
      technologies: ['Node.js', 'Express', 'PostgreSQL', 'MongoDB', 'Redis', 'PHP', 'MySQL', 'JWT', 'REST APIs']
    },
    {
      label: 'Cloud & DevOps',
      icon: '☁️',
      color: '#10b981',
      technologies: ['AWS', 'Docker', 'Git', 'Linux', 'GitHub']
    },
    {
      label: 'Frontend',
      icon: '🎨',
      color: '#8b5cf6',
      technologies: ['React', 'TypeScript', 'JavaScript', 'HTML5', 'CSS3']
    },
    {
      label: 'Tools & Platforms',
      icon: '🛠️',
      color: '#f59e0b',
      technologies: ['Postman', 'VS Code', 'Figma', 'Firebase', 'Cloudinary', 'Multer', 'CAPTCHA']
    },
    {
      label: 'AI & Data',
      icon: '🤖',
      color: '#ec4899',
      technologies: ['LLMs', 'RAG', 'pg_trgm', 'Full-Text Search']
    }
  ];

  return (
    <section className={styles.expertise}>
      {/* Section Heading */}
      <motion.div 
        className={styles.header}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <div className={styles.headerContent}>
          <div>
            <h2 id="skills-heading" className={styles.heading}>
              Technical Expertise
            </h2>
            <p className={styles.subheading}>
              {viewMode === 'grid-enhanced' && 'Premium 3D cards with proficiency indicators'}
              {viewMode === 'carousel' && '3D rotating carousel with interactive flip cards'}
              {viewMode === 'constellation' && 'Interactive skill map showing technology relationships'}
              {viewMode === 'grid' && 'Clean categorized view of all technologies'}
            </p>
          </div>
          
          {/* View Selector */}
          <div className={styles.viewToggle} role="group" aria-label="View mode toggle">
            <button
              className={`${styles.toggleButton} ${viewMode === 'grid-enhanced' ? styles.active : ''}`}
              onClick={() => setViewMode('grid-enhanced')}
              aria-label="Switch to premium grid view"
              aria-pressed={viewMode === 'grid-enhanced'}
            >
              <span className={styles.toggleIcon}>✨</span>
              <span className={styles.toggleLabel}>Grid</span>
            </button>
            <button
              className={`${styles.toggleButton} ${viewMode === 'carousel' ? styles.active : ''}`}
              onClick={() => setViewMode('carousel')}
              aria-label="Switch to 3D carousel view"
              aria-pressed={viewMode === 'carousel'}
            >
              <span className={styles.toggleIcon}>🎡</span>
              <span className={styles.toggleLabel}>3D</span>
            </button>
            <button
              className={`${styles.toggleButton} ${viewMode === 'constellation' ? styles.active : ''}`}
              onClick={() => setViewMode('constellation')}
              aria-label="Switch to constellation view"
              aria-pressed={viewMode === 'constellation'}
            >
              <span className={styles.toggleIcon}>🌌</span>
              <span className={styles.toggleLabel}>Constellation</span>
            </button>
            {/* <button
              className={`${styles.toggleButton} ${viewMode === 'grid' ? styles.active : ''}`}
              onClick={() => setViewMode('grid')}
              aria-label="Switch to grid view"
              aria-pressed={viewMode === 'grid'}
            >
              <span className={styles.toggleIcon}>📊</span>
              <span className={styles.toggleLabel}>Grid</span>
            </button> */}
          </div>
        </div>
      </motion.div>

      {/* View Container - Prevents position jump when switching */}
      <div className={styles.viewContainer}>
        {/* Premium Enhanced Grid View */}
        {viewMode === 'grid-enhanced' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          >
            <SkillGridEnhanced
              onSkillClick={(skill) => {
                if (onSkillSelect) {
                  onSkillSelect(selectedSkill === skill ? null : skill);
                }
              }}
              selectedSkill={selectedSkill}
            />
          </motion.div>
        )}

        {/* 3D Carousel View */}
        {viewMode === 'carousel' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          >
            <SkillCarousel3D
              onSkillClick={(skill) => {
                if (onSkillSelect) {
                  onSkillSelect(selectedSkill === skill ? null : skill);
                }
              }}
              selectedSkill={selectedSkill}
            />
          </motion.div>
        )}

        {/* Constellation View */}
        {viewMode === 'constellation' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          >
            <SkillGraph 
              onSkillClick={(skill) => {
                if (onSkillSelect) {
                  onSkillSelect(selectedSkill === skill ? null : skill);
                }
              }}
              selectedSkill={selectedSkill}
            />
          </motion.div>
        )}

        {/* Grid View */}
        {viewMode === 'grid' && (
          <motion.div 
            className={styles.skillsGrid}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          >
          {categories.map((category, categoryIndex) => (
            <motion.div 
              key={category.label} 
              className={styles.categoryCard}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ 
                duration: 0.4, 
                ease: 'easeOut',
                delay: categoryIndex * 0.1
              }}
              style={{ '--accent-color': category.color } as React.CSSProperties}
            >
              {/* Card Header */}
              <div className={styles.cardHeader}>
                <span className={styles.categoryIcon}>{category.icon}</span>
                <h3 className={styles.categoryLabel}>{category.label}</h3>
              </div>
              
              {/* Tech Tags */}
              <div className={styles.techList}>
                {category.technologies.map((tech, techIndex) => (
                  <motion.span 
                    key={tech} 
                    className={styles.techTag}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
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

              {/* Decorative corner accent */}
              <div className={styles.cornerAccent} />
            </motion.div>
          ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}
