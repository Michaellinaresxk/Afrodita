import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    domains: [
      'media.graphassets.com', // Para Hygraph
      'localhost',
      'us-west-2.graphassets-2.jpg.com',
      'us-west-2.graphassets.com',
      'us-west-2.graphassets-3.jpg.com',
      'us-west-2.graphassets-4.jpg.com',
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'media.graphassets.com',
      },
      {
        protocol: 'https',
        hostname: '**.hygraph.com',
      },
    ],
  },
};

export default nextConfig;

// domains: [
//   'us-west-2.graphassets-2.jpg.com',
//   'us-west-2.graphassets.com',
//   'us-west-2.graphassets-3.jpg.com',
//   'us-west-2.graphassets-4.jpg.com',
// ],
