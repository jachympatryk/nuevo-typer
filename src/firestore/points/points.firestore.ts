import { getDocs, query, where } from "firebase/firestore";

import { PointsModel } from "models";
import { firestoreCollections, getCollectionRef } from "config/firebase.config";

export const getUserPoints = (userId: string) => {
  const pointsRef = getCollectionRef<PointsModel[]>(firestoreCollections.points);
  const pointsDocument = query(pointsRef, where("userId", "==", userId));

  return getDocs(pointsDocument);
};
