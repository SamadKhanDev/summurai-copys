import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  basePath: "/v0",
  async redirects() {
    return [
      {
        source: "/",
        destination: "/v0",
        permanent: false,
        basePath: false,
      },
    ];
  },
};

export default withNextIntl(nextConfig);