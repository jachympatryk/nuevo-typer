import React from "react";
import { useDidMount, useDidUpdate } from "@better-typed/react-lifecycle-hooks";

import { useQueryParams } from "hooks";
import { PageTabsProps } from "./page-tabs.types";

import styles from "./page-tabs.module.scss";

export function PageTabs<View extends string>({ views, currentView, onViewChange }: PageTabsProps<View>) {
  const { query, updateQueryParams } = useQueryParams<{ view: View }>();

  const defaultView = views[0].view;

  useDidMount(() => {
    const foundView = views.find(({ view }) => view === query.view);
    if (query.view && foundView) {
      onViewChange(query.view);
    } else {
      updateQueryParams({ view: defaultView });
      onViewChange(defaultView);
    }
  });

  useDidUpdate(() => {
    if (query.view) {
      onViewChange(query.view);
    } else {
      onViewChange(defaultView);
    }
  }, [query]);

  const changeView = (viewName: View) => () => {
    updateQueryParams({ view: viewName });
    onViewChange(viewName);
  };

  return (
    <div className={styles.wrapper}>
      {views.map(({ view, label, permission }) => {
        const isSelected = currentView === view;

        if (permission === false) return null;

        return (
          <button
            type="button"
            key={view}
            onClick={changeView(view as View)}
            className={isSelected ? styles.activeButton : styles.button}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
