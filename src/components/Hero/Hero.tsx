/**
 * Hero Section Component
 * Purpose: Establish identity and credibility within 3 seconds
 * Content from rules.txt Phase 7
 */

'use client';

import { motion } from 'framer-motion';
import styles from './Hero.module.css';

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function Hero() {
  return (
    <motion.div 
      className={styles.hero}
      initial="initial"
      animate="animate"
      variants={staggerContainer}
    >
      {/* Availability Badge */}
      <motion.div 
        className={styles.badge}
        variants={{
          initial: { opacity: 0, scale: 0.95 },
          animate: { 
            opacity: 1, 
            scale: 1,
            transition: { duration: 0.4, ease: 'easeOut', delay: 0.4 }
          }
        }}
      >
        <span className={styles.badgeDot}></span>
        <span className={styles.badgeText}>Available for New Opportunities</span>
      </motion.div>

      {/* Name (H1 - Primary heading for SEO) */}
      <motion.h1 
        className={styles.name}
        variants={{
          initial: { opacity: 0, y: 20 },
          animate: { 
            opacity: 1, 
            y: 0,
            transition: { duration: 0.4, ease: 'easeOut', delay: 0.2 }
          }
        }}
      >
        Chinmay Singh
      </motion.h1>

      {/* Title */}
      <motion.p 
        className={styles.title}
        variants={{
          initial: { opacity: 0, y: 15 },
          animate: { 
            opacity: 1, 
            y: 0,
            transition: { duration: 0.4, ease: 'easeOut', delay: 0.3 }
          }
        }}
      >
        Software Developer
      </motion.p>

      {/* Headline (H2 - Semantic importance) */}
      <motion.h2 
        className={styles.headline}
        variants={{
          initial: { opacity: 0, y: 15 },
          animate: { 
            opacity: 1, 
            y: 0,
            transition: { duration: 0.4, ease: 'easeOut', delay: 0.3 }
          }
        }}
      >
        Building scalable backend systems and full-stack applications
      </motion.h2>

      {/* Value Proposition */}
      <motion.p 
        className={styles.description}
        variants={{
          initial: { opacity: 0, y: 15 },
          animate: { 
            opacity: 1, 
            y: 0,
            transition: { duration: 0.4, ease: 'easeOut', delay: 0.3 }
          }
        }}
      >
        Backend-heavy full-stack developer with experience in Node.js, PostgreSQL, AWS, and Redis. Currently working on low-latency search systems and RAG pipelines at Juspay.
      </motion.p>

      {/* Call-to-Action Buttons */}
      <motion.div 
        className={styles.ctas}
        variants={{
          initial: { opacity: 0, y: 10 },
          animate: { 
            opacity: 1, 
            y: 0,
            transition: { duration: 0.4, ease: 'easeOut', delay: 0.5 }
          }
        }}
      >
        <a
          href="#contact"
          className={styles.ctaPrimary}
          aria-label="Navigate to contact section"
        >
          Get In Touch
        </a>
        <a
          href="#projects"
          className={styles.ctaSecondary}
          aria-label="Navigate to featured projects"
          onMouseEnter={() => {
            // Prefetch projects section content on hover
            const projectsSection = document.getElementById('projects');
            if (projectsSection) {
              projectsSection.scrollIntoView({ behavior: 'auto', block: 'nearest' });
              window.scrollTo({ top: 0 }); // Reset scroll
            }
          }}
        >
          View Projects →
        </a>
      </motion.div>
    </motion.div>
  );
}
