import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaClient } from "@/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Resend } from "resend";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });
const vercelURL = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : undefined;
const resend = new Resend(process.env.RESEND_API_KEY);

export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL ?? vercelURL,
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  user: {
    changeEmail: {
      enabled: true,
      sendChangeEmailConfirmation: async ({ user, newEmail, url }) => {
        await resend.emails.send({
          from: "noreply@mail.damirmedia.ru",
          to: user.email,
          subject: "Подтвердите ваш email",
          html: `Нажмите чтобы сменить email на ${newEmail}: ${url}`,
        });
      },
    },
  },
  emailVerification: {
    sendOnSignUp: false,
    autoSignInAfterVerification: true,
    sendVerificationEmail: async ({ user, url }) => {
      await resend.emails.send({
        from: "noreply@mail.damirmedia.ru",
        to: user.email,
        subject: "Подтвердите ваш email",
        html: `<a href="${url}">Подтвердить email</a>`,
      });
    },
  },
  emailAndPassword: {
    enabled: true,
    autoSignIn: true,
    sendResetPassword: async ({ user, url }) => {
      await resend.emails.send({
        from: "noreply@mail.damirmedia.ru",
        to: user.email,
        subject: "Сброс пароля",
        html: `<a href="${url}">Ссылка для сброса пароля</a>`,
      });
    },
    resetPasswordTokenExpiresIn: 3600,
  },
  secret: process.env.BETTER_AUTH_SECRET,
});
