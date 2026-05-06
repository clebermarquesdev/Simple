# Development Workflow

This document outlines the standard engineering processes for the "Simple" application codebase. Following these guidelines ensures consistency, quality, and smooth collaboration.

## Branching & Releases

- **Branching Model**: We use a simplified Trunk-Based Development model. 
  - `main`: The stable branch. All production-ready code lives here.
  - Feature branches: Created for specific tasks (e.g., `feature/add-inss-tutorial` or `fix/auth-redirect`).
- **Release Cadence**: Continuous deployment to staging/production environment upon merging into `main`.
- **Tagging**: Use Semantic Versioning (SemVer) for major releases (e.g., `v1.0.0`).

## Local Development

To get the project running locally, follow these steps:

- **Install Dependencies**:
  ```bash
  npm install
  ```
- **Environment Setup**:
  - Copy `.env.example` to `.env` (if applicable).
  - Add your `GOOGLE_GENERINI_API_KEY` and other necessary credentials.
- **Run Locally**:
  ```bash
  npm run dev
  ```
- **Build for Production**:
  ```bash
  npm run build
  ```
- **Linting**:
  ```bash
  npm run lint
  ```

## Code Review Expectations

All changes must go through a peer review process. Reviewers should check for:

- **Accessibility**: Ensure components are usable by the target audience (elderly/beginners).
- **TypeScript Compliance**: No `any` types where avoidable; proper interface usage.
- **Performance**: Minimize unnecessary re-renders in complex tutorial steps.
- **Visual Fidelity**: Check that UI changes match the established design system and aesthetics.

> For AI-assisted collaboration, refer to the individual agent playbooks in `.context/agents/`.

## Onboarding Tasks

New developers should start by:

1. Exploring the `src/data/tutorials.ts` file to understand how content is structured.
2. Running the app and completing at least one tutorial as a user.
3. Checking the [Project Overview](./project-overview.md) and [Architecture Notes](./architecture.md).

## Cross-References

- [Testing Strategy](./testing-strategy.md)
- [Tooling Guide](./tooling.md)
