import { execSync } from "node:child_process"
import type { PlopTypes } from "@turbo/gen"

export default function generator(plop: PlopTypes.NodePlopAPI): void {
  plop.setGenerator("component", {
    description: "Generate a new component package",
    prompts: [
      {
        type: "input",
        name: "componentName",
        message:
          "What is the name of the component? (Skip the `@repo/` prefix)",
        validate: (input: string) => {
          if (
            input.includes(".") ||
            input.includes("/") ||
            input.includes("@")
          ) {
            return "Name should not include an extension"
          }
          if (!input) {
            return "Name is required"
          }
          return true
        },
      },
    ],
    actions: [
      (answers) => {
        answers.componentName = answers.componentName
          .toLowerCase()
          .replace(/\s+/g, "-")
        return "Component name sanitized"
      },
      {
        type: "add",
        path: "packages/{{ componentName }}/package.json",
        templateFile: "templates/component.package.json.hbs",
      },
      {
        type: "add",
        path: "packages/{{ componentName }}/tsconfig.json",
        templateFile: "templates/component.tsconfig.json.hbs",
      },
      {
        type: "add",
        path: "packages/{{ componentName }}/index.tsx",
        templateFile: "templates/component.index.tsx.hbs",
      },
      (answers) => {
        const rootPath = answers.turbo.paths.root

        execSync("pnpm install", {
          cwd: rootPath,
          stdio: "inherit",
        })
        execSync(`pnpm fix packages/${answers.componentName}`, {
          cwd: rootPath,
          stdio: "inherit",
        })
        return "pnpm install executed"
      },
    ],
  })
}
