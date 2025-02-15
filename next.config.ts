import type { NextConfig } from 'next';
import path from 'path';

const nextConfig: NextConfig = {
  // experimental: {
  //   turbo: {
  //     resolveAlias: {
  //       '@vercel/turbopack-next': 'next',
  //     },
  //   },
  // },
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
  webpack: (config, { isServer }) => {
    config.resolve.alias['@'] = path.resolve(__dirname, 'src');
    config.resolve.alias['@/styles'] = path.resolve(__dirname, 'src/styles');

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
