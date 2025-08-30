import type { NextConfig } from "next";
const webpack = require("webpack");

const nextConfig: NextConfig = {
    images: {
        domains: [
            "pbs.twimg.com",
            "asset.cloudinary.com",
            "res.cloudinary.com",
        ],
    },
    webpack: (config, { isServer }) => {
        if (!isServer) {
            config.resolve.fallback = {
                ...config.resolve.fallback,
                crypto: require.resolve("crypto-browserify"),
                stream: require.resolve("readable-stream"),
                buffer: require.resolve("buffer"),
                process: require.resolve("process/browser"),
                util: require.resolve("util"),
                assert: require.resolve("assert"),
                http: require.resolve("stream-http"),
                https: require.resolve("https-browserify"),
                os: require.resolve("os-browserify/browser"),
                url: require.resolve("url"),
                zlib: require.resolve("browserify-zlib"),
                path: require.resolve("path-browserify"),
                string_decoder: require.resolve("string_decoder"),
                "stream/transform": require.resolve("readable-stream"),
                "readable-stream": require.resolve("readable-stream"),
                fs: false,
                net: false,
                tls: false,
            };

            config.resolve.alias = {
                ...config.resolve.alias,
                stream: "readable-stream",
                crypto: "crypto-browserify",
                "readable-stream": "readable-stream",
            };

            config.plugins.push(
                new webpack.ProvidePlugin({
                    Buffer: ["buffer", "Buffer"],
                    process: "process/browser",
                })
            );

            config.module.rules.push({
                test: /\.m?js$/,
                resolve: {
                    fullySpecified: false,
                },
            });
        }
        return config;
    },
};

export default nextConfig;
