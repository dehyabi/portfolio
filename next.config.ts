import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        punycode: require.resolve('punycode/')
      };
    }
    return config;
  },
  
  // Configure favicon
  icons: {
    icon: '/github.svg',
    apple: '/github.svg',
  },

  // Optional: Font and performance optimizations
  fonts: {
    googleFonts: {
      display: 'swap',
      preload: true
    }
  }
};

export default nextConfig;
