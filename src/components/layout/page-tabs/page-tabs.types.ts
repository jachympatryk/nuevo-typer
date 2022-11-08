import React from "react";

export interface Tab<View extends string> {
  view: View;
  label: string;
  permission?: boolean;
}

export interface PageTabsProps<View extends string> {
  views: Tab<View>[];
  currentView: View;
  onViewChange: (view: View) => void;
  children?: React.ReactNode;
}
