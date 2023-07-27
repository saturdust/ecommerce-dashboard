import { useMemo } from "react";

import axios from "axios";
import { useQuery } from "react-query";

import type { CartDetailsRoot } from "../../model/cart-details/types";

const getCarts = async (url: string) => {
  const response = await axios.get(url);

  return response.data;
};

interface Dependencies {
  variables: {
    cartID: number;
  };
}

const useGetCartDetails = (deps: Dependencies) => {
  const { variables } = deps;

  const url = `https://dummyjson.com/carts/${variables.cartID}`;

  const { data, error, isLoading } = useQuery<CartDetailsRoot, Error>(
    ["cart-details", url],
    () => getCarts(url),
    { retry: false, keepPreviousData: true }
  );

  return useMemo(() => {
    return {
      data: data,
      error: error,
      loading: isLoading,
    };
  }, [data, error, isLoading]);
};

export default useGetCartDetails;
export { useGetCartDetails };
