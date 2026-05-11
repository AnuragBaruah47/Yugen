import { Client, OAuthProvider, Account } from "appwrite";

const client = new Client()
  .setEndpoint(import.meta.env.VITE_APPWRITE_URL)
  .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);

const account = new Account(client);

export const createGoogleLogin = async () => {
  try {
    await account.createOAuth2Session(
      "google",
      "http://localhost:5173",
      "http://localhost:5173/login",
    );
  } catch (error) {
    throw new Error("Login Failed");
  }
};
