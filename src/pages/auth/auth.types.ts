import { AuthProvider } from "firebase/auth";

export type FirebaseErrorType = "auth/user-not-found" | "auth/wrong-password" | "auth/email-already-in-use";

export type Provider = "google";
export type ProviderObject = Record<Provider, AuthProvider>;

export type ProviderArguments = { authProvider: Provider };
