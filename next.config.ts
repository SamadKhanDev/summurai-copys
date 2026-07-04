import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
import { BASE_PATH } from "./lib/basePath";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
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
