import { spawnSync } from "node:child_process"

const [_, __, command, ...args] = process.argv

if (command !== "add" || args.length < 1) {
  console.log("Usage: [npx|pnpm dlx|bunx] shio-ui add [...packages]")
  process.exit(1)
}

const packages = args
  .filter((pkgName) => pkgName.trim() !== "")
  .map((pkgName) =>
    new URL(`r/${pkgName}.json`, "https://www.shio-ui.com").toString()
  )

const { error, status } = spawnSync(
  "npx",
  ["-y", "shadcn@latest", "add", ...packages],
  {
    stdio: "inherit",
  }
)

if (error || status !== 0) {
  console.error(
    `Command failed with exit code: ${status}${error ? `- error: ${error.message}` : ""}`
  )
  process.exit(1)
}
