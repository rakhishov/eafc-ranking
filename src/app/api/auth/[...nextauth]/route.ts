import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

import bcrypt from 'bcrypt'
import { prisma } from "../../../../../prisma/client";

interface AuthUser {
    userLogin: string;
    password: string
}
export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {
                login: { label: "Login", type: "text", placeholder: "jsmith" },
                password: { label: "Password", type: "password" },
                avatar: {label: 'avatar', type: 'text'}
            },
            async authorize(credentials) {
                // check to see if email and password is there
                if(!credentials?.login || !credentials.password) {
                    throw new Error('Please enter an email and password')
                }

                // check to see if user exists
                const user = await prisma.auth.findUnique({
                    where: {
                        userLogin: credentials.login
                    },
                    select:{
                        userLogin: true,
                        password: true
                    }
                });

                const avatar = await prisma.user.findUnique({
                    where: {
                        login: credentials.login
                    },
                    select:{
                        avatarLink: true
                    },
                })

                const nt = Object.assign(user, avatar)
        
                if (credentials.login === user?.userLogin && credentials.password === user.password) {
                    return nt as any
                } else {
                    return null
                }
            },
            
        }),  
    ],
    callbacks: {
        async session({session, token}){
            session.user = token.user
            return session
        },
        async jwt({token, user}){
            if(user){
                token.user = user;
            }
            return token
        },
    },
    secret: process.env.SECRET,
    session: {
        strategy: "jwt",
    },
    debug: process.env.NODE_ENV === "development",
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST}