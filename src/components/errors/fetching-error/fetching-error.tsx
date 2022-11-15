import { memo } from "react";

import { FetchingErrorProps } from "./fetching-error.types";

import styles from "./fetching-error.module.scss";

export const FetchingError = memo(
  ({ title, subtitle, refreshText, refreshClick, size = "big", className = "" }: FetchingErrorProps) => {
    const mainTitle = title || "Wystąpił błąd podczas ładowania danych";
    const mainSubtitle = subtitle || "Spróbuj załadować stronę ponownie.";

    return (
      <div className={`${styles.container} ${styles[size]} ${className}`}>
        <h4 className={styles.title}>{mainTitle}</h4>
        <p className={styles.subtitle}>{mainSubtitle}</p>
        {refreshClick && (
          <button type="button" onClick={refreshClick}>
            {refreshText}
          </button>
        )}
      </div>
    );
  },
);
