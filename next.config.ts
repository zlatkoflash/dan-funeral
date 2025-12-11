import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    // === FIX FOR LOCAL IP BLOCKING ===
    // Setting this flag tells the optimizer it's OK to connect to local/private IPs.
    // This is ONLY safe in a development environment.
    dangerouslyAllowLocalIP: true,
    // allowHttpOnLocalhost: true,
    // =================================

    // This allows Next.js to fetch and optimize images from these domains.
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'local.wp', // CRITICAL: If your WordPress URL uses a port (e.g., localhost:8080), you MUST include the port here.
        // The pathname pattern needs to match the path where your WordPress uploads are stored.
        // The '**' wildcard allows any directory structure under this path.
        pathname: '/projects/DanSalganikGR/wordpress-backend/wp-content/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'blog.gentleroad.com', // CRITICAL: If your WordPress URL uses a port (e.g., localhost:8080), you MUST include the port here.
        // The pathname pattern needs to match the path where your WordPress uploads are stored.
        // The '**' wildcard allows any directory structure under this path.
        pathname: '/wp-content/uploads/**',
      },
    ],
  },


};

export default nextConfig;
