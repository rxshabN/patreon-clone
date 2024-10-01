import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import mongoose from "mongoose";
import User from "@/models/User";
import connectDb from "@/db/connectDb";

export const authoptions = NextAuth({
  providers: [
    // OAuth authentication providers...
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email }) {
      await connectDb(); // Ensure DB connection

      // Check which provider is being used
      const provider = account.provider;

      // Attempt to find the user in the database
      const currentUser = await User.findOne({ email: email });

      // If the user does not exist, create a new one
      if (!currentUser) {
        await User.create({
          email: user.email,
          username: user.email.split("@")[0], // Use part of email as username
        });
      }

      return true; // Proceed with sign-in
    },
    async session({ session, user, token }) {
      // Fetch the user from the database to enrich the session
      const dbUser = await User.findOne({ email: session.user.email });
      session.user.name = dbUser.username; // Set username in session
      return session; // Return the session
    },
  },
});

export { authoptions as GET, authoptions as POST };
