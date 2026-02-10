/**
 * Navigation Component - Radial Arc Menu
 * Circular floating button that expands into a semi-circular arc menu
 * Hidden by default, beautiful when expanded
 */

'use client';

import { useState, useEffect } from 'react';
import { HiHome, HiCode, HiBriefcase, HiLightningBolt, HiUser, HiBeaker, HiMail, HiMenu } from 'react-icons/hi';
import styles from './Navigation.module.css';

interface NavSection {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  ariaLabel: string;
}

const NAV_SECTIONS: NavSection[] = [
  { id: 'hero', label: 'Home', icon: HiHome, ariaLabel: 'Navigate to home section' },
  { id: 'skills', label: 'Skills', icon: HiCode, ariaLabel: 'Navigate to skills section' },
  { id: 'experience', label: 'Experience', icon: HiBriefcase, ariaLabel: 'Navigate to experience section' },
  { id: 'projects', label: 'Projects', icon: HiLightningBolt, ariaLabel: 'Navigate to projects section' },
  { id: 'about', label: 'About', icon: HiUser, ariaLabel: 'Navigate to about section' },
  { id: 'github', label: 'GitHub', icon: HiBeaker, ariaLabel: 'Navigate to GitHub section' },
  { id: 'contact', label: 'Contact', icon: HiMail, ariaLabel: 'Navigate to contact section' }
];

export default function Navigation() {
  const [activeSection, setActiveSection] = useState('hero');
  const [isVisible, setIsVisible] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Scroll tracking for active section
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -70% 0px',
      threshold: 0
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    NAV_SECTIONS.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  // Auto-hide on scroll
  useEffect(() => {
    let lastScrollY = window.scrollY;
    let scrollTimeout: NodeJS.Timeout;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      console.log('Scroll Event:', {
        currentScrollY,
        lastScrollY,
        shouldHide: currentScrollY > lastScrollY && currentScrollY > 100
      });

      // Hide when scrolling down past 100px, show when scrolling up or near top
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        console.log('Setting isVisible to false (scrolling down)');
        setIsVisible(false);
        setIsExpanded(false); // Close menu when hiding
      } else if (currentScrollY < lastScrollY) {
        // Only show when actively scrolling UP
        console.log('Setting isVisible to true (scrolling up)');
        setIsVisible(true);
      } else if (currentScrollY <= 100) {
        // Always show when near the top
        console.log('Setting isVisible to true (near top)');
        setIsVisible(true);
      }

      lastScrollY = currentScrollY;

      // Auto-show after scroll stops
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        setIsVisible(true);
      }, 1000);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, []);

  // Calculate arc position for each item
  // Semi-circle opening to the right (from top to bottom)
  const getArcPosition = (index: number, total: number) => {
    const radius = 140; // Distance from trigger button
    const startAngle = 270; // Start at top (270° = -90°)
    const endAngle = 90; // End at bottom (90°)
    const angleRange = startAngle - endAngle;
    const angleStep = angleRange / (total - 1);
    const angle = startAngle - (index * angleStep);
    const angleInRadians = (angle * Math.PI) / 180;

    return {
      x: radius * Math.cos(angleInRadians),
      y: radius * Math.sin(angleInRadians)
    };
  };

  // Smooth scroll to section
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setIsExpanded(false); // Close menu after navigation
  };

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent, sectionId: string) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      scrollToSection(sectionId);
    }
  };

  // Toggle menu on mobile
  const toggleMenu = () => {
    setIsExpanded(!isExpanded);
  };

  // Close menu when clicking outside
  useEffect(() => {
    if (!isExpanded) return;

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const navElement = document.querySelector(`.${styles.navContainer}`);
      
      if (navElement && !navElement.contains(target)) {
        setIsExpanded(false);
      }
    };

    // Add listener after a small delay to prevent immediate close
    const timeoutId = setTimeout(() => {
      document.addEventListener('click', handleClickOutside);
    }, 100);

    return () => {
      clearTimeout(timeoutId);
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isExpanded]);

  // On desktop, expand on hover of trigger button
  const handleTriggerMouseEnter = () => {
    if (!isMobile) {
      setIsExpanded(true);
    }
  };


  // Log when isVisible changes
  useEffect(() => {
    console.log('isVisible changed to:', isVisible);
    console.log('styles object:', styles);
    console.log('Applied classes:', {
      navContainer: styles.navContainer,
      visible: styles.visible,
      hidden: styles.hidden
    });
  }, [isVisible]);

  return (
    <nav 
      className={`${styles.navContainer} ${isVisible ? styles.visible : styles.hidden}`}
      aria-label="Main navigation"
    >
      {/* Trigger Button */}
      <button
        className={`${styles.triggerButton} ${isExpanded ? styles.expanded : ''}`}
        onClick={toggleMenu}
        onMouseEnter={handleTriggerMouseEnter}
        aria-label={isExpanded ? 'Close navigation menu' : 'Open navigation menu'}
        aria-expanded={isExpanded}
      >
        <HiMenu className={styles.menuIcon} aria-hidden="true" />
      </button>

      {/* Arc Menu Items */}
      <div className={`${styles.arcContainer} ${isExpanded ? styles.arcExpanded : ''}`}>
        {NAV_SECTIONS.map((section, index) => {
          const position = getArcPosition(index, NAV_SECTIONS.length);
          const isActive = activeSection === section.id;
          const IconComponent = section.icon;
          
          return (
            <button
              key={section.id}
              className={`${styles.navItem} ${isActive ? styles.active : ''}`}
              style={{
                '--x': `${position.x}px`,
                '--y': `${position.y}px`,
                '--delay': `${index * 0.05}s`
              } as React.CSSProperties}
              onClick={() => scrollToSection(section.id)}
              onKeyDown={(e) => handleKeyDown(e, section.id)}
              aria-label={section.ariaLabel}
              aria-current={isActive ? 'location' : undefined}
              tabIndex={isExpanded ? 0 : -1}
            >
              <div className={styles.iconWrapper}>
                <IconComponent className={styles.icon} aria-hidden="true" />
              </div>
              <span className={styles.label}>{section.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
