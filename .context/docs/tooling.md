# Tooling & Productivity Guide

This guide details the tools, scripts, and automation used to enhance developer productivity in the "Simple" project.

## Tooling & Productivity Guide

Our tooling stack is designed to catch errors early, automate repetitive tasks, and provide a smooth development experience.

## Required Tooling

- **Node.js (v18+)**: The primary runtime for the application and build scripts.
- **npm**: Used for package management and script execution.
- **Visual Studio Code (VS Code)**: The recommended IDE, configured with specific extensions for this project.
- **Git**: For version control and collaborative development.

## Recommended Automation

- **Pre-commit Hooks**: (If configured) use `husky` to run linting and tests before every commit.
- **Linting & Formatting**: 
  - `npm run lint`: Runs ESLint to identify code quality issues.
  - `npm run format`: Uses Prettier to automatically format code according to project standards.
- **Build Watcher**: `npm run dev` automatically recompiles the application on file changes.

## IDE / Editor Setup

To get the most out of VS Code, we recommend installing the following extensions:

- **ESLint**: Highlights code quality issues in real-time.
- **Prettier - Code formatter**: Automatically formats code on save.
- **Tailwind CSS IntelliSense**: (If using Tailwind) provides autocomplete and linting for Tailwind classes.
- **TypeScript Hero**: Helps with managing imports and organizing code.

## Productivity Tips

- **Terminal Aliases**: Consider adding aliases for common commands (e.g., `nd` for `npm run dev`).
- **Workspace Settings**: Use the provided `.vscode/settings.json` (if present) to synchronize editor behavior across the team.

## Cross-References

- [Development Workflow](./development-workflow.md)
