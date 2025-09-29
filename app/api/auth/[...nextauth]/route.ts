import NextAuth, { type SessionStrategy } from "next-auth";
import type { User, Session } from "next-auth";
import type { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import { PasswordUtils } from '@/libs/utils/passwordUtils';



const prisma = new PrismaClient();

export const authOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                mail: { label: "Email", type: "email", placeholder: "user@example.com" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                if (!credentials?.mail || !credentials?.password) {
                    throw new Error("Invalid Credentials");
                }
                //Fetch data from user table//ユーザーテーブルからデータを取得する
                const user = await prisma.user.findFirst({
                    where: { mail: credentials.mail }
                });

                if (!user) throw new Error("No user found");

                // const isPasswordValid = await bcrypt.compare(credentials.password, user.password);
                const isPasswordValid = await PasswordUtils.validatePassword(credentials.password, user.password);
                if (!isPasswordValid) throw new Error("Invalid password");

                return {
                    id: user.id,
                    customer_id: user.customer_id,
                    customer_name: '',
                    mail: user.mail,
                    last_name: user.last_name,
                    first_name: user.first_name,
                    role: "user",
                    is_ledger: user.is_ledger,
                    is_salary: user.is_salary,
                    is_report: user.is_report,
                    is_sales: user.is_sales,
                    is_systems: user.is_systems,
                    certification_period: user.certification_period,
                    m_datetime: user.m_datetime,
                } as User;
            }
        })
    ],
    session: {
        strategy: "jwt" as SessionStrategy,  //For storing Session data into Browser Cookie
        maxAge: 24 * 60 * 60,
    },
    callbacks: {
        async jwt({ token, user }: any): Promise<JWT> {
            if (user) {
                token.sub = user.id;
                token.mail = user.mail;
                token.first_name = user.first_name;
                token.last_name = user.last_name;
            }
            return token;
        },
        async session({ session, token }: { session: Session; token: JWT; }): Promise<Session> {
            if (session.user) {
                session.user.id = token.sub;
                session.user.mail = token.mail;
                session.user.first_name = token.first_name;
                session.user.last_name = token.last_name;
            }
            return session;
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };