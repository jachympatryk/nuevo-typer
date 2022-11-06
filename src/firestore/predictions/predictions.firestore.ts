import { doc, getDocs, setDoc, query, where } from "firebase/firestore";

import { PredictionModel } from "models";
import { getCollectionRef, firestoreCollections } from "config/firebase.config";
import { CreatePredictionArguments } from "firestore/predictions/predictions.types";
import { getCurrentRound } from "utils/game-round.utils";

export const getDocumentId = (userId: string, gameId: string) => {
  return `${userId}_${gameId}`;
};

export const getAllPredictions = () => {
  const predictionsRef = getCollectionRef<PredictionModel[]>(firestoreCollections.predictions);
  const predictionQuery = query(predictionsRef);

  return getDocs(predictionQuery);
};

export const getCurrentRoundPredictions = () => {
  const currentRound = getCurrentRound(new Date());

  // get predictions of all users from current round - Group stage 1st / Group stage 2nd ...
  const predictionsRef = getCollectionRef<PredictionModel[]>(firestoreCollections.predictions);
  const predictionQuery = query(predictionsRef, where("round", "==", currentRound));

  return getDocs(predictionQuery);
};

export const getGamePredictions = (gameId: string) => {
  const predictionsRef = getCollectionRef<PredictionModel[]>(firestoreCollections.predictions);
  const predictionQuery = query(predictionsRef, where("gameId", "==", gameId));

  return getDocs(predictionQuery);
};

export const getUserPredictions = (userId: string) => {
  const predictionsRef = getCollectionRef<PredictionModel[]>(firestoreCollections.predictions);
  const predictionQuery = query(predictionsRef, where("userId", "==", userId));

  return getDocs(predictionQuery);
};

export const createPrediction = ({ userId, gameId, details }: CreatePredictionArguments) => {
  const predictionsRef = getCollectionRef<PredictionModel>(firestoreCollections.predictions);
  const id = getDocumentId(userId, gameId);

  const predictionDocument = doc(predictionsRef, id);
  const values: PredictionModel = { userId, gameId, ...details };

  return setDoc(predictionDocument, values);
};
