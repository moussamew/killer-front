import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createContext } from 'react';

interface Props {
  children: JSX.Element;
}

export const context = createContext<QueryClient | undefined>(undefined);
export const queryClient = new QueryClient();

export function WebServicesProvider({ children }: Props): JSX.Element {
  return (
    <QueryClientProvider client={queryClient} context={context}>
      {children}
    </QueryClientProvider>
  );
}
