export type UseFetchOptions = {
  dependencies?: unknown[];
  setTotalItems?: (size: number) => void;
  setLastItemId?: (id: string) => void;
};
