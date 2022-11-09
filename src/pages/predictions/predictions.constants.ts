import { Tab } from "components";
import { View } from "./predictions.types";

export const predictionsTabs: Tab<View>[] = [
  {
    view: "all",
    label: "Wszystkie mecze do typowania",
  },
  {
    view: "your-predictions",
    label: "Wszystkie twoje typy",
  },
  {
    view: "your-predictions-current-round",
    label: "Wszystkie twoje typy w aktualnej rundzie",
  },
];
