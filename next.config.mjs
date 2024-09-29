/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*flaticon.com",
        port: "",
      },
    ],
  },
};

export default nextConfig;
