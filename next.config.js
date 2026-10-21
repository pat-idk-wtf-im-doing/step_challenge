/** @type {import('next').NextConfig} */
const nextConfig = {
  outputFileTracingIncludes: {
    '/icon': ['./public/app_image.jpg'],
    '/apple-icon': ['./public/app_image.jpg'],
  },
};

module.exports = nextConfig;
