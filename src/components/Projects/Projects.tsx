/**
 * Featured Projects Section Component
 * Purpose: Prove competence through real-world application
 * Content from rules.txt Phase 7
 * Enhanced with skill-based filtering
 */

'use client';

import { motion, AnimatePresence } from 'framer-motion';
import styles from './Projects.module.css';

interface ProjectsProps {
  selectedSkill?: string | null;
  onClearFilter?: () => void;
  showNoResults?: boolean; // Whether to show "no results" message
}

export default function Projects({ selectedSkill = null, onClearFilter, showNoResults = true }: ProjectsProps) {
  const projects = [
    {
      name: 'StreamZone — Video Sharing Platform',
      subtitle: 'Full-Stack MERN Application',
      problem: 'Building a video platform requires reliable media handling, authentication, analytics, and scalable backend systems to support real users.',
      solution: 'Designed and developed a full-stack video-sharing platform supporting video uploads, channel management, JWT-based authentication, comments, likes, and basic analytics.',
      highlights: [
        'JWT-based authentication and secure APIs',
        'Cloudinary + Multer for scalable video uploads',
        'MongoDB aggregation pipelines for analytics',
        'Optimized frontend state management for smoother UX'
      ],
      impact: [
        'Improved frontend performance by ~40%',
        'Reliable handling of large media uploads',
        'Clean, modular backend architecture'
      ],
      techStack: ['React', 'Node.js', 'Express', 'MongoDB', 'Cloudinary', 'Multer', 'Firebase', 'JWT', 'REST APIs', 'TypeScript', 'JavaScript', 'HTML5', 'CSS3', 'Git', 'GitHub', 'VS Code', 'Postman'],
      links: [
        { label: 'View Code →', url: 'https://github.com/Chinmay67/streamzone', primary: true }
      ]
    },
    {
      name: 'UniFind — College Predictor Platform',
      subtitle: 'Backend-Focused MERN Application',
      problem: 'Students struggle to predict college admissions due to scattered cutoff data and complex admission criteria.',
      solution: 'Built backend APIs to analyze historical cutoff data and predict college allocation based on rank, quota, and domicile.',
      highlights: [
        'Data-driven prediction logic',
        'Clean REST API design',
        'Backend ownership in a team of three developers'
      ],
      impact: [
        'Simplified admission decision-making',
        'Backend designed for future dataset expansion'
      ],
      techStack: ['React', 'Node.js', 'Express', 'MongoDB', 'JWT', 'REST APIs', 'TypeScript', 'JavaScript', 'HTML5', 'CSS3', 'Git', 'GitHub', 'VS Code', 'Postman'],
      links: [
        { label: 'View Code →', url: 'https://github.com/Chinmay67/unifind', primary: true },
        { label: 'Live Demo →', url: 'https://unifind.vercel.app', primary: false }
      ]
    }
  ];

  // Filter projects based on selected skill
  const filteredProjects = selectedSkill
    ? projects.filter(project => 
        project.techStack.some(tech => 
          tech.toLowerCase().includes(selectedSkill.toLowerCase()) ||
          selectedSkill.toLowerCase().includes(tech.toLowerCase())
        )
      )
    : projects;



  return (
    <div className={styles.projects}>
      {/* Section Heading */}
      <motion.div className={styles.headerWrapper}>
        <motion.h2 
          id="projects-heading" 
          className={styles.heading}
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        >
          Featured Projects
          {selectedSkill && (
            <span className={styles.filterBadge}>
              Filtered by {selectedSkill}
            </span>
          )}
        </motion.h2>

        {/* Clear Filter Button */}
        {selectedSkill && onClearFilter && (
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
      {selectedSkill && filteredProjects.length === 0 && showNoResults && (
        <motion.div
          className={styles.noResults}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
        >
          <p>No projects found using <strong>{selectedSkill}</strong></p>
          <button onClick={onClearFilter} className={styles.clearLink}>
            View all projects
          </button>
        </motion.div>
      )}

      {/* Project Cards Container */}
      <AnimatePresence mode="wait">
        <motion.div 
          key={selectedSkill || 'all'}
          className={styles.projectGrid}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {filteredProjects.map((project, index) => (
          <motion.article 
            key={project.name} 
            className={styles.projectCard}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ 
              duration: 0.4, 
              ease: 'easeOut',
              delay: index * 0.15
            }}
          >
            <header className={styles.cardHeader}>
              <h3 className={styles.projectName}>{project.name}</h3>
              <p className={styles.projectSubtitle}>{project.subtitle}</p>
            </header>

            <section className={styles.cardSection}>
              <h4 className={styles.sectionLabel}>Problem</h4>
              <p className={styles.sectionText}>{project.problem}</p>
            </section>

            <section className={styles.cardSection}>
              <h4 className={styles.sectionLabel}>Solution</h4>
              <p className={styles.sectionText}>{project.solution}</p>
            </section>

            <section className={styles.cardSection}>
              <h4 className={styles.sectionLabel}>Technical Highlights</h4>
              <ul className={styles.highlightsList}>
                {project.highlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
            </section>

            <section className={styles.cardSection}>
              <h4 className={styles.sectionLabel}>Impact</h4>
              <ul className={styles.impactList}>
                {project.impact.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>

            <div className={styles.techStack}>
              {project.techStack.map((tech) => (
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

            <footer className={styles.cardFooter}>
              {project.links.map((link) => (
                <a
                  key={link.label}
                  href={link.url}
                  className={link.primary ? styles.linkPrimary : styles.linkSecondary}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${link.label.replace(' →', '')} for ${project.name.split(' —')[0]}`}
                >
                  {link.label}
                </a>
              ))}
            </footer>
          </motion.article>
        ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
