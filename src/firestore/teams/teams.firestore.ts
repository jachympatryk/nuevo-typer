import { doc, setDoc } from "firebase/firestore";

import { TeamModel } from "models";
import { firestoreCollections, getCollectionRef } from "config/firebase.config";

export const createTeam = (team: TeamModel) => {
  const teamsRef = getCollectionRef<TeamModel>(firestoreCollections.teams);

  const predictionDocument = doc(teamsRef, team.id);

  return setDoc(predictionDocument, team);
};
