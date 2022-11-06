import { GoogleAuthProvider } from "firebase/auth";

import { FirebaseErrorType, ProviderObject } from "./auth.types";

export const FIREBASE_ERRORS: Record<FirebaseErrorType, string> = {
  "auth/user-not-found": "Użytkownik o takim adresie email nie istnieje",
  "auth/wrong-password": "Hasło jest nieprawidłowe",
  "auth/email-already-in-use": "Konto o podanym adresie email już istnieje",
};

export const providers: ProviderObject = {
  google: new GoogleAuthProvider(),
};
