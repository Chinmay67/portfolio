/**
 * 3D Skill Carousel Component
 * Rotating carousel with perspective and card flip interactions
 */

'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import styles from './SkillCarousel3D.module.css';

interface Technology {
  name: string;
  proficiency: number;
  yearsOfExperience?: number;
  projectCount?: number;
}

interface SkillCategory {
  label: string;
  icon: string;
  color: string;
  technologies: Technology[];
  description: string;
}

interface SkillCarousel3DProps {
  onSkillClick?: (skill: string) => void;
  selectedSkill?: string | null;
}

export default function SkillCarousel3D({ onSkillClick, selectedSkill }: SkillCarousel3DProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoRotating, setIsAutoRotating] = useState(true);
  const [flippedCard, setFlippedCard] = useState<number | null>(null);


  const categories: SkillCategory[] = [
    {
      label: 'Backend',
      icon: '⚡',
      color: '#3b82f6',
      description: 'Server-side development & databases',
      technologies: [
        { name: 'Node.js', proficiency: 5, yearsOfExperience: 3 },
        { name: 'Express', proficiency: 5, yearsOfExperience: 3 },
        { name: 'PostgreSQL', proficiency: 4, yearsOfExperience: 2 },
        { name: 'MongoDB', proficiency: 4, yearsOfExperience: 2 },
        { name: 'Redis', proficiency: 3, yearsOfExperience: 1 },
        { name: 'PHP', proficiency: 3, projectCount: 5 },
        { name: 'MySQL', proficiency: 4, yearsOfExperience: 2 },
        { name: 'JWT', proficiency: 5, yearsOfExperience: 3 },
        { name: 'REST APIs', proficiency: 5, yearsOfExperience: 3 }
      ]
    },
    {
      label: 'Cloud & DevOps',
      icon: '☁️',
      color: '#10b981',
      description: 'Infrastructure & deployment',
      technologies: [
        { name: 'AWS', proficiency: 4, yearsOfExperience: 2 },
        { name: 'Docker', proficiency: 4, yearsOfExperience: 2 },
        { name: 'Git', proficiency: 5, yearsOfExperience: 4 },
        { name: 'Linux', proficiency: 4, yearsOfExperience: 3 },
        { name: 'GitHub', proficiency: 5, yearsOfExperience: 4 }
      ]
    },
    {
      label: 'Frontend',
      icon: '🎨',
      color: '#8b5cf6',
      description: 'User interfaces & experiences',
      technologies: [
        { name: 'React', proficiency: 5, yearsOfExperience: 3 },
        { name: 'TypeScript', proficiency: 5, yearsOfExperience: 2 },
        { name: 'JavaScript', proficiency: 5, yearsOfExperience: 4 },
        { name: 'HTML5', proficiency: 5, yearsOfExperience: 4 },
        { name: 'CSS3', proficiency: 5, yearsOfExperience: 4 }
      ]
    },
    {
      label: 'Tools & Platforms',
      icon: '🛠️',
      color: '#f59e0b',
      description: 'Development tools & services',
      technologies: [
        { name: 'Postman', proficiency: 5, yearsOfExperience: 3 },
        { name: 'VS Code', proficiency: 5, yearsOfExperience: 4 },
        { name: 'Figma', proficiency: 4, yearsOfExperience: 2 },
        { name: 'Firebase', proficiency: 4, yearsOfExperience: 2 },
        { name: 'Cloudinary', proficiency: 4, projectCount: 8 },
        { name: 'Multer', proficiency: 5, projectCount: 10 },
        { name: 'CAPTCHA', proficiency: 3, projectCount: 5 }
      ]
    },
    {
      label: 'AI & Data',
      icon: '🤖',
      color: '#ec4899',
      description: 'Machine learning & data processing',
      technologies: [
        { name: 'LLMs', proficiency: 4, yearsOfExperience: 1 },
        { name: 'RAG', proficiency: 4, yearsOfExperience: 1 },
        { name: 'pg_trgm', proficiency: 3, projectCount: 3 },
        { name: 'Full-Text Search', proficiency: 4, yearsOfExperience: 2 }
      ]
    }
  ];

  // Auto-rotation effect
  useEffect(() => {
    if (!isAutoRotating) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % categories.length);
      setFlippedCard(null);
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoRotating, categories.length]);

  // Arrow key navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % categories.length);
    setFlippedCard(null);
    setIsAutoRotating(false);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + categories.length) % categories.length);
    setFlippedCard(null);
    setIsAutoRotating(false);
  };

  const handleDotClick = (index: number) => {
    setCurrentIndex(index);
    setFlippedCard(null);
    setIsAutoRotating(false);
  };

  const toggleCardFlip = (index: number) => {
    setFlippedCard(flippedCard === index ? null : index);
    setIsAutoRotating(false);
  };

  return (
    <div className={styles.carouselContainer}>
      {/* Auto-rotate indicator */}
      <div className={styles.autoRotateIndicator}>
        <motion.button
          className={`${styles.autoRotateBtn} ${isAutoRotating ? styles.active : ''}`}
          onClick={() => setIsAutoRotating(!isAutoRotating)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className={styles.autoRotateIcon}>
            {isAutoRotating ? '⏸' : '▶'}
          </span>
          <span className={styles.autoRotateLabel}>
            {isAutoRotating ? 'Pause' : 'Auto'}
          </span>
        </motion.button>
      </div>

      {/* 3D Carousel Stage */}
      <div className={styles.stage}>
        <div className={styles.carousel}>
          {categories.map((category, index) => {
            const offset = (index - currentIndex + categories.length) % categories.length;
            const isCenter = offset === 0;
            const isLeft = offset === categories.length - 1;
            const isRight = offset === 1;
            const isVisible = isCenter || isLeft || isRight;

            let position: 'center' | 'left' | 'right' | 'hidden' = 'hidden';
            if (isCenter) position = 'center';
            else if (isLeft) position = 'left';
            else if (isRight) position = 'right';

            return (
              <CarouselCard
                key={category.label}
                category={category}
                index={index}
                position={position}
                isFlipped={flippedCard === index}
                onFlip={() => toggleCardFlip(index)}
                onSkillClick={onSkillClick}
                selectedSkill={selectedSkill}
                isVisible={isVisible}
              />
            );
          })}
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        className={`${styles.navButton} ${styles.navPrev}`}
        onClick={handlePrev}
        aria-label="Previous category"
      >
        <span>‹</span>
      </button>
      <button
        className={`${styles.navButton} ${styles.navNext}`}
        onClick={handleNext}
        aria-label="Next category"
      >
        <span>›</span>
      </button>

      {/* Dot Navigation */}
      <div className={styles.dotNavigation}>
        {categories.map((category, index) => (
          <button
            key={category.label}
            className={`${styles.dot} ${currentIndex === index ? styles.activeDot : ''}`}
            onClick={() => handleDotClick(index)}
            aria-label={`Go to ${category.label}`}
            style={{ '--dot-color': category.color } as React.CSSProperties}
          />
        ))}
      </div>

      {/* Instruction */}
      <motion.p
        className={styles.instruction}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        Click card to flip • Arrow keys to navigate • Click skills to filter
      </motion.p>
    </div>
  );
}

interface CarouselCardProps {
  category: SkillCategory;
  index: number;
  position: 'center' | 'left' | 'right' | 'hidden';
  isFlipped: boolean;
  onFlip: () => void;
  onSkillClick?: (skill: string) => void;
  selectedSkill?: string | null;
  isVisible: boolean;
}

function CarouselCard({
  category,
  position,
  isFlipped,
  onFlip,
  onSkillClick,
  selectedSkill,
  isVisible
}: CarouselCardProps) {
  
  // Keyboard navigation
  useEffect(() => {
    if (position !== 'center') return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onFlip();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [position, onFlip]);

  if (!isVisible) return null;

  return (
    <motion.div
      className={`${styles.cardWrapper} ${styles[position]}`}
      initial={false}
      animate={{
        scale: position === 'center' ? 1 : 0.75,
        opacity: position === 'center' ? 1 : 0.4,
        z: position === 'center' ? 0 : position === 'left' ? -200 : -200,
        x: position === 'center' ? 0 : position === 'left' ? '-120%' : '120%',
      }}
      transition={{
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
    >
      <motion.div
        className={styles.card}
        style={{ '--card-color': category.color } as React.CSSProperties}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: 'easeInOut' }}
        onClick={position === 'center' ? onFlip : undefined}
      >
        {/* Card Front */}
        <div className={`${styles.cardFace} ${styles.cardFront}`}>
          <div className={styles.cardGlow} />
          
          <div className={styles.cardHeader}>
            <motion.span
              className={styles.cardIcon}
              animate={{
                scale: position === 'center' ? [1, 1.1, 1] : 1,
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
            >
              {category.icon}
            </motion.span>
            <h3 className={styles.cardTitle}>{category.label}</h3>
          </div>

          <p className={styles.cardDescription}>{category.description}</p>

          <div className={styles.techCount}>
            <span className={styles.techCountNumber}>{category.technologies.length}</span>
            <span className={styles.techCountLabel}>Technologies</span>
          </div>

          {position === 'center' && (
            <motion.div
              className={styles.flipHint}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Click to view details →
            </motion.div>
          )}
        </div>

        {/* Card Back */}
        <div className={`${styles.cardFace} ${styles.cardBack}`}>
          <div className={styles.cardGlow} />
          
          <div className={styles.backHeader}>
            <span className={styles.backIcon}>{category.icon}</span>
            <h4 className={styles.backTitle}>{category.label}</h4>
          </div>

          <div className={styles.techGrid}>
            {category.technologies.map((tech) => {
              const isSelected = selectedSkill === tech.name;
              const normalizedSkill = selectedSkill?.toLowerCase();
              const normalizedTech = tech.name.toLowerCase();
              const isRelated = normalizedSkill && (
                normalizedTech.includes(normalizedSkill) ||
                normalizedSkill.includes(normalizedTech)
              );

              return (
                <motion.button
                  key={tech.name}
                  className={`${styles.techChip} ${isSelected || isRelated ? styles.selectedChip : ''}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    onSkillClick?.(tech.name);
                  }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className={styles.techChipName}>{tech.name}</span>
                  <div className={styles.techChipProficiency}>
                    {[...Array(tech.proficiency)].map((_, i) => (
                      <span key={i} className={styles.proficiencyStar}>★</span>
                    ))}
                  </div>
                </motion.button>
              );
            })}
          </div>

          {position === 'center' && (
            <motion.div
              className={styles.backHint}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              ← Click to flip back
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* Spotlight effect for center card */}
      {position === 'center' && (
        <motion.div
          className={styles.spotlight}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ duration: 0.5 }}
        />
      )}
    </motion.div>
  );
}
