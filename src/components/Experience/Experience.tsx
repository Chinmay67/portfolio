/**
 * Professional Experience Section Component
 * Purpose: Establish credibility through work history
 * Content from rules.txt Phase 7 (CORRECTED)
 * Enhanced with skill-based filtering (experiences take priority over projects)
 */

'use client';

import { motion, AnimatePresence } from 'framer-motion';
import styles from './Experience.module.css';

interface ExperienceProps {
  selectedSkill?: string | null;
  onClearFilter?: () => void;
  showNoResults?: boolean; // Whether to show "no results" message
}

export default function Experience({ selectedSkill = null, onClearFilter, showNoResults = true }: ExperienceProps) {
  const experiences = [
    {
      company: 'Juspay',
      role: 'Software Developer Intern',
      duration: 'Jul 2025 – Present',
      location: 'Bengaluru, India',
      achievements: [
        'Built a low-latency search system using PostgreSQL Full-Text Search and pg_trgm with GIN indexes (sub-100ms on 50k+ records)',
        'Implemented a Retrieval-Augmented Generation (RAG) pipeline over structured knowledge bases',
        'Designed flexible training module architecture with dynamic phases and dependencies',
        'Built real-time streaming text rendering using queue-based buffering'
      ],
      technologies: ['React', 'Node.js', 'Express', 'TypeScript', 'JavaScript', 'HTML5', 'CSS3', 'PostgreSQL', 'Docker', 'Redis', 'LLMs', 'RAG', 'pg_trgm', 'Full-Text Search', 'JWT', 'REST APIs', 'Git', 'GitHub', 'VS Code', 'Postman']
    },
    {
      company: 'Inditech Health Solution',
      role: 'Software Developer Intern',
      duration: 'Oct 2024 – Jul 2025',
      location: 'Remote',
      achievements: [
        'Resolved production issues in live healthcare systems',
        'Built doctor-patient digital workflows',
        'Integrated Redis caching to reduce API response times by ~60%',
        'Managed deployments with minimal downtime'
      ],
      technologies: ['PHP', 'MySQL', 'AWS', 'Redis', 'HTML5', 'CSS3', 'Git', 'GitHub', 'VS Code', 'Postman']
    },
    {
      company: 'GrowthSay',
      role: 'Backend Developer Intern',
      duration: 'Sep 2024 – Oct 2024',
      location: 'Remote',
      achievements: [
        'Implemented secure authentication using Node.js, Express, and Firebase',
        'Integrated CAPTCHA v3 to reduce bot activity by ~25%',
        'Built backend controllers for efficient user data management'
      ],
      technologies: ['Node.js', 'Express', 'React', 'TypeScript', 'JavaScript', 'HTML5', 'CSS3', 'Firebase', 'CAPTCHA', 'JWT', 'REST APIs', 'Git', 'GitHub', 'VS Code', 'Postman']
    }
  ];

  // Filter experiences based on selected skill
  const filteredExperiences = selectedSkill
    ? experiences.filter(exp => 
        exp.technologies.some(tech => 
          tech.toLowerCase().includes(selectedSkill.toLowerCase()) ||
          selectedSkill.toLowerCase().includes(tech.toLowerCase())
        )
      )
    : experiences;

  const hasMatches = filteredExperiences.length > 0;

  return (
    <div className={styles.experience}>
      {/* Section Heading */}
      <motion.div className={styles.headerWrapper}>
        <motion.h2 
          id="experience-heading" 
          className={styles.heading}
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        >
          Professional Experience
          {selectedSkill && hasMatches && (
            <span className={styles.filterBadge}>
              <span className={styles.priorityIndicator}>⚡</span>
              Filtered by {selectedSkill}
            </span>
          )}
        </motion.h2>

        {/* Clear Filter Button */}
        {selectedSkill && onClearFilter && hasMatches && (
          <motion.button
            className={styles.clearFilter}
            onClick={onClearFilter}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className={styles.clearIcon}>✕</span>
            Clear Filter
          </motion.button>
        )}
      </motion.div>

      {/* No results message - only show if showNoResults is true */}
      {selectedSkill && !hasMatches && showNoResults && (
        <motion.div
          className={styles.noResults}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
        >
          <p>No experiences found using <strong>{selectedSkill}</strong></p>
          <p className={styles.noResultsHint}>Check the Projects section below for related work</p>
          <button onClick={onClearFilter} className={styles.clearLink}>
            View all experiences
          </button>
        </motion.div>
      )}

      {/* Experience Cards Container */}
      <AnimatePresence mode="wait">
        <motion.div 
          key={selectedSkill || 'all'}
          className={styles.experienceList}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {filteredExperiences.map((exp, index) => (
          <motion.article 
            key={exp.company} 
            className={styles.experienceCard}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ 
              duration: 0.4, 
              ease: 'easeOut',
              delay: index * 0.12
            }}
          >
            <div className={styles.cardHeader}>
              <div className={styles.headerLeft}>
                <h3 className={styles.companyName}>{exp.company}</h3>
                <p className={styles.role}>{exp.role}</p>
              </div>
              <div className={styles.headerRight}>
                <span className={styles.duration}>{exp.duration}</span>
                <span className={styles.location}>{exp.location}</span>
              </div>
            </div>

            <section className={styles.cardContent}>
              <h4 className={styles.sectionLabel}>Key Contributions</h4>
              <ul className={styles.achievementsList}>
                {exp.achievements.map((achievement) => (
                  <li key={achievement}>{achievement}</li>
                ))}
              </ul>
            </section>

            <div className={styles.techStack}>
              {exp.technologies.map((tech) => (
                <span 
                  key={tech} 
                  className={`${styles.techTag} ${
                    selectedSkill && (
                      tech.toLowerCase().includes(selectedSkill.toLowerCase()) ||
                      selectedSkill.toLowerCase().includes(tech.toLowerCase())
                    ) ? styles.techTagHighlighted : ''
                  }`}
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.article>
        ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
