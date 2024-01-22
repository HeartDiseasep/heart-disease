/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.py$/,
      type: "asset/resource",
      generator: {
        filename: "scripts/[name].py",
      },
    });
    config.module.rules.push({
      test: /\.csv$/,
      type: "asset/resource",
      generator: {
        filename: "scripts/[name].csv",
      },
    });
    return config;
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;
