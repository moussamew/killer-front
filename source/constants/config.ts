import { type QueryClientConfig } from 'react-query';

export const QueryConfig: QueryClientConfig = {
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
      retryOnMount: false,
    },
    mutations: {
      retry: false,
    },
  },
};
