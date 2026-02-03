/**
 * Contact Section Component
 * Purpose: Make next steps frictionless
 * Content from rules.txt Phase 7
 */

'use client';

import { motion } from 'framer-motion';
import styles from './Contact.module.css';

export default function Contact() {
  const contactMethods = [
    {
      icon: '📧',
      label: 'Email',
      value: 'singhchinmay207@gmail.com',
      href: 'mailto:singhchinmay207@gmail.com',
      ariaLabel: 'Send email to singhchinmay207@gmail.com'
    },
    {
      icon: '💼',
      label: 'LinkedIn',
      value: 'linkedin.com/in/chinmay-singh-4092b0253',
      href: 'https://www.linkedin.com/in/chinmay-singh-4092b0253',
      ariaLabel: "Visit Chinmay Singh's LinkedIn profile"
    },
    {
      icon: '💻',
      label: 'GitHub',
      value: 'github.com/Chinmay67',
      href: 'https://github.com/Chinmay67',
      ariaLabel: "Visit Chinmay Singh's GitHub profile"
    }
  ];

  return (
    <div className={styles.contact}>
      {/* Section Heading */}
      <motion.h2 
        id="contact-heading" 
        className={styles.heading}
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      >
        Get In Touch
      </motion.h2>

      {/* Contact Content */}
      <div className={styles.content}>
        <motion.p 
          className={styles.intro}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.3, ease: 'easeOut', delay: 0.1 }}
        >
          I'm currently open to new opportunities—whether it's a full-time role, internship, or freelance project. Let's connect!
        </motion.p>

        {/* Contact Methods */}
        <div className={styles.contactMethods}>
          {contactMethods.map((method, index) => (
            <motion.a
              key={method.label}
              href={method.href}
              className={styles.contactLink}
              target={method.href.startsWith('http') ? '_blank' : undefined}
              rel={method.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              aria-label={method.ariaLabel}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ 
                duration: 0.3, 
                ease: 'easeOut',
                delay: 0.1 + (index * 0.1)
              }}
            >
              <span className={styles.linkIcon}>{method.icon}</span>
              <div className={styles.linkContent}>
                <span className={styles.linkLabel}>{method.label}</span>
                <span className={styles.linkValue}>{method.value}</span>
              </div>
            </motion.a>
          ))}
        </div>

        {/* CTA */}
        <motion.div 
          className={styles.cta}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.3, ease: 'easeOut', delay: 0.4 }}
        >
          <a
            href="/resume.pdf"
            className={styles.resumeButton}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Download resume as PDF"
            onMouseEnter={() => {
              // Prefetch resume on hover
              const link = document.createElement('link');
              link.rel = 'prefetch';
              link.href = '/resume.pdf';
              link.as = 'document';
              if (!document.querySelector(`link[href="/resume.pdf"]`)) {
                document.head.appendChild(link);
              }
            }}
          >
            Download Resume (PDF)
          </a>
        </motion.div>
      </div>
    </div>
  );
}
