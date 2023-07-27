import { useMemo } from "react";

import axios from "axios";
import { useQuery } from "react-query";

const getUser = async (url: string) => {
  const response = await axios.get(url);

  return response.data;
};

interface Dependencies {
  variables: {
    userID: number;
  };
}

const useGetUser = (deps: Dependencies) => {
  const { variables } = deps;

  const url = `https://dummyjson.com/users/${variables.userID}`;

  const { data, error, isLoading } = useQuery<any, Error>(
    ["user", url],
    () => getUser(url),
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

export default useGetUser;
export { useGetUser };
