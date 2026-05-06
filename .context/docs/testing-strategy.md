# Testing Strategy

Maintaining high quality and reliability is crucial for an educational app like "Simple". This document outlines our testing approach and expectations.

## Testing Strategy

Our testing strategy focuses on ensuring that tutorial steps are displayed correctly, user interactions (like navigation and search) work as expected, and the AI assistant provides accurate help.

## Test Types

- **Unit**: We use **Jest** and **React Testing Library** for component-level testing. 
  - Files are named `*.test.tsx` or `*.spec.tsx`.
  - Focus: Individual UI components and utility functions.
- **Integration**: Testing the flow between components, specifically the tutorial navigation logic.
  - Scenarios: "Next" and "Back" button functionality, progress tracking.
- **E2E**: We use **Playwright** or **Cypress** for end-to-end testing of critical user paths.
  - Harnesses: Automated browser tests verifying the "Search -> Select Tutorial -> Complete Tutorial" flow.

## Running Tests

Use the following commands to run and monitor tests:

- **All tests**: 
  ```bash
  npm run test
  ```
- **Watch mode**: 
  ```bash
  npm run test -- --watch
  ```
- **Coverage report**: 
  ```bash
  npm run test -- --coverage
  ```

## Quality Gates

- **Minimum Coverage**: We aim for 80% coverage on core logic and reusable components.
- **Linting**: No ESLint errors are allowed in merged code. Run `npm run lint` before committing.
- **Formatting**: Prettier must be used to ensure consistent code style.

## Troubleshooting

- **Flaky Tests**: If a test fails intermittently, investigate potential race conditions in asynchronous actions (e.g., AI chat streaming).
- **Environment Quirks**: Ensure `.env` is properly configured for tests that require external API mocks.

## Cross-References

- [Development Workflow](./development-workflow.md)
