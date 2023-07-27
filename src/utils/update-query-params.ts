import type { ParsedUrlQuery } from "querystring";

const updateQueryParams = (
  params: URLSearchParams,
  updatedParams: Partial<ParsedUrlQuery>,
  deletedParams: string[] = []
): string => {
  // update query parameters
  Object.entries(updatedParams).forEach(([key, value]) => {
    if (value !== undefined) {
      params.set(key, value as string);
    }
  });

  // delete query parameters
  deletedParams.forEach((param) => {
    params.delete(param);
  });

  return params.toString();
};

export default updateQueryParams;
