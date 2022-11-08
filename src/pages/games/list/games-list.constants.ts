import { View } from "./games-list.types";
import { Tab } from "components";

export const gamesTabs: Tab<View>[] = [
  { view: "all", label: "Wszystkie mecze" },
  { view: "current-round", label: "Aktualna runda" },
];
