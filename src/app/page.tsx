/**
 * Home Page Component
 * Section order follows rules.txt Phase 3 specification
 * Enhanced with skill-based project filtering
 */

'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import Hero from '@/components/Hero';
import TechnicalExpertise from '@/components/TechnicalExpertise';
import Projects from '@/components/Projects';
import Experience from '@/components/Experience';
import About from '@/components/About';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import FilterPanel from '@/components/FilterPanel';

// Lazy load GitHub component (below the fold)
const GitHub = dynamic(() => import('@/components/GitHub'), {
  loading: () => (
    <div style={{
      minHeight: '400px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'var(--text-tertiary)'
    }}>
      Loading...
    </div>
  )
});

export default function HomePage() {
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);
  return (
    <main>
      {/* Navigation */}
      {/* <Navigation /> */}

      {/* ============================================
          HERO SECTION
          Purpose: Establish identity and credibility within 3 seconds
          ============================================ */}
      <section id="hero" aria-label="Introduction">
        <div className="container">
          <Hero />
        </div>
      </section>

      {/* ============================================
          TECHNICAL EXPERTISE SECTION
          Purpose: Demonstrate breadth and depth of technical skills
          Enhanced with interactive skill constellation
          ============================================ */}
      <section id="skills" aria-labelledby="skills-heading">
        <div className="container">
          <TechnicalExpertise 
            selectedSkill={selectedSkill}
            onSkillSelect={setSelectedSkill}
          />
        </div>
      </section>

      {/* ============================================
          PROFESSIONAL EXPERIENCE SECTION
          Purpose: Establish credibility through work history
          Shows all experiences (filtering handled in FilterPanel)
          ============================================ */}
      <section id="experience" aria-labelledby="experience-heading">
        <div className="container">
          <Experience />
        </div>
      </section>

      {/* ============================================
          FEATURED PROJECTS SECTION
          Purpose: Prove competence through real-world application
          Shows all projects (filtering handled in FilterPanel)
          ============================================ */}
      <section id="projects" aria-labelledby="projects-heading">
        <div className="container">
          <Projects />
        </div>
      </section>

      {/* ============================================
          ABOUT SECTION
          Purpose: Humanize and provide context
          ============================================ */}
      <section id="about" aria-labelledby="about-heading">
        <div className="container">
          <About />
        </div>
      </section>

      {/* ============================================
          WORK WITH ME SECTION (Optional)
          Purpose: Freelance and consulting offerings
          Note: Conditional rendering - hide if not actively freelancing
          ============================================ */}
      <section id="work" aria-labelledby="work-heading">
        <div className="container">
          {/* Work With Me content will be added in Step 8 */}
        </div>
      </section>

      {/* ============================================
          GITHUB ACTIVITY SECTION
          Purpose: Showcase open source contributions
          ============================================ */}
      <section id="github" aria-labelledby="github-heading">
        <div className="container">
          <GitHub />
        </div>
      </section>

      {/* ============================================
          CONTACT SECTION
          Purpose: Make next steps frictionless
          ============================================ */}
      <section id="contact" aria-labelledby="contact-heading">
        <div className="container">
          <Contact />
        </div>
      </section>

      {/* ============================================
          FOOTER
          Purpose: Branding consistency and quick links
          ============================================ */}
      <footer id="footer" aria-label="Site footer">
        <div className="container">
          <Footer />
        </div>
      </footer>

      {/* ============================================
          FILTER PANEL
          Purpose: Interactive slide-in panel for filtered results
          ============================================ */}
      <FilterPanel 
        selectedSkill={selectedSkill}
        onClearFilter={() => setSelectedSkill(null)}
      />
    </main>
  );
}
