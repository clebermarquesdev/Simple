# Project Overview

"Simple" is an educational web application designed to help beginners and elderly users navigate digital services like PIX, WhatsApp, and government platforms. It provides clear, step-by-step tutorials with visual aids to demystify technology and empower users to achieve their goals independently.

> **Detailed Analysis**: For complete symbol counts, architecture layers, and dependency graphs, see [`codebase-map.json`](./codebase-map.json).

## Codebase Reference

This project is built using Next.js and TypeScript, ensuring a robust and maintainable codebase. It leverages modern web technologies to deliver a fast, responsive, and accessible user experience.

## Quick Facts

- **Root**: `c:/Users/user/Documents/Documentos Cleber/MEUS ARQUIVOS/IA/App/simp-app`
- **Languages**: TypeScript (Primary), CSS (Global and Component-level)
- **Entry**: `src/app/page.tsx`
- **Full analysis**: [`codebase-map.json`](./codebase-map.json)

## Entry Points

- [Main Dashboard](file:///c:/Users/user/Documents/Documentos%20Cleber/MEUS%20ARQUIVOS/IA/App/simp-app/src/app/page.tsx): The primary entry point for users, displaying categories and tutorials.
- [Tutorial Viewer](file:///c:/Users/user/Documents/Documentos%20Cleber/MEUS%20ARQUIVOS/IA/App/simp-app/src/app/tutorial/[slug]/page.tsx): The core learning experience for individual tutorials.
- [AI Assistant API](file:///c:/Users/user/Documents/Documentos%20Cleber/MEUS%20ARQUIVOS/IA/App/simp-app/src/app/api/chat/route.ts): Powers the interactive chat assistant.

## Key Exports

- **Data Models**: `Tutorial`, `Category`, `TutorialStep` (exported from `src/data/tutorials.ts`)
- **UI Components**: `TutorialCard`, `StepView`, `ChatModal`, `SearchBar`
- **Hooks**: `useFavorites`

## File Structure & Code Organization

- `src/app/`: Next.js App Router routes, layouts, and page components.
- `src/components/`: Reusable React components categorized by function (UI, Layout, etc.).
- `src/data/`: Static content repositories, primarily `tutorials.ts`.
- `src/hooks/`: Custom React hooks for shared logic.
- `public/`: Static assets such as images and icons.

## Technology Stack Summary

- **Runtime**: Node.js
- **Framework**: Next.js 15+ (App Router)
- **Language**: TypeScript
- **Styling**: Vanilla CSS / Tailwind CSS (depending on configuration)
- **AI**: Vercel AI SDK with Google Gemini
- **Auth**: NextAuth.js

## UI & Interaction Libraries

- **Lucide React**: For a consistent and accessible icon set.
- **Framer Motion**: (If used) for smooth transitions and animations.
- **Google Fonts**: "Inter" and "Outfit" for modern, readable typography.

## Getting Started Checklist

1. Install dependencies with `npm install`.
2. Configure environment variables in `.env` (API keys for Gemini).
3. Run the development server with `npm run dev`.
4. Open [http://localhost:3000](http://localhost:3000) to see the application in action.
5. Review the [Development Workflow](./development-workflow.md) for more details.

## Next Steps

Explore the [Architecture Notes](./architecture.md) for a deeper dive into the system design, or check the [Glossary](./glossary.md) to understand the domain-specific terminology used in this project.
