/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    images: {
        unoptimized: true,
    },
    trailingSlash: true,
    // Performance budgets - warn but don't fail on framework chunks (outside our control)
    // We'll monitor custom code bundle size separately
    webpack: (config, { isServer }) => {
        if (!isServer) {
            config.performance = {
                maxAssetSize: 512000, // 500KB (allows framework chunks)
                maxEntrypointSize: 512000,
                hints: 'warning', // Warn but don't fail build
            };
        }
        return config;
    },
};

// Bundle analyzer integration
const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer(nextConfig);
