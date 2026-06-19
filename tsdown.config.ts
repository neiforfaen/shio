import { defineConfig } from "tsdown"

export default defineConfig({
  banner: "#!/usr/bin/env node",
  entry: ["scripts/cli.ts"],
  outDir: "dist",
  sourcemap: false,
  minify: true,
  format: ["cjs", "esm"],
  outExtensions: () => ({
    js: ".js",
  }),
})
