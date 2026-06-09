import { createAuthClient } from "better-auth/react";

const getAuthBaseURL = () => {
  if (typeof window !== "undefined") {
    return window.location.origin;
  }
};

export const authClient = createAuthClient({
  baseURL: getAuthBaseURL(),
});
export const {
  signIn,
  signUp,
  signOut,
  useSession,
  changeEmail,
  changePassword,
  requestPasswordReset,
  resetPassword,
} = authClient;
