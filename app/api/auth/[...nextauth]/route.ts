// src/app/api/auth/[...nextauth]/route.ts
import { authOptions } from "@/utils/auth";
import NextAuth from "next-auth";

export const GET = NextAuth(authOptions);
export const POST = NextAuth(authOptions);
