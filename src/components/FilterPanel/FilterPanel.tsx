/**
 * Filter Panel Component
 * Slide-in panel displaying filtered Experience and Projects
 * Provides smooth, interactive filtering UX without losing context
 */

'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useMemo } from 'react';
import Experience from '@/components/Experience';
import Projects from '@/components/Projects';
import styles from './FilterPanel.module.css';

interface FilterPanelProps {
  selectedSkill: string | null;
  onClearFilter: () => void;
}

// Data for filtering calculations
const experiences = [
  {
    company: 'Juspay',
    technologies: ['React', 'Node.js', 'Express', 'TypeScript', 'JavaScript', 'HTML5', 'CSS3', 'PostgreSQL', 'Docker', 'Redis', 'LLMs', 'RAG', 'pg_trgm', 'Full-Text Search', 'JWT', 'REST APIs', 'Git', 'GitHub', 'VS Code', 'Postman']
  },
  {
    company: 'Inditech Health Solution',
    technologies: ['PHP', 'MySQL', 'AWS', 'Redis', 'HTML5', 'CSS3', 'Git', 'GitHub', 'VS Code', 'Postman']
  },
  {
    company: 'GrowthSay',
    technologies: ['Node.js', 'Express', 'React', 'TypeScript', 'JavaScript', 'HTML5', 'CSS3', 'Firebase', 'CAPTCHA', 'JWT', 'REST APIs', 'Git', 'GitHub', 'VS Code', 'Postman']
  }
];

const projects = [
  {
    name: 'StreamZone',
    techStack: ['React', 'Node.js', 'Express', 'MongoDB', 'Cloudinary', 'Multer', 'Firebase', 'JWT', 'REST APIs', 'TypeScript', 'JavaScript', 'HTML5', 'CSS3', 'Git', 'GitHub', 'VS Code', 'Postman']
  },
  {
    name: 'UniFind',
    techStack: ['React', 'Node.js', 'Express', 'MongoDB', 'JWT', 'REST APIs', 'TypeScript', 'JavaScript', 'HTML5', 'CSS3', 'Git', 'GitHub', 'VS Code', 'Postman']
  }
];

export default function FilterPanel({ selectedSkill, onClearFilter }: FilterPanelProps) {
  const isOpen = selectedSkill !== null;

  // Calculate filtered counts
  const { hasExperiences, hasProjects } = useMemo(() => {
    if (!selectedSkill) return { hasExperiences: true, hasProjects: true };

    const filteredExperiences = experiences.filter(exp =>
      exp.technologies.some(tech =>
        tech.toLowerCase().includes(selectedSkill.toLowerCase()) ||
        selectedSkill.toLowerCase().includes(tech.toLowerCase())
      )
    );

    const filteredProjects = projects.filter(project =>
      project.techStack.some(tech =>
        tech.toLowerCase().includes(selectedSkill.toLowerCase()) ||
        selectedSkill.toLowerCase().includes(tech.toLowerCase())
      )
    );

    return {
      hasExperiences: filteredExperiences.length > 0,
      hasProjects: filteredProjects.length > 0
    };
  }, [selectedSkill]);

  const hasAnyResults = hasExperiences || hasProjects;

  // Prevent body scroll when panel is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Close panel on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClearFilter();
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClearFilter]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop overlay */}
          <motion.div
            className={styles.backdrop}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClearFilter}
          />

          {/* Slide-in panel */}
          <motion.div
            className={styles.panel}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{
              type: 'spring',
              stiffness: 300,
              damping: 30
            }}
          >
            {/* Panel Header */}
            <div className={styles.header}>
              <div className={styles.headerContent}>
                <h3 className={styles.title}>
                  Filtered by <span className={styles.skillTag}>{selectedSkill}</span>
                </h3>
                <p className={styles.subtitle}>
                  {hasAnyResults 
                    ? 'Experience and projects using this skill'
                    : 'No matches found'}
                </p>
              </div>
              
              <button
                className={styles.closeButton}
                onClick={onClearFilter}
                aria-label="Close filter panel"
              >
                <span>✕</span>
              </button>
            </div>

            {/* Panel Content */}
            <div className={styles.content}>
              {/* Global "Nothing Found" Message - only when both are empty */}
              {!hasAnyResults && (
                <motion.div
                  className={styles.globalNoResults}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className={styles.noResultsIcon}>🔍</div>
                  <h4 className={styles.noResultsTitle}>Nothing Found</h4>
                  <p className={styles.noResultsText}>
                    No experiences or projects found using <strong>{selectedSkill}</strong>
                  </p>
                  <button onClick={onClearFilter} className={styles.noResultsButton}>
                    View All Work
                  </button>
                </motion.div>
              )}

              {/* Experience section - only render if has results */}
              {hasExperiences && (
                <div className={styles.section}>
                  <Experience
                    selectedSkill={selectedSkill}
                    onClearFilter={onClearFilter}
                    showNoResults={false}
                  />
                </div>
              )}

              {/* Projects section - only render if has results */}
              {hasProjects && (
                <div className={styles.section}>
                  <Projects
                    selectedSkill={selectedSkill}
                    onClearFilter={onClearFilter}
                    showNoResults={false}
                  />
                </div>
              )}
            </div>

            {/* Clear filter button at bottom */}
            <div className={styles.footer}>
              <motion.button
                className={styles.clearAllButton}
                onClick={onClearFilter}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className={styles.clearIcon}>←</span>
                Back to All Skills
              </motion.button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
