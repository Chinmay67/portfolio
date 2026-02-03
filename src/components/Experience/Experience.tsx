/**
 * Professional Experience Section Component
 * Purpose: Establish credibility through work history
 * Content from rules.txt Phase 7 (CORRECTED)
 */

'use client';

import { motion } from 'framer-motion';
import styles from './Experience.module.css';

export default function Experience() {
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
      technologies: ['React', 'TypeScript', 'PostgreSQL', 'AWS', 'LLMs', 'RAG']
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
      technologies: ['PHP', 'MySQL', 'AWS', 'Redis']
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
      technologies: ['Node.js', 'Express', 'Firebase']
    }
  ];

  return (
    <div className={styles.experience}>
      {/* Section Heading */}
      <motion.h2 
        id="experience-heading" 
        className={styles.heading}
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      >
        Professional Experience
      </motion.h2>

      {/* Experience Cards Container */}
      <div className={styles.experienceList}>
        {experiences.map((exp, index) => (
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
                <span key={tech} className={styles.techTag}>{tech}</span>
              ))}
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  );
}
