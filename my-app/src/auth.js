import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        emailOrphone: { label: "Email or Phone", type: "text" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        try {
          const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              emailOrphone: credentials.emailOrphone,
              password: credentials.password,
            }),
          });

          const data = await res.json();
          console.log("Login Response:", data);

          // Throw error if response not OK
          if (!res.ok) {
            throw new Error(data.error || data.message || "Login failed");
          }

          // Return single user object for NextAuth
          return {
            id: data.user.id,
            email: data.user.email,
            username: data.user.username,
            phone: data.user.phone,
            role: data.role, // from backend response
          };
        } catch (err) {
          console.error("Authorize Error:", err.message);
          throw new Error("Login failed: " + err.message);
        }
      },
    }),
  ],

  secret: process.env.AUTH_SECRET,
  session: { strategy: "jwt" },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.role = user.role;
        token.username = user.username;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.email = token.email;
      session.user.role = token.role;
      session.user.username = token.username;
      return session;
    },
  },
};

// Export handlers (used in route.js)
export const { handlers, signIn, signOut, auth } = NextAuth(authOptions);
