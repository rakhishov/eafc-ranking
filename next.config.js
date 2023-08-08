/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverActions: true,
      },
      reactStrictMode: true, 
    images: {
    domains: ['uploadthing.com'],
    },
}

module.exports = nextConfig
