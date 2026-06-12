import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // @react-pdf/renderer serverseitig nicht bundeln (fontkit u. a. native-nah).
  serverExternalPackages: ["@react-pdf/renderer"],
};

export default nextConfig;
