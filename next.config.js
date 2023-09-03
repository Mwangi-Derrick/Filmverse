/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
    domains: ['image.tmdb.org','themoviedb.org'],
  },
  experimental: {
    serverActions: true,
  },
}

module.exports = nextConfig
