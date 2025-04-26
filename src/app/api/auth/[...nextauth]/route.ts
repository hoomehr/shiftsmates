import NextAuth, { DefaultSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";
import LinkedInProvider from "next-auth/providers/linkedin";
import bcrypt from "bcrypt";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";

// Extend the User type to include id
declare module "next-auth" {
  interface User {
    id: string;
  }
  
  interface Session {
    user: {
      id: string;
    } & DefaultSession["user"];
  }
}

// Extend JWT to include id
declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
  }
}

const prisma = new PrismaClient();

const handler = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email
          }
        });

        if (!user || !user.password) {
          return null;
        }

        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isPasswordValid) {
          return null;
        }

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          image: user.image
        };
      }
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID || "",
      clientSecret: process.env.GITHUB_SECRET || ""
    }),
    LinkedInProvider({
      clientId: process.env.LINKEDIN_ID || "",
      clientSecret: process.env.LINKEDIN_SECRET || ""
    })
  ],
  session: {
    strategy: "jwt"
  },
  pages: {
    signIn: "/login",
    signOut: "/",
    error: "/login",
    newUser: "/register"
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
      }
      return session;
    }
  }
});

export { handler as GET, handler as POST };
