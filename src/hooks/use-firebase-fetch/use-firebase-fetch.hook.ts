import { useState } from "react";
import { QuerySnapshot, DocumentSnapshot } from "firebase/firestore";
import { useDidUpdate } from "@better-typed/react-lifecycle-hooks";

import { UseFetchOptions } from "./use-firebase-fetch.types";

export const useFirebaseFetch = <T>(
  fetcher: () => Promise<DocumentSnapshot<T> | QuerySnapshot<T> | null>,
  options?: UseFetchOptions<T>,
) => {
  const [fetched, setFetched] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [data, setData] = useState<T | null>(null);
  const [snapshot, setSnapshot] = useState<QuerySnapshot<T> | DocumentSnapshot<T> | null>(null);

  const handleFetch = () => {
    if (loading && fetched) return;
    if (options?.condition === false) return;

    setLoading(true);
    setError(null);
    fetcher()
      .then((document) => {
        if (document && "docs" in document) {
          const response =
            (document?.docs?.map((doc) => {
              return { id: doc.id, ...doc?.data?.() };
            }) as unknown as T) || null;

          options?.onSuccess?.(response);
          setData(response);
        } else {
          const response = document?.data?.() || null;
          options?.onSuccess?.(response);
          setData(response);
        }
        setSnapshot(document);
        setLoading(false);
        setFetched(true);
      })
      .catch((err) => {
        setError(err as Error);
        setLoading(false);
        setFetched(true);
      });
  };

  const handleReset = () => {
    setData(null);
  };

  useDidUpdate(
    () => {
      handleFetch();
    },
    options?.dependencies || [],
    true,
  );

  return {
    data,
    error,
    loading,
    snapshot,
    refresh: handleFetch,
    reset: handleReset,
  };
};
