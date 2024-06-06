import NextAuth from "next-auth"
import { FirestoreAdapter } from "@auth/firebase-adapter"
import { cert } from "firebase-admin/app"
import Google from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials";
import {signInWithEmailAndPassword} from 'firebase/auth';
import { firebaseAuth } from "./services/firebaseSDK";

export const { handlers, signIn, signOut,auth } = NextAuth({
    debug: true,
  providers: [Google,
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const userCredential = await signInWithEmailAndPassword(
            firebaseAuth,
            credentials.email,
            credentials.password
          );
          return userCredential.user;
        } catch (error) {
          console.error(error);
          throw new Error("Invalid credentials");
        }
      },
    }),
    ],
    adapter: FirestoreAdapter({
        credential: cert({
          projectId: process.env.AUTH_FIREBASE_PROJECT_ID,
          clientEmail: process.env.AUTH_FIREBASE_CLIENT_EMAIL,
          privateKey:  process.env.AUTH_FIREBASE_PRIVATE_KEY ? process.env.AUTH_FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n') : undefined,
        }),
    }),
    session: {
      strategy: "jwt", // Using JWT strategy for stateless sessions
    },
    callbacks: {
      async jwt({ token, user }) {
        if (user) {
          token.id = user.id;
        }
        return token;
      },
      async session({ session, token }) {
        session.user.id = token.id;
        return session;
      },
    },
  pages: {
      signIn:"/sign-in"
    }
})