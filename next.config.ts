import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  basePath: "/new",
  async redirects() {
    return [
      {
        source: "/",
        destination: "/new",
        permanent: false,
        basePath: false,
      },
    ];
  },
};

export default withNextIntl(nextConfig);