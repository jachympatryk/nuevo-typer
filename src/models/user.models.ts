export type UserModel = {
  id: string;
  email: string | null;
  displayName: string;
  photoUrl: string | null;
  name?: string;
  surname?: string;
  points: number;
};
