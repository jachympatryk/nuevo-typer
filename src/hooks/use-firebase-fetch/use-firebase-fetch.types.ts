export type UseFetchOptions<T> = {
  dependencies?: unknown[];
  onSuccess?: (data: T | null) => void;
  condition?: boolean;
};
