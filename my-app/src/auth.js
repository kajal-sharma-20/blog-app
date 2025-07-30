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
        const res = await fetch("https://blog-app-tqiy.onrender.com/api/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            emailOrphone: credentials.emailOrphone,  // Correct field name
            password: credentials.password,
          }),
        });

        const user = await res.json();
        console.log(user.user)
        
        if (res.ok && user) return user;
        return null;
      },
    }),
  ],
  secret:process.env.AUTH_SECRET,
  trustHost: true,
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.user.id|| user._id ||user.id;
        token.email = user.user.email || user.email;
        token.role = user.role;
        token.username = user.username;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.email=token.email;
      session.user.role=token.role;
      session.user.username = token.username;
      return session;
    },
  },
};

// Export handlers (used in route.js)
export const { handlers,signIn,signOut,auth} = NextAuth(authOptions);
