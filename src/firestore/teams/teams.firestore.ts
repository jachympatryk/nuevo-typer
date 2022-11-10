import { doc, getDocs, query, setDoc, where } from "firebase/firestore";

import { Group, TeamModel } from "models";
import { firestoreCollections, getCollectionRef } from "config/firebase.config";

export const getTeamsFromGroup = (group: Group) => {
  const teamsRef = getCollectionRef<TeamModel[]>(firestoreCollections.teams);
  const teamsQuery = query(teamsRef, where("group", "==", group));

  return getDocs(teamsQuery);
};

export const createTeam = (team: TeamModel) => {
  const teamsRef = getCollectionRef<TeamModel>(firestoreCollections.teams);

  const predictionDocument = doc(teamsRef, team.id);

  return setDoc(predictionDocument, team);
};
