export type UseFetchOptions<T> = {
  dependencies?: unknown[];
  onSuccess?: (data: T | null) => void;
  setTotalItems?: (size: number) => void;
  setLastItemId?: (id: string) => void;
};
