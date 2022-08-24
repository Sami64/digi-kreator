import { FirestoreAdapter } from "@next-auth/firebase-adapter"
import { NextApiRequest, NextApiResponse } from "next"
import type { NextAuthOptions } from "next-auth"
import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"

export const authOptions: NextAuthOptions = {
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_ID as string,
			clientSecret: process.env.GOOGLE_SECRET as string,
		}),
	],
	callbacks: {
		async session({ session, token, user }) {
			session.userId = user?.id
			//session?.user?.id = user?.id;
			return session
		},
		// async signIn({ user, account, profile, email, credentials }) {
		// 	console.log("After sign in")
		// 	console.log(user)
		// 	console.log(profile)
		// 	return true
		// },
	},
	secret: process.env.NEXTAUTH_SECRET,
	adapter: FirestoreAdapter({
		apiKey: process.env.FIREBASE_API_KEY,
		appId: process.env.FIREBASE_APP_ID,
		authDomain: process.env.FIREBASE_AUTH_DOMAIN,
		//databaseURL: process.env.FIREBASE_DATABASE_URL,
		projectId: process.env.FIREBASE_PROJECT_ID,
		storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
		messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
	}),
}

export default (req: NextApiRequest, res: NextApiResponse) =>
	NextAuth(req, res, authOptions)
