/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.py$/,
      type: "asset/resource",
      generator: {
        filename: "static/chunks/[name].py",
      },
    });
    return config;
  },
};

module.exports = nextConfig;
