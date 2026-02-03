/**
 * Featured Projects Section Component
 * Purpose: Prove competence through real-world application
 * Content from rules.txt Phase 7
 */

'use client';

import { motion } from 'framer-motion';
import styles from './Projects.module.css';

export default function Projects() {
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
      techStack: ['React', 'Node.js', 'Express', 'MongoDB', 'Cloudinary', 'JWT'],
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
      techStack: ['Node.js', 'Express', 'MongoDB', 'React'],
      links: [
        { label: 'View Code →', url: 'https://github.com/Chinmay67/unifind', primary: true },
        { label: 'Live Demo →', url: 'https://unifind.vercel.app', primary: false }
      ]
    }
  ];

  return (
    <div className={styles.projects}>
      {/* Section Heading */}
      <motion.h2 
        id="projects-heading" 
        className={styles.heading}
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      >
        Featured Projects
      </motion.h2>

      {/* Project Cards Container */}
      <div className={styles.projectGrid}>
        {projects.map((project, index) => (
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
                <span key={tech} className={styles.techTag}>{tech}</span>
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
      </div>
    </div>
  );
}
