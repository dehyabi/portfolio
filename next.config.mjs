import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
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
        punycode: path.resolve(__dirname, 'node_modules/punycode')
      };
    }

    return config;
  },
  output: 'export', 
  images: {
    unoptimized: true 
  },
  basePath: '/portfolio',
  assetPrefix: '/portfolio/',
  trailingSlash: true,
  async redirects() {
    return [
      {
        source: '/',
        destination: '/portfolio',
        permanent: true
      }
    ]
  }
}

export default nextConfig;