import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  //without config
};

module.exports = {
    images: {
        remotePatterns: [new URL(`https://image.tmdb.org/t/p/original/**`)],
    },
}

export default nextConfig;
