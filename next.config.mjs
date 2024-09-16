// next.config.mjs

const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'uch-app.s3.ap-southeast-2.amazonaws.com',
      },
    ],
  },
};
  
  export default nextConfig;