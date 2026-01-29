import { QueryCache, QueryClient } from "@tanstack/react-query";
import { useToast } from "../store/useToast";

const addToast = useToast((s) => s.addToast);

export const createQueryClient = () =>
  new QueryClient({
    queryCache: new QueryCache({
      onError: (error, query) => {
        if (query.state.data !== undefined) {
          addToast({
            title: "Something went wrong",
            description: "Failed to fetch data. Please try again.",
            type: "error",
          });
        }
      },
    }),
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 10,
        retry: 1,
        refetchOnWindowFocus: false,
        refetchOnMount: true,
        refetchOnReconnect: true,
      },
      mutations: {
        retry: 0,
      },
    },
  });
