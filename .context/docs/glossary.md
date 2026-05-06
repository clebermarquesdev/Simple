# Glossary & Domain Concepts

This document defines the core terminology and domain concepts used within the "Simple" application.

## Glossary & Domain Concepts

- **Tutorial**: A guided, step-by-step educational resource explaining how to use a specific digital service.
- **Step**: An individual part of a tutorial, containing text instructions and optionally an image or video demonstration.
- **Category**: A grouping of related tutorials (e.g., "Social Media", "Government Services", "Finance").
- **Tutor Simple**: The AI-powered chat assistant designed to answer user questions and provide context-aware help.
- **Slug**: A URL-friendly identifier for tutorials and categories (e.g., `whatsapp-seguranca`).
- **Favorite**: A tutorial that a user has bookmarked for quick access from their profile.

## Type Definitions

- [`TutorialStep`](file:///c:/Users/user/Documents/Documentos%20Cleber/MEUS%20ARQUIVOS/IA/App/simp-app/src/data/tutorials.ts#L1): Defines the structure of a single step in a tutorial.
- [`Tutorial`](file:///c:/Users/user/Documents/Documentos%20Cleber/MEUS%20ARQUIVOS/IA/App/simp-app/src/data/tutorials.ts#L8): Defines the main tutorial object, including metadata and steps.
- [`Category`](file:///c:/Users/user/Documents/Documentos%20Cleber/MEUS%20ARQUIVOS/IA/App/simp-app/src/data/tutorials.ts#L22): Defines the structure of a tutorial category.

## Core Terms

- **Accessibility (A11y)**: A core focus of the project, ensuring the UI is usable by people with varying levels of digital literacy and physical abilities.
- **Context-Aware Assistance**: The ability of the AI assistant to provide answers based on the specific tutorial or page the user is currently viewing.

## Personas / Actors

- **Digital Beginner**: Users who are new to smartphones or digital services and need high-level, patient guidance.
- **Elderly Users**: A primary audience that benefits from high-contrast UI, larger fonts, and simplified navigation.
- **Caregivers/Family**: Individuals helping others learn, who use the app as a tool for teaching.

## Domain Rules & Invariants

- Every tutorial must belong to at least one category.
- Tutorial slugs must be unique within the system.
- The AI assistant should always maintain a patient, helpful, and accessible tone.

## Cross-References

- [Project Overview](./project-overview.md)
