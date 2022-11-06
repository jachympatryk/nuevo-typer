export type UserDetailsModel = {
  age: number;
  height: number;
  weight: number;
};

export type UserModel = {
  id: string;
  email: string | null;
  displayName: string | null;
  photoUrl: string | null;
  name?: string;
  surname?: string;
  details: UserDetailsModel | null;
};
