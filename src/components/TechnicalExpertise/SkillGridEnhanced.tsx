/**
 * Premium Enhanced Grid Component
 * Eye-catching skill visualization with 3D effects and animations
 */

'use client';

import { motion, useMotionValue, useTransform } from 'framer-motion';
import { useState, useRef, MouseEvent } from 'react';
import styles from './SkillGridEnhanced.module.css';

interface Technology {
  name: string;
  proficiency: number; // 1-5 scale
  yearsOfExperience?: number;
  projectCount?: number;
}

interface SkillCategory {
  label: string;
  icon: string;
  color: string;
  technologies: Technology[];
  particleEffect: 'electric' | 'float' | 'shimmer' | 'pulse' | 'matrix';
}

interface SkillGridEnhancedProps {
  onSkillClick?: (skill: string) => void;
  selectedSkill?: string | null;
}

export default function SkillGridEnhanced({ onSkillClick, selectedSkill }: SkillGridEnhancedProps) {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const categories: SkillCategory[] = [
    {
      label: 'Backend',
      icon: '⚡',
      color: '#3b82f6',
      particleEffect: 'electric',
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
      label: 'Frontend',
      icon: '🎨',
      color: '#8b5cf6',
      particleEffect: 'shimmer',
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
      particleEffect: 'pulse',
      technologies: [
        { name: 'Git', proficiency: 5, yearsOfExperience: 4 },
        { name: 'GitHub', proficiency: 5, yearsOfExperience: 4 },
        { name: 'Docker', proficiency: 4, yearsOfExperience: 2 },
        { name: 'AWS', proficiency: 4, yearsOfExperience: 2 },
        { name: 'Postman', proficiency: 5, yearsOfExperience: 3 },
        { name: 'VS Code', proficiency: 5, yearsOfExperience: 4 },
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
      particleEffect: 'matrix',
      technologies: [
        { name: 'LLMs', proficiency: 4, yearsOfExperience: 1 },
        { name: 'RAG', proficiency: 4, yearsOfExperience: 1 },
        { name: 'pg_trgm', proficiency: 3, projectCount: 3 },
        { name: 'Full-Text Search', proficiency: 4, yearsOfExperience: 2 }
      ]
    }
  ];

  return (
    <div className={styles.gridContainer}>
      {categories.map((category, index) => (
        <EnhancedCategoryCard
          key={category.label}
          category={category}
          index={index}
          isHovered={hoveredCard === category.label}
          onHover={(hovered) => setHoveredCard(hovered ? category.label : null)}
          onSkillClick={onSkillClick}
          selectedSkill={selectedSkill}
        />
      ))}
    </div>
  );
}

interface EnhancedCategoryCardProps {
  category: SkillCategory;
  index: number;
  isHovered: boolean;
  onHover: (hovered: boolean) => void;
  onSkillClick?: (skill: string) => void;
  selectedSkill?: string | null;
}

function EnhancedCategoryCard({
  category,
  index,
  isHovered,
  onHover,
  onSkillClick,
  selectedSkill
}: EnhancedCategoryCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  // 3D Tilt Effect
  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateXValue = ((y - centerY) / centerY) * -10; // Max 10 degrees
    const rotateYValue = ((x - centerX) / centerX) * 10;
    
    setRotateX(rotateXValue);
    setRotateY(rotateYValue);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    onHover(false);
  };

  return (
    <motion.div
      ref={cardRef}
      className={styles.categoryCard}
      style={{
        '--accent-color': category.color,
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
      } as React.CSSProperties}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => onHover(true)}
      onMouseLeave={handleMouseLeave}
    >
      {/* Animated gradient border */}
      <div className={styles.gradientBorder} />
      
      {/* Particles effect */}
      <div className={`${styles.particles} ${styles[category.particleEffect]}`}>
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className={styles.particle}
            initial={{
              x: `${Math.random() * 100}%`,
              y: `${Math.random() * 100}%`,
              scale: Math.random() * 0.5 + 0.5,
              opacity: 0
            }}
            animate={{
              opacity: isHovered ? [0, 0.8, 0] : [0, 0.3, 0],
              scale: isHovered ? [0.5, 1.2, 0.5] : [0.5, 1, 0.5],
              x: `${Math.random() * 100}%`,
              y: `${Math.random() * 100}%`,
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: i * 0.2,
              ease: 'easeInOut'
            }}
          />
        ))}
      </div>

      {/* Card content */}
      <div className={styles.cardContent}>
        {/* Header */}
        <div className={styles.cardHeader}>
          <motion.span
            className={styles.categoryIcon}
            animate={{
              scale: isHovered ? [1, 1.2, 1] : 1,
              rotate: isHovered ? [0, 10, -10, 0] : 0
            }}
            transition={{ duration: 0.8 }}
          >
            {category.icon}
          </motion.span>
          <h3 className={styles.categoryLabel}>{category.label}</h3>
        </div>

        {/* Tech tags with proficiency */}
        <div className={styles.techList}>
          {category.technologies.map((tech, techIndex) => {
            const isSelected = selectedSkill === tech.name;
            const normalizedSkill = selectedSkill?.toLowerCase();
            const normalizedTech = tech.name.toLowerCase();
            const isRelated = normalizedSkill && (
              normalizedTech.includes(normalizedSkill) ||
              normalizedSkill.includes(normalizedTech)
            );

            return (
              <motion.div
                key={tech.name}
                className={styles.techTagWrapper}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.3,
                  delay: (index * 0.1) + (techIndex * 0.05)
                }}
              >
                <motion.button
                  className={`${styles.techTag} ${isSelected || isRelated ? styles.selected : ''}`}
                  onClick={() => onSkillClick?.(tech.name)}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className={styles.techName}>{tech.name}</span>
                  
                  {/* Proficiency indicator */}
                  <div className={styles.proficiency}>
                    {[...Array(5)].map((_, i) => (
                      <motion.div
                        key={i}
                        className={`${styles.proficiencyDot} ${i < tech.proficiency ? styles.active : ''}`}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{
                          delay: (index * 0.1) + (techIndex * 0.05) + (i * 0.03),
                          duration: 0.2
                        }}
                      />
                    ))}
                  </div>

                  {/* Additional info tooltip */}
                  {(tech.yearsOfExperience || tech.projectCount) && (
                    <span className={styles.techInfo}>
                      {tech.yearsOfExperience ? `${tech.yearsOfExperience}y exp` : `${tech.projectCount} projects`}
                    </span>
                  )}
                </motion.button>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Corner accent */}
      <motion.div
        className={styles.cornerAccent}
        animate={{
          opacity: isHovered ? 0.8 : 0.3,
          scale: isHovered ? 1.1 : 1
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Shine effect */}
      <motion.div
        className={styles.shine}
        animate={{
          x: isHovered ? ['0%', '200%'] : '0%'
        }}
        transition={{
          duration: 0.8,
          ease: 'easeInOut'
        }}
      />
    </motion.div>
  );
}
