/**
 * About Section Component
 * Purpose: Humanize and provide context
 * Content from rules.txt Phase 7
 */

'use client';

import { motion } from 'framer-motion';
import styles from './About.module.css';

export default function About() {
  const paragraphs = [
    "I'm a full-stack developer who loves building things that work reliably at scale. My focus is on backend systems—REST APIs, databases, cloud infrastructure—but I also enjoy frontend work when it means creating better user experiences.",
    "I got into programming because I wanted to understand how things work under the hood. That curiosity led me to internships at Juspay (working on ONDC infrastructure), freelance projects, and personal side projects like StreamZone and UniFind.",
    "When I'm not coding, I'm usually learning something new—whether it's a different technology, system design patterns, or exploring open-source projects. I believe the best way to grow as a developer is to build real things, break them, and learn from the process.",
    "I'm currently looking for backend or full-stack roles where I can work on challenging problems, contribute to production systems, and continue growing as an engineer."
  ];

  return (
    <div className={styles.about}>
      {/* Section Heading */}
      <motion.h2 
        id="about-heading" 
        className={styles.heading}
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      >
        About Me
      </motion.h2>

      {/* About Content */}
      <motion.div 
        className={styles.content}
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.4, ease: 'easeOut', delay: 0.2 }}
      >
        {paragraphs.map((paragraph, index) => (
          <p key={index} className={styles.paragraph}>
            {paragraph}
          </p>
        ))}
      </motion.div>
    </div>
  );
}
