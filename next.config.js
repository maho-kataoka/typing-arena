/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Docker環境でのホットリロードを有効化
  webpackDevMiddleware: config => {
    config.watchOptions = {
      poll: 1000,
      aggregateTimeout: 300,
    }
    return config
  },
}

module.exports = nextConfig