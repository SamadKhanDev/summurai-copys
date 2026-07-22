import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
import { BASE_PATH } from "./lib/basePath";
import path from "path";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  turbopack: {
    root: path.resolve(__dirname),
  },
  basePath: BASE_PATH,
  env: {
    NEXT_PUBLIC_APP_BASE_PATH: BASE_PATH,
  },
  async redirects() {
    if (!BASE_PATH) {
      return [];
    }

    return [
      {
        source: "/",
        destination: BASE_PATH,
        permanent: false,
        basePath: false,
      },
    ];
  },
};

export default withNextIntl(nextConfig);
