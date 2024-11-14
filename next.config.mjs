import nextPwa from "next-pwa";

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  output: "export",
  reactStrictMode: true,
};
const isDev = process.env.NODE_ENV !== "production";

const withPWA = nextPwa({
  dest: "public",
  register: true,
});

const config = withPWA({
  ...nextConfig,
});

export default config;
