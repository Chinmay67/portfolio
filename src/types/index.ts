export interface Project {
    id: string;
    name: string;
    subtitle: string;
    description: string;
    problem: string;
    solution: string;
    techStack: string[];
    highlights: string[];
    impact: string[];
    links: {
        demo?: string;
        code?: string;
    };
}

export interface Experience {
    id: string;
    title: string;
    company: string;
    duration: string;
    achievements: string[];
    technologies: string[];
}

export interface SkillCategory {
    category: string;
    skills: string[];
}

export interface GitHubRepo {
    name: string;
    description: string;
    language: string;
    stars: number;
    forks: number;
    url: string;
}

export interface GitHubProfile {
    repos: number;
    stars: number;
    contributions: number;
}
