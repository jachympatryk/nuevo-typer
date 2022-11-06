import { Round } from "models";

const endDate = {
  firstRound: "2022-11-24T21:00:00+0100",
  secondRound: "2022-11-28T22:59:00+0100",
  thirdRound: "2022-12-02T22:59:00+0100",
  oneOfEight: "2022-12-06T22:59:00+0100",
  quarterFinals: "2022-12-10T22:59:00+0100",
  semiFinals: "2022-12-14T22:59:00+0100",
  thirdPlace: "2022-12-17T20:00:00+0100",
  final: "2022-12-18T20:00:00+0100",
};

export const getCurrentRound = (currentDate: Date): Round => {
  const currentTime = currentDate.getTime();

  if (currentTime <= new Date(endDate.firstRound).getTime()) return "Faza grupowa - mecz 1";
  if (currentTime <= new Date(endDate.secondRound).getTime()) return "Faza grupowa - mecz 2";
  if (currentTime <= new Date(endDate.thirdRound).getTime()) return "Faza grupowa - mecz 3";
  if (currentTime <= new Date(endDate.oneOfEight).getTime()) return "1/8 finału";
  if (currentTime <= new Date(endDate.quarterFinals).getTime()) return "Ćwierćfinał";
  if (currentTime <= new Date(endDate.semiFinals).getTime()) return "Półfinał";
  if (currentTime <= new Date(endDate.thirdPlace).getTime()) return "Mecz o 3 miejsce";
  if (currentTime <= new Date(endDate.final).getTime()) return "Finał";

  return "Faza grupowa - mecz 2";
};
