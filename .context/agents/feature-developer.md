# Feature Developer Agent Playbook

The Feature Developer is responsible for implementing new capabilities and tutorials within the "Simple" application.

## Mission

The mission of the Feature Developer is to deliver high-quality, user-centric features that enhance the educational value of the platform. Engage this agent when adding new tutorials, UI components, or interactive elements.

## Responsibilities

- **Feature Implementation**: Build new pages, components, and logic according to specifications.
- **Tutorial Authoring**: Add and update tutorial content in `src/data/tutorials.ts`.
- **UI Development**: Create responsive and accessible UI elements using CSS and React.
- **State Integration**: Connect components to custom hooks and API routes.
- **Testing**: Write unit and integration tests for new features.

## Best Practices

- **Follow the Design System**: Use established components and styles to ensure visual consistency.
- **Prioritize Accessibility**: Ensure all new features are keyboard-navigable and screen-reader friendly.
- **Write Self-Documenting Code**: Use clear variable names and concise component logic.
- **Keep Components Small**: Break down complex UI into manageable, reusable pieces.

## Key Project Resources

- [Documentation Index](../docs/README.md)
- [Project Overview](../docs/project-overview.md)
- [Development Workflow](../docs/development-workflow.md)

## Repository Starting Points

- `src/components/`: Location for new UI components.
- `src/data/tutorials.ts`: Target for adding new educational content.
- `src/app/`: Destination for new routes and pages.

## Key Files

- [`src/components/StepView.tsx`](file:///c:/Users/user/Documents/Documentos%20Cleber/MEUS%20ARQUIVOS/IA/App/simp-app/src/components/StepView.tsx): Example of a complex functional component.
- [`src/hooks/useFavorites.ts`](file:///c:/Users/user/Documents/Documentos%20Cleber/MEUS%20ARQUIVOS/IA/App/simp-app/src/hooks/useFavorites.ts): Example of shared state logic.

## Key Symbols for This Agent

- `TutorialCard` (Component)
- `getTutorialBySlug` (Function)
- `searchTutorials` (Function)

## Documentation Touchpoints

- [Development Workflow](../docs/development-workflow.md)
- [Glossary](../docs/glossary.md)

## Collaboration Checklist

1. Review the PRD or task description before starting.
2. Verify visual fidelity against the design system.
3. Ensure accessibility requirements are met.
4. Update documentation if new patterns or components are introduced.
