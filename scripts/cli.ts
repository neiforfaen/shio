import { spawnSync } from "node:child_process"

const [_, __, command, ...args] = process.argv

if (command !== "add" || args.length < 1) {
  console.log("Usage: pnpm dlx shio-ui add [...packages]")
  process.exit(1)
}

const packages = args.filter((pkgName) => pkgName.trim() !== "")

for (const packageName of packages) {
  console.log(`Adding ${packageName} component...`)

  const url = new URL(`r/${packageName}.json`, "https://www.shio-ui.com")
  const cmd = `npx -y shadcn@latest add ${url.toString()}`

  const { error, status } = spawnSync(cmd, {
    stdio: "inherit",
    shell: true,
  })

  if (error) {
    console.error(`Failed to add ${packageName}:`, error.message)
    process.exit(1)
  }

  if (status !== 0) {
    console.error(`Command failed with exit code: ${status}`)
    process.exit(1)
  }
}
