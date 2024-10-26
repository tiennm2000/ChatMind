/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*flaticon.com",
        port: "",
      },
      { hostname: "files.stripe.com" },
    ],
  },
};

export default nextConfig;
