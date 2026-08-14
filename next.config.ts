import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow the dev server to be reached from the LAN IP in development.
  // (Production is unaffected; this only matters for `next dev`.)
  allowedDevOrigins: ["192.168.29.4"],
};

export default nextConfig;
