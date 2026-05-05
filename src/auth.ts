import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isPrivateRoute = nextUrl.pathname.startsWith("/favoritos") || 
                            nextUrl.pathname.startsWith("/perfil");

      if (isPrivateRoute && !isLoggedIn) {
        return false; // Redirect to login
      }
      return true;
    },
  },
  session: {
    strategy: "jwt",
  },
});
