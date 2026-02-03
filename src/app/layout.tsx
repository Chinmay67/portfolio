import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

// Font optimization - self-hosted via next/font
const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://chinmaysingh.dev'),
  title: 'Chinmay Singh — Software Developer',
  description: 'Backend-heavy full-stack developer specializing in Node.js, PostgreSQL, AWS, and REST APIs. Currently building low-latency systems at Juspay.',
  keywords: [
    'Software Developer',
    'Backend Developer', 
    'Full-Stack Developer',
    'Node.js Developer',
    'PostgreSQL',
    'AWS',
    'REST API',
    'React Developer',
    'TypeScript',
    'Chinmay Singh'
  ],
  authors: [{ name: 'Chinmay Singh', url: 'https://chinmaysingh.dev' }],
  creator: 'Chinmay Singh',
  publisher: 'Chinmay Singh',
  
  alternates: {
    canonical: 'https://chinmaysingh.dev',
  },

  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://chinmaysingh.dev',
    siteName: 'Chinmay Singh Portfolio',
    title: 'Chinmay Singh — Software Developer',
    description: 'Backend-heavy full-stack developer specializing in Node.js, PostgreSQL, AWS, and REST APIs. Currently building low-latency systems at Juspay.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Chinmay Singh — Software Developer',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Chinmay Singh — Software Developer',
    description: 'Backend-heavy full-stack developer specializing in Node.js, PostgreSQL, AWS, and REST APIs.',
    images: ['/og-image.png'],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  verification: {
    google: '', // Add Google Search Console verification code if needed
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Chinmay Singh',
    jobTitle: 'Software Developer',
    description: 'Backend-heavy full-stack developer specializing in Node.js, PostgreSQL, AWS, and REST APIs',
    url: 'https://chinmaysingh.dev',
    sameAs: [
      'https://github.com/Chinmay67',
      'https://www.linkedin.com/in/chinmay-singh-4092b0253',
    ],
    knowsAbout: [
      'Node.js',
      'Express',
      'PostgreSQL',
      'MongoDB',
      'Redis',
      'AWS',
      'React',
      'TypeScript',
      'JavaScript',
      'REST APIs',
      'Full-Stack Development',
      'Backend Development',
    ],
    alumniOf: {
      '@type': 'Organization',
      name: 'Your University', // Update with actual university
    },
    worksFor: [
      {
        '@type': 'Organization',
        name: 'Juspay',
      },
    ],
  };

  return (
    <html lang="en" className={inter.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
