/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: "/",
          destination: "/contacts",
        },
      ],
    };
  },
};

export default nextConfig;
