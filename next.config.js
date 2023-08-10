/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverActions: true,
      },
      reactStrictMode: true, 
    images: {
    domains: ['uploadthing.com', 'pbs.twimg.com', 'www.ggrecon.com'],
    },
}

module.exports = nextConfig
