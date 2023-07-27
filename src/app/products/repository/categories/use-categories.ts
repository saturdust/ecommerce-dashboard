import { useMemo } from "react";

import axios from "axios";
import { useQuery } from "react-query";

const getCategories = async (url: string) => {
  const response = await axios.get(url);

  return response.data;
};

const useGetCategories = () => {
  const url = "https://dummyjson.com/products/categories";

  const { data, error, isLoading } = useQuery<string[], Error>(
    ["products", url],
    () => getCategories(url),
    { retry: false, keepPreviousData: true }
  );

  return useMemo(() => {
    return {
      data: data || [],
      error: error,
      loading: isLoading,
    };
  }, [data, error, isLoading]);
};

export default useGetCategories;
export { useGetCategories };
