import { doc, getDocs, query, setDoc } from "firebase/firestore";

import { UserModel } from "models";
import { firestoreCollections, getCollectionRef } from "config/firebase.config";

export const getAllUsers = () => {
  const usersRef = getCollectionRef<UserModel[]>(firestoreCollections.users);
  const userQuery = query(usersRef);

  return getDocs(userQuery);
};

export const createUser = (user: UserModel) => {
  const usersRef = getCollectionRef<UserModel>(firestoreCollections.users);
  const userDocument = doc(usersRef, user.id);

  return setDoc(userDocument, user);
};
