/**
 * Skill Graph Component
 * Interactive constellation visualization of technical skills
 * Enhanced with particles, tooltips, and comprehensive skill coverage
 */

'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef } from 'react';
import styles from './SkillGraph.module.css';

interface Skill {
  id: string;
  name: string;
  category: 'backend' | 'cloud' | 'frontend' | 'tools' | 'ai';
  x: number; // Position percentage (0-100)
  y: number; // Position percentage (0-100)
  connections: string[]; // IDs of connected skills
  description?: string; // Tooltip description
}

interface SkillGraphProps {
  onSkillClick?: (skill: string) => void;
  selectedSkill?: string | null;
}

export default function SkillGraph({ onSkillClick, selectedSkill }: SkillGraphProps) {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Comprehensive skill nodes with all resume technologies
  const skills: Skill[] = [
    // Backend cluster (left-center)
    { id: 'nodejs', name: 'Node.js', category: 'backend', x: 20, y: 45, connections: ['express', 'mongodb', 'postgresql', 'redis', 'jwt'], description: 'Runtime environment' },
    { id: 'express', name: 'Express', category: 'backend', x: 28, y: 35, connections: ['nodejs', 'mongodb', 'postgresql', 'jwt', 'multer'], description: 'Web framework' },
    { id: 'postgresql', name: 'PostgreSQL', category: 'backend', x: 25, y: 60, connections: ['nodejs', 'express', 'aws', 'pgtrgm'], description: 'Relational database' },
    { id: 'mongodb', name: 'MongoDB', category: 'backend', x: 35, y: 50, connections: ['nodejs', 'express', 'cloudinary'], description: 'NoSQL database' },
    { id: 'redis', name: 'Redis', category: 'backend', x: 15, y: 30, connections: ['nodejs', 'aws'], description: 'In-memory cache' },
    { id: 'php', name: 'PHP', category: 'backend', x: 18, y: 65, connections: ['mysql', 'aws'], description: 'Server-side language' },
    { id: 'mysql', name: 'MySQL', category: 'backend', x: 25, y: 75, connections: ['php'], description: 'Relational database' },
    { id: 'jwt', name: 'JWT', category: 'backend', x: 33, y: 25, connections: ['nodejs', 'express', 'firebase'], description: 'Authentication tokens' },
    
    // Cloud & DevOps cluster (top-right)
    { id: 'aws', name: 'AWS', category: 'cloud', x: 70, y: 20, connections: ['docker', 'postgresql', 'redis', 'nodejs', 'php'], description: 'Cloud platform' },
    { id: 'docker', name: 'Docker', category: 'cloud', x: 78, y: 30, connections: ['aws', 'git', 'linux'], description: 'Containerization' },
    { id: 'git', name: 'Git', category: 'cloud', x: 82, y: 42, connections: ['docker', 'github'], description: 'Version control' },
    { id: 'linux', name: 'Linux', category: 'cloud', x: 75, y: 45, connections: ['docker', 'aws'], description: 'Operating system' },
    
    // Frontend cluster (bottom-right)
    { id: 'react', name: 'React', category: 'frontend', x: 60, y: 75, connections: ['typescript', 'javascript', 'nodejs', 'html5', 'css3'], description: 'UI library' },
    { id: 'typescript', name: 'TypeScript', category: 'frontend', x: 68, y: 68, connections: ['react', 'javascript', 'nodejs'], description: 'Typed JavaScript' },
    { id: 'javascript', name: 'JavaScript', category: 'frontend', x: 52, y: 70, connections: ['react', 'typescript', 'nodejs'], description: 'Programming language' },
    { id: 'html5', name: 'HTML5', category: 'frontend', x: 55, y: 85, connections: ['react', 'css3'], description: 'Markup language' },
    { id: 'css3', name: 'CSS3', category: 'frontend', x: 65, y: 82, connections: ['html5', 'react'], description: 'Styling language' },
    
    // Tools cluster (scattered)
    { id: 'firebase', name: 'Firebase', category: 'tools', x: 45, y: 15, connections: ['nodejs', 'jwt', 'captcha'], description: 'Backend-as-a-Service' },
    { id: 'cloudinary', name: 'Cloudinary', category: 'tools', x: 42, y: 55, connections: ['nodejs', 'mongodb', 'multer'], description: 'Media management' },
    { id: 'multer', name: 'Multer', category: 'tools', x: 40, y: 40, connections: ['express', 'cloudinary', 'nodejs'], description: 'File upload handler' },
    { id: 'postman', name: 'Postman', category: 'tools', x: 85, y: 60, connections: ['nodejs', 'express'], description: 'API testing' },
    { id: 'vscode', name: 'VS Code', category: 'tools', x: 90, y: 75, connections: ['git'], description: 'Code editor' },
    { id: 'figma', name: 'Figma', category: 'tools', x: 85, y: 85, connections: ['react'], description: 'Design tool' },
    { id: 'captcha', name: 'CAPTCHA', category: 'tools', x: 50, y: 10, connections: ['firebase', 'nodejs'], description: 'Bot protection' },
    
    // AI/ML cluster (middle-top)
    { id: 'llms', name: 'LLMs', category: 'ai', x: 55, y: 25, connections: ['rag', 'postgresql', 'nodejs'], description: 'Language models' },
    { id: 'rag', name: 'RAG', category: 'ai', x: 62, y: 18, connections: ['llms', 'postgresql', 'pgtrgm'], description: 'Retrieval-Augmented Gen' },
    { id: 'pgtrgm', name: 'pg_trgm', category: 'ai', x: 48, y: 32, connections: ['postgresql', 'rag'], description: 'PostgreSQL search' },
    
    // Additional tools
    { id: 'github', name: 'GitHub', category: 'tools', x: 88, y: 52, connections: ['git'], description: 'Code hosting' },
  ];

  // Update tooltip position on hover
  const handleNodeHover = (skillId: string | null, event?: React.MouseEvent<SVGCircleElement>) => {
    setHoveredSkill(skillId);
    if (skillId && event && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 100;
      const y = ((event.clientY - rect.top) / rect.height) * 100;
      setTooltipPosition({ x, y });
    }
  };

  // Get skills that should be highlighted
  const getHighlightedSkills = (): Set<string> => {
    const activeSkill = hoveredSkill || selectedSkill;
    if (!activeSkill) return new Set();

    const skill = skills.find(s => s.id === activeSkill || s.name === activeSkill);
    if (!skill) return new Set();

    return new Set([skill.id, ...skill.connections]);
  };

  const highlightedSkills = getHighlightedSkills();

  // Category color mapping
  const categoryColors: Record<string, string> = {
    backend: '#3b82f6',
    cloud: '#10b981',
    frontend: '#8b5cf6',
    tools: '#f59e0b',
    ai: '#ec4899'
  };

  // Handle skill click
  const handleSkillClick = (skillId: string) => {
    const skill = skills.find(s => s.id === skillId);
    if (skill && onSkillClick) {
      onSkillClick(skill.name);
    }
  };

  // Get hovered or selected skill for tooltip
  const activeSkill = skills.find(s => s.id === hoveredSkill || s.name === selectedSkill);

  return (
    <div ref={containerRef} className={styles.graphContainer}>
      {/* Animated background particles */}
      <div className={styles.particles}>
        {[...Array(20)].map((_, i) => (
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
              opacity: [0, 0.6, 0],
              scale: [0.5, 1, 0.5]
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: 'easeInOut'
            }}
          />
        ))}
      </div>

      <svg className={styles.svg} viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
        {/* Gradient definitions */}
        <defs>
          {Object.entries(categoryColors).map(([category, color]) => (
            <linearGradient key={category} id={`gradient-${category}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={color} stopOpacity="0.8" />
              <stop offset="100%" stopColor={color} stopOpacity="0.2" />
            </linearGradient>
          ))}
        </defs>

        {/* Connection lines with gradients */}
        <g className={styles.connections}>
          {skills.map(skill => 
            skill.connections.map(connId => {
              const connectedSkill = skills.find(s => s.id === connId);
              if (!connectedSkill) return null;

              const isHighlighted = highlightedSkills.has(skill.id) && highlightedSkills.has(connId);
              const isActive = (hoveredSkill === skill.id) || (hoveredSkill === connId);

              return (
                <motion.line
                  key={`${skill.id}-${connId}`}
                  x1={skill.x}
                  y1={skill.y}
                  x2={connectedSkill.x}
                  y2={connectedSkill.y}
                  className={styles.connection}
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{
                    pathLength: 1,
                    opacity: isHighlighted ? 0.7 : 0.1,
                    strokeWidth: isHighlighted ? 0.4 : 0.15
                  }}
                  stroke={isActive ? `url(#gradient-${skill.category})` : categoryColors[skill.category]}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                />
              );
            })
          )}
        </g>

        {/* Skill nodes */}
        <g className={styles.nodes}>
          {skills.map((skill, index) => {
            const isHighlighted = highlightedSkills.has(skill.id);
            const isSelected = selectedSkill === skill.name;
            const isHovered = hoveredSkill === skill.id;
            const isActive = isHighlighted || isSelected || isHovered;

            return (
              <g key={skill.id}>
                {/* Outer glow ring - always visible but subtle */}
                <motion.circle
                  cx={skill.x}
                  cy={skill.y}
                  r={3.5}
                  fill="none"
                  stroke={categoryColors[skill.category]}
                  strokeWidth={0.2}
                  opacity={isActive ? 0.4 : 0.1}
                  className={styles.nodeRing}
                  animate={{
                    opacity: isActive ? [0.4, 0.6, 0.4] : 0.1,
                    scale: isActive ? [1, 1.1, 1] : 1
                  }}
                  transition={{
                    duration: 2,
                    repeat: isActive ? Infinity : 0,
                    ease: 'easeInOut'
                  }}
                />

                {/* Glow effect when highlighted */}
                {isActive && (
                  <motion.circle
                    cx={skill.x}
                    cy={skill.y}
                    r={5}
                    fill={categoryColors[skill.category]}
                    className={styles.nodeGlow}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ 
                      scale: [1, 1.2, 1], 
                      opacity: [0.15, 0.25, 0.15] 
                    }}
                    transition={{ 
                      duration: 1.5,
                      repeat: Infinity,
                      ease: 'easeInOut'
                    }}
                  />
                )}

                {/* Main node circle */}
                <motion.circle
                  cx={skill.x}
                  cy={skill.y}
                  r={isActive ? 2.2 : 1.5}
                  fill={categoryColors[skill.category]}
                  className={styles.node}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ 
                    scale: 1, 
                    opacity: isActive ? 1 : 0.6,
                  }}
                  whileHover={{ scale: 1.3 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ 
                    duration: 0.3, 
                    delay: index * 0.015,
                    ease: 'easeOut'
                  }}
                  onMouseEnter={(e) => handleNodeHover(skill.id, e)}
                  onMouseLeave={() => handleNodeHover(null)}
                  onClick={() => handleSkillClick(skill.id)}
                  style={{ cursor: 'pointer' }}
                />

                {/* Always-visible label for selected/hovered */}
                <motion.text
                  x={skill.x}
                  y={skill.y - 4}
                  textAnchor="middle"
                  className={styles.label}
                  initial={{ opacity: 0 }}
                  animate={{ 
                    opacity: (isHovered || isSelected) ? 1 : 0,
                    scale: (isHovered || isSelected) ? 1 : 0.8
                  }}
                  transition={{ duration: 0.2 }}
                  pointerEvents="none"
                >
                  {skill.name}
                </motion.text>
              </g>
            );
          })}
        </g>
      </svg>

      {/* Tooltip */}
      <AnimatePresence>
        {hoveredSkill && activeSkill && (
          <motion.div
            className={styles.tooltip}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.15 }}
            style={{
              left: `${tooltipPosition.x}%`,
              top: `${tooltipPosition.y}%`,
            }}
          >
            <div className={styles.tooltipContent}>
              <div 
                className={styles.tooltipHeader}
                style={{ borderLeftColor: categoryColors[activeSkill.category] }}
              >
                <strong>{activeSkill.name}</strong>
                <span className={styles.tooltipCategory}>
                  {activeSkill.category}
                </span>
              </div>
              {activeSkill.description && (
                <p className={styles.tooltipDescription}>{activeSkill.description}</p>
              )}
              <p className={styles.tooltipHint}>Click to filter projects & experiences</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Enhanced Legend */}
      <div className={styles.legend}>
        {Object.entries(categoryColors).map(([category, color]) => (
          <motion.div 
            key={category} 
            className={styles.legendItem}
            whileHover={{ scale: 1.05 }}
          >
            <span 
              className={styles.legendDot} 
              style={{ 
                backgroundColor: color,
                boxShadow: `0 0 8px ${color}80`
              }} 
            />
            <span className={styles.legendLabel}>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </span>
          </motion.div>
        ))}
      </div>

      {/* Instructions */}
      <motion.p 
        className={styles.instructions}
        animate={{ opacity: selectedSkill ? 1 : 0.7 }}
      >
        {selectedSkill 
          ? `Filtering by ${selectedSkill} • Click again to clear`
          : 'Hover to explore • Click to filter projects & experiences'
        }
      </motion.p>
    </div>
  );
}
