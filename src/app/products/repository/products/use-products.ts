import { useMemo } from "react";

import axios from "axios";
import qs from "query-string";
import { useQuery } from "react-query";

import type {
  ProductsRoot,
  ProductsVariables,
} from "../../model/products/types";
import { normalizeProducts } from "./normalizer";

interface Dependencies {
  variables?: Partial<ProductsVariables>;
}

const getProducts = async (url: string) => {
  const response = await axios.get(url);

  return response.data;
};

const useGetProduct = (deps?: Dependencies) => {
  const { variables } = deps ?? {};

  const _variables = {
    limit: variables?.limit || 10,
    skip: variables?.skip || 0,
    ...(variables?.q && {
      q: variables?.q || "",
    }),
  };

  const categoryUrl = `https://dummyjson.com/products/category/${
    variables?.category
  }?${qs.stringify(_variables)}`;
  const defaultUrl = `https://dummyjson.com/products${
    _variables.q ? "/search" : "/"
  }?${qs.stringify(_variables)}`;

  const url = variables?.category ? categoryUrl : defaultUrl;

  const { data, error, isLoading } = useQuery<ProductsRoot, Error>(
    ["products", url],
    () => getProducts(url),
    { retry: false, keepPreviousData: true }
  );

  return useMemo(() => {
    const normalized = normalizeProducts(data);

    return {
      data: normalized,
      error: error,
      loading: isLoading,
    };
  }, [data, error, isLoading]);
};

export default useGetProduct;
export { useGetProduct };
