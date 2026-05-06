# Architecture Notes

The "Simple" application is designed as a modern, accessible educational platform built with Next.js. Its architecture prioritizes clarity, performance, and a guided user experience for beginners learning to use digital services.

## System Architecture Overview

The application follows a modular monolith structure using the Next.js App Router. It is a client-heavy application where most logic resides in React components and hooks, supported by a lightweight API layer for specialized functions like AI-assisted chat and authentication.

- **Frontend**: React with Next.js, leveraging both Server and Client Components.
- **Backend/API**: Next.js API Routes for chat integration and authentication.
- **Data Layer**: Static tutorial data stored in TypeScript files, acting as a "read-only" database for tutorials.
- **State Management**: React hooks (like `useFavorites`) for local state and session-based persistence.

## Architectural Layers

- **Application Pages**: Next.js App Router paths (`src/app/`) defining the routing structure and layout.
- **Components**: Reusable UI elements (`src/components/`) that handle presentation and user interaction.
- **Data Repositories**: Static data definitions (`src/data/`) that serve as the source of truth for tutorials and categories.
- **Hooks**: Custom logic for state management (`src/hooks/`) such as favorites tracking.
- **API Routes**: Backend endpoints (`src/app/api/`) for external service integrations (e.g., Google Gemini for the chat).

> See [`codebase-map.json`](./codebase-map.json) for complete symbol counts and dependency graphs.

## Detected Design Patterns

| Pattern | Confidence | Locations | Description |
|---------|------------|-----------|-------------|
| Repository Pattern | 90% | `src/data/tutorials.ts` | Centralized data access for tutorial content. |
| Custom Hook | 95% | `src/hooks/useFavorites.ts` | Encapsulates logic for managing user favorites. |
| Higher-Order Components / Composition | 85% | `src/components/` | Composition of atomic components into complex views (e.g., `StepView`). |
| API Route Handler | 100% | `src/app/api/` | Standard Next.js pattern for backend logic. |

## Entry Points

- [Root Layout](file:///c:/Users/user/Documents/Documentos%20Cleber/MEUS%20ARQUIVOS/IA/App/simp-app/src/app/layout.tsx): Defines the global structure and styles.
- [Home Page](file:///c:/Users/user/Documents/Documentos%20Cleber/MEUS%20ARQUIVOS/IA/App/simp-app/src/app/page.tsx): The main landing page displaying categories and featured tutorials.
- [Tutorial Detail](file:///c:/Users/user/Documents/Documentos%20Cleber/MEUS%20ARQUIVOS/IA/App/simp-app/src/app/tutorial/[slug]/page.tsx): Dynamic route for individual tutorial steps.
- [Chat API](file:///c:/Users/user/Documents/Documentos%20Cleber/MEUS%20ARQUIVOS/IA/App/simp-app/src/app/api/chat/route.ts): Entry point for the AI assistant functionality.

## Public API

| Symbol | Type | Location |
| --- | --- | --- |
| `Tutorial` | Interface | `src/data/tutorials.ts` |
| `getTutorialBySlug` | Function | `src/data/tutorials.ts` |
| `useFavorites` | Hook | `src/hooks/useFavorites.ts` |
| `SignInButton` | Component | `src/components/AuthButtons.tsx` |

## Internal System Boundaries

The main boundary exists between the **Presentation Layer** (React components) and the **Data Layer** (static TypeScript files). The presentation layer consumes data through utility functions, ensuring that the UI remains decoupled from the specific data structure of tutorials.

## External Service Dependencies

- **Google Gemini API**: Used via the Vercel AI SDK for the "Tutor Simple" AI assistant.
- **NextAuth.js**: Handles authentication with external providers (configured in `api/auth`).
- **Vercel AI SDK**: Provides the infrastructure for streaming AI responses.

## Key Decisions & Trade-offs

- **Static Data over Database**: For the initial version, tutorials are stored as TypeScript objects. This simplifies deployment and ensures fast load times, though it requires code changes to update content.
- **Client-Side Search**: Search functionality is implemented on the client side using the tutorial dataset, which is efficient given the current scale of the application.

## Top Directories Snapshot

- `src/app/`: 10+ files (Routes and layouts)
- `src/components/`: 15+ files (UI components)
- `src/data/`: 1 file (Core content repository)
- `src/hooks/`: 1+ files (Custom logic)

## Related Resources

- [Project Overview](./project-overview.md)
- [Development Workflow](./development-workflow.md)
- [Glossary](./glossary.md)
