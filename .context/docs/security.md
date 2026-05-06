# Security & Compliance Notes

The "Simple" application follows industry standard security practices for modern web applications, ensuring that user data and external service integrations are protected.

## Security & Compliance Notes

The project prioritizes the protection of API credentials and user session data. As a primarily client-side educational tool, the security surface is focused on the API layer and the authentication flow.

## Authentication & Authorization

- **NextAuth.js**: We use NextAuth.js for handling user authentication. This provides a secure way to manage sessions without storing passwords directly in our database.
- **Identity Providers**: Supports integration with OAuth providers (e.g., Google) as configured in `src/app/api/auth/[...nextauth]`.
- **Session Strategy**: Uses JWT (JSON Web Tokens) or database sessions depending on the provider configuration, ensuring that user identity is verified for personalized features like "Favorites".

## Secrets & Sensitive Data

- **Environment Variables**: Sensitive data such as `GOOGLE_GENERINI_API_KEY` and `NEXTAUTH_SECRET` are stored in environment variables (`.env`).
- **Client-Side Safety**: We ensure that sensitive API keys are only accessed on the server (API Routes) and are never exposed to the client-side bundle.
- **Data Classification**: Tutorial data is considered public, while user favorites and profile information are considered private and are scoped to individual authenticated users.

## Compliance & Policies

- **GDPR/LGPD**: The application aims to comply with data protection regulations by only collecting necessary user information and providing mechanisms for users to manage their data.
- **Internal Policies**: All code must be reviewed for potential security leaks (e.g., logging sensitive data) before merging into `main`.

## Incident Response

- **Triage**: Security issues should be reported immediately and triaged by the core development team.
- **Escalation**: Critical vulnerabilities in dependencies (monitored via `npm audit`) are prioritized for immediate updates.

## Cross-References

- [Architecture Notes](./architecture.md)
