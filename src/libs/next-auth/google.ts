import Google from "next-auth/providers/google";

export const googleProvider = Google({
  id: "google",
  clientId: process.env.GOOGLE_CLIENT_ID as string,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
});
