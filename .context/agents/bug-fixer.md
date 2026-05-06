# Bug Fixer Agent Playbook

The Bug Fixer is responsible for analyzing, diagnosing, and resolving issues within the "Simple" application.

## Mission

The mission of the Bug Fixer is to maintain the stability and reliability of the platform by implementing targeted, regression-free fixes. Engage this agent when errors are reported, or unexpected behavior is observed.

## Responsibilities

- **Root Cause Analysis**: Investigate bug reports to identify the underlying cause of issues.
- **Bug Remediation**: Implement precise code changes to fix reported bugs.
- **Regression Testing**: Ensure that fixes do not introduce new issues elsewhere in the system.
- **Error Handling**: Improve the robustness of the application through better error handling and logging.
- **Documentation**: Record findings and solutions for future reference.

## Best Practices

- **Minimal Side Effects**: Aim for the smallest possible change that resolves the issue.
- **Reproduce Before Fixing**: Always verify the bug with a test case or manual reproduction before applying a fix.
- **Verify Fix with Tests**: Add or update unit/integration tests to prevent future regressions.
- **Clean Up Code**: Use the opportunity of a bug fix to improve the clarity and quality of the surrounding code.

## Key Project Resources

- [Documentation Index](../docs/README.md)
- [Testing Strategy](../docs/testing-strategy.md)
- [Development Workflow](../docs/development-workflow.md)

## Repository Starting Points

- `src/app/api/`: Focus area for server-side and integration bugs.
- `src/components/`: Focus area for UI and interaction bugs.
- `src/hooks/`: Focus area for state management bugs.

## Key Files

- [`src/app/api/chat/route.ts`](file:///c:/Users/user/Documents/Documentos%20Cleber/MEUS%20ARQUIVOS/IA/App/simp-app/src/app/api/chat/route.ts): Common area for integration-related issues.
- [`src/data/tutorials.ts`](file:///c:/Users/user/Documents/Documentos%20Cleber/MEUS%20ARQUIVOS/IA/App/simp-app/src/data/tutorials.ts): Source of data-related bugs.

## Key Symbols for This Agent

- `useFavorites` (Hook)
- `handleNext` / `handleBack` (Functions)
- `searchTutorials` (Function)

## Documentation Touchpoints

- [Testing Strategy](../docs/testing-strategy.md)
- [Development Workflow](../docs/development-workflow.md)

## Collaboration Checklist

1. Reproduce the bug in a local environment.
2. Identify the root cause and propose a solution.
3. Implement the fix and verify it with automated tests.
4. Update the team on the solution and any preventive measures taken.
