import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    role: string;
    companyId?: string;
  }
  interface Session {
    user: User & {
      id: string;
    };
  }
}