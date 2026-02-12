import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";
// Importe ton modèle User (adapte le chemin si nécessaire)
import User from "@/models/User"; 

// Fonction utilitaire pour connecter la DB si pas déjà fait
const connectDB = async () => {
  if (mongoose.connections[0].readyState) return;
  await mongoose.connect(process.env.MONGODB_URI!);
};

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        await connectDB();

        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email et mot de passe requis");
        }

        const user = await User.findOne({ email: credentials.email });

        if (!user) {
          throw new Error("Aucun utilisateur trouvé avec cet email");
        }

        const isPasswordCorrect = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isPasswordCorrect) {
          throw new Error("Mot de passe incorrect");
        }

        // On retourne l'objet user qui sera passé au JWT
        return {
          id: user._id.toString(),
          email: user.email,
          name: user.name,
          role: user.role,
          companyId: user.companyId?.toString(),
        };
      },
    }),
  ],
  callbacks: {
    // 1. Transférer les infos de l'utilisateur au Token
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.companyId = user.companyId;
      }
      return token;
    },
    // 2. Transférer les infos du Token à la Session (accessible côté client)
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role;
        session.user.companyId = token.companyId;
        session.user.id = token.sub;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login", // Ta page de login personnalisée
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };