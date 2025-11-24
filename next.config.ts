import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
  webpack: (config, { isServer }) => {
    config.resolve ??= {};

    if (isServer) {
      config.resolve.alias = {
        ...(config.resolve.alias ?? {}),
        "@duckdb/duckdb-wasm": false,
        "@duckdb/duckdb-wasm/dist/duckdb-mvp.wasm": false,
        "@duckdb/duckdb-wasm/dist/duckdb-eh.wasm": false,
      };
    } else {
      config.resolve.fallback = {
        ...(config.resolve.fallback ?? {}),
        fs: false,
        path: false,
        crypto: false,
      };
      config.experiments = {
        ...(config.experiments ?? {}),
        asyncWebAssembly: true,
        layers: true,
      };
      config.module = config.module ?? { rules: [] };
      config.module.rules = config.module.rules ?? [];
      config.module.rules.push({
        test: /\.wasm$/,
        type: "asset/resource",
      });
    }

    return config;
  },
};

export default nextConfig;
