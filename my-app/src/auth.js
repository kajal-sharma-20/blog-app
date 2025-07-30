import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

console.log("NEXTAUTH_URL:", process.env.NEXTAUTH_URL);
console.log("TRUST_HOST:", process.env.NEXTAUTH_TRUST_HOST);

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        emailOrphone: { label: "Email or Phone", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const res = await fetch("https://blog-app-yktq.onrender.com/api/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            emailOrphone: credentials.emailOrphone,
            password: credentials.password,
          }),
        });

        const data = await res.json();
        console.log("Login response:", data); // Debug the full response

        if (res.ok && data) {
          return {
            id: data.user.id,
            email: data.user.email,
            username: data.user.username,
            role: data.role,
          };
        }
        return null;
      },
    }),
  ],
  secret: process.env.AUTH_SECRET,
  trustHost: true,
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

export const { handlers, signIn, signOut, auth } = NextAuth(authOptions);
