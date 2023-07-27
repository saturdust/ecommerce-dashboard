import { useMemo } from "react";

import axios from "axios";
import { useQuery } from "react-query";

import type { CartRoot } from "../../model/carts/types";
import { normalizeCarts } from "./normalizer";

const getCarts = async (url: string) => {
  const response = await axios.get(url);

  return response.data;
};

const useGetCarts = () => {
  const url = "https://dummyjson.com/carts";

  const { data, error, isLoading } = useQuery<CartRoot, Error>(
    ["carts", url],
    () => getCarts(url),
    { retry: false, keepPreviousData: true }
  );

  return useMemo(() => {
    const normalized = normalizeCarts(data);

    return {
      data: normalized,
      error: error,
      loading: isLoading,
    };
  }, [data, error, isLoading]);
};

export default useGetCarts;
export { useGetCarts };
