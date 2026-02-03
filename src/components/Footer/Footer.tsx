/**
 * Footer Component
 * Purpose: Branding consistency and quick links
 * Content from rules.txt Phase 7
 */

'use client';

import { motion } from 'framer-motion';
import styles from './Footer.module.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <motion.div 
      className={styles.footer}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      {/* Branding */}
      <div className={styles.branding}>
        <p className={styles.name}>Chinmay Singh</p>
        <p className={styles.title}>Software Developer</p>
      </div>

      {/* Quick Links */}
      <nav className={styles.links} aria-label="Footer navigation">
        <a
          href="mailto:singhchinmay207@gmail.com"
          className={styles.link}
          aria-label="Send email to singhchinmay207@gmail.com"
        >
          Email
        </a>
        <a
          href="https://www.linkedin.com/in/chinmay-singh-4092b0253"
          className={styles.link}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Visit LinkedIn profile"
        >
          LinkedIn
        </a>
        <a
          href="https://github.com/Chinmay67"
          className={styles.link}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Visit GitHub profile"
        >
          GitHub
        </a>
      </nav>

      {/* Copyright */}
      <p className={styles.copyright}>
        © {currentYear} Chinmay Singh • Built with Next.js, TypeScript, and Framer Motion
      </p>
    </motion.div>
  );
}
