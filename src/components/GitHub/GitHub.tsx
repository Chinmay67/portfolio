/**
 * GitHub Activity Section Component
 * Purpose: Showcase open source contributions and featured projects
 * Implements Phase 5 GitHub Integration
 */

'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import styles from './GitHub.module.css';

// Fallback data if API fails
const FALLBACK_DATA = {
  profile: {
    public_repos: 25,
    followers: 45,
    total_stars: 67
  },
  repos: [
    {
      id: 1,
      name: 'streamzone',
      description: 'Full-stack video sharing platform with JWT auth, Cloudinary uploads, and MongoDB analytics',
      language: 'JavaScript',
      stargazers_count: 12,
      forks_count: 3,
      html_url: 'https://github.com/Chinmay67/streamzone'
    },
    {
      id: 2,
      name: 'unifind',
      description: 'College predictor platform with data-driven prediction logic and clean REST APIs',
      language: 'JavaScript',
      stargazers_count: 8,
      forks_count: 2,
      html_url: 'https://github.com/Chinmay67/unifind'
    },
    {
      id: 3,
      name: 'portfolio',
      description: 'Personal portfolio built with Next.js, TypeScript, and Framer Motion',
      language: 'TypeScript',
      stargazers_count: 5,
      forks_count: 1,
      html_url: 'https://github.com/Chinmay67/portfolio'
    }
  ]
};

const GITHUB_USERNAME = 'Chinmay67';
const CACHE_KEY = 'github_data';
const CACHE_DURATION = 60 * 60 * 1000; // 1 hour in milliseconds

interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  html_url: string;
}

interface GitHubProfile {
  public_repos: number;
  followers: number;
  total_stars?: number;
}

interface GitHubData {
  profile: GitHubProfile;
  repos: GitHubRepo[];
  timestamp: number;
}

export default function GitHub() {
  const [data, setData] = useState<GitHubData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGitHubData = async () => {
      // Check cache first
      const cached = sessionStorage.getItem(CACHE_KEY);
      if (cached) {
        try {
          const parsedCache: GitHubData = JSON.parse(cached);
          const now = Date.now();
          
          // Use cache if less than 1 hour old
          if (now - parsedCache.timestamp < CACHE_DURATION) {
            setData(parsedCache);
            setLoading(false);
            return;
          }
        } catch {
          // Invalid cache, continue to fetch
        }
      }

      // Fetch from GitHub API
      try {
        const [profileRes, reposRes] = await Promise.all([
          fetch(`https://api.github.com/users/${GITHUB_USERNAME}`),
          fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=stars&per_page=3`)
        ]);

        if (!profileRes.ok || !reposRes.ok) {
          throw new Error('GitHub API request failed');
        }

        const profile = await profileRes.json();
        const repos: GitHubRepo[] = await reposRes.json();

        // Calculate total stars across all repos
        const reposForStars = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100`);
        const allRepos: GitHubRepo[] = await reposForStars.json();
        const totalStars = allRepos.reduce((sum, repo) => sum + repo.stargazers_count, 0);

        const newData: GitHubData = {
          profile: {
            public_repos: profile.public_repos,
            followers: profile.followers,
            total_stars: totalStars
          },
          repos: repos.slice(0, 3), // Top 3 starred repos
          timestamp: Date.now()
        };

        // Cache the data
        sessionStorage.setItem(CACHE_KEY, JSON.stringify(newData));
        setData(newData);
      } catch (error) {
        // Fall back to static data on any error
        console.warn('GitHub API failed, using fallback data:', error);
        const fallbackWithTimestamp: GitHubData = {
          ...FALLBACK_DATA,
          timestamp: Date.now()
        };
        setData(fallbackWithTimestamp);
      } finally {
        setLoading(false);
      }
    };

    fetchGitHubData();
  }, []);

  return (
    <div className={styles.github} aria-busy={loading}>
      {/* Section Heading */}
      <motion.h2 
        id="github-heading" 
        className={styles.heading}
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      >
        GitHub Activity
      </motion.h2>

      {loading ? (
        // Skeleton Loading State
        <div className={styles.skeleton}>
          <div className={styles.skeletonStats}>
            <div className={styles.skeletonStat}></div>
            <div className={styles.skeletonStat}></div>
            <div className={styles.skeletonStat}></div>
          </div>
          <div className={styles.skeletonRepos}>
            <div className={styles.skeletonCard}></div>
            <div className={styles.skeletonCard}></div>
            <div className={styles.skeletonCard}></div>
          </div>
        </div>
      ) : (
        <>
          {/* Profile Stats */}
          <motion.div 
            className={styles.stats}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.4, ease: 'easeOut', delay: 0.1 }}
          >
            <div className={styles.stat}>
              <span className={styles.statValue}>{data?.profile.public_repos || 0}</span>
              <span className={styles.statLabel}>Repositories</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statValue}>{data?.profile.total_stars || 0}</span>
              <span className={styles.statLabel}>Stars</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statValue}>{data?.profile.followers || 0}</span>
              <span className={styles.statLabel}>Followers</span>
            </div>
          </motion.div>

          {/* Featured Repositories */}
          <div className={styles.repos}>
            {data?.repos.map((repo, index) => (
              <motion.a
                key={repo.id}
                href={repo.html_url}
                className={styles.repoCard}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${repo.name} repository with ${repo.stargazers_count} stars`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ 
                  duration: 0.4, 
                  ease: 'easeOut',
                  delay: 0.1 + (index * 0.1)
                }}
              >
                <h3 className={styles.repoName}>{repo.name}</h3>
                <p className={styles.repoDescription}>
                  {repo.description || 'No description available'}
                </p>
                <div className={styles.repoMeta}>
                  {repo.language && (
                    <span className={styles.language}>
                      <span className={styles.languageDot}></span>
                      {repo.language}
                    </span>
                  )}
                  <span className={styles.stars}>⭐ {repo.stargazers_count}</span>
                  <span className={styles.forks}>🔱 {repo.forks_count}</span>
                </div>
              </motion.a>
            ))}
          </div>

          {/* View All Link */}
          <motion.div 
            className={styles.viewAll}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.3, ease: 'easeOut', delay: 0.4 }}
          >
            <a
              href={`https://github.com/${GITHUB_USERNAME}`}
              className={styles.viewAllLink}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View all repositories on GitHub"
            >
              View All on GitHub →
            </a>
          </motion.div>
        </>
      )}
    </div>
  );
}
