import { useState } from "react";
import { useSearchParams, useLocation, useNavigate } from "react-router-dom";
import { useDidUpdate } from "@better-typed/react-lifecycle-hooks";
import queryString from "query-string";

import { Nullable, NullableKeys } from "types";

export type QueryParam = string | number | boolean | null | undefined;
export type QueryParams = Record<string, QueryParam | QueryParam[]>;

export type UseQueryParamsProps<Query> = { initialValues: Query };

const options = {
  arrayFormat: "comma",
  skipEmptyString: true,
} as queryString.ParseOptions;

export const useQueryParams = <Query extends QueryParams>(config?: UseQueryParamsProps<Query>) => {
  const navigate = useNavigate();
  const { initialValues } = config || {};

  const location = useLocation();
  const [, setSearchParams] = useSearchParams();

  const initialValue = (queryString.parse(location.search) || initialValues) as Query;

  const [query, setQuery] = useState<Query>(initialValue);

  useDidUpdate(() => {
    setQuery((prev) => ({ ...prev, ...queryString.parse(location.search) }));
  }, [location.search]);

  function setQueryParams(value: Query) {
    const stringifiedValue = queryString.stringify(value, options);

    navigate(`${location.pathname}?${stringifiedValue}`, { replace: true });
  }

  function setQueryParam<D extends keyof Query>(param: D, value: Nullable<Query[D]>) {
    const newQuery = { ...query };

    newQuery[param] = value as Query[D];

    const stringifiedValue = queryString.stringify(newQuery, options);

    setSearchParams(
      {
        search: stringifiedValue,
      },
      { replace: true },
    );
  }

  function updateQueryParams(values: Partial<Query>) {
    const newQuery = { ...query, ...values };

    const stringifiedValue = queryString.stringify(newQuery, options);
    navigate(`${location.pathname}?${stringifiedValue}`, { replace: true });
  }

  function stringify(queryParams: Query | QueryParams): string {
    const str = queryString.stringify(queryParams, options);
    const mark = str ? "?" : "";
    return mark + str;
  }

  return {
    query: query as NullableKeys<Query>,
    search: location.search,
    stringify,
    setQueryParams,
    setQueryParam,
    updateQueryParams,
  };
};
