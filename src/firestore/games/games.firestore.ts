import { doc, getDoc, getDocs, query, setDoc, where, orderBy } from "firebase/firestore";

import { GameModel } from "models";
import { getCollectionRef, firestoreCollections } from "config/firebase.config";
import { getCurrentRound } from "utils/game-round.utils";

export const getAllGames = () => {
  const gamesRef = getCollectionRef<GameModel[]>(firestoreCollections.games);
  const gamesQuery = query(gamesRef, orderBy("date"));

  return getDocs(gamesQuery);
};

export const getCurrentRoundGames = () => {
  const currentRound = getCurrentRound(new Date());

  const gamesRef = getCollectionRef<GameModel[]>(firestoreCollections.games);
  // todo: order by
  const gamesQuery = query(gamesRef, where("round", "==", currentRound));

  return getDocs(gamesQuery);
};

export const getSingleGame = (gameId: string) => {
  const gamesRef = getCollectionRef<GameModel>(firestoreCollections.games);
  const gameDocument = doc(gamesRef, gameId);

  return getDoc(gameDocument);
};

export const createGame = (id: string, team: Omit<GameModel, "id">) => {
  const gamesRef = getCollectionRef<GameModel>(firestoreCollections.games);

  const gameDocument = doc(gamesRef, id);

  return setDoc(gameDocument, team);
};
