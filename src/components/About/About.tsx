/**
 * About Section Component
 * Purpose: Humanize and provide context
 * Premium bento-style card layout
 */

'use client';

import { motion } from 'framer-motion';
import styles from './About.module.css';

export default function About() {
  const highlights = [
    {
      icon: '🚀',
      title: 'What I Do',
      content: "I'm a full-stack developer who loves building things that work reliably at scale. My focus is on backend systems—REST APIs, databases, cloud infrastructure—but I also enjoy frontend work when it means creating better user experiences."
    },
    {
      icon: '💡',
      title: 'My Journey',
      content: "I got into programming because I wanted to understand how things work under the hood. That curiosity led me to internships at Juspay (working on ONDC infrastructure), freelance projects, and personal side projects like StreamZone and UniFind."
    },
    {
      icon: '📚',
      title: 'Always Learning',
      content: "When I'm not coding, I'm usually learning something new—whether it's a different technology, system design patterns, or exploring open-source projects. I believe the best way to grow is to build real things, break them, and learn from the process."
    },
    {
      icon: '🎯',
      title: 'What I\'m Looking For',
      content: "I'm currently looking for backend or full-stack roles where I can work on challenging problems, contribute to production systems, and continue growing as an engineer."
    }
  ];

  return (
    <section className={styles.about}>
      {/* Section Header */}
      <motion.div 
        className={styles.header}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <h2 id="about-heading" className={styles.heading}>About Me</h2>
        <p className={styles.subheading}>The person behind the code</p>
      </motion.div>

      {/* Bento Grid */}
      <div className={styles.bentoGrid}>
        {highlights.map((item, index) => (
          <motion.div
            key={item.title}
            className={styles.bentoCard}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: 0.4,
              ease: 'easeOut',
              delay: index * 0.1
            }}
          >
            <span className={styles.cardIcon}>{item.icon}</span>
            <h3 className={styles.cardTitle}>{item.title}</h3>
            <p className={styles.cardContent}>{item.content}</p>
            <div className={styles.cardAccent} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
