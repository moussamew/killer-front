import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createContext } from 'react';
import Toast from 'react-native-toast-message';

import { CustomErrorToast } from './utils/toast';

interface Props {
  children: JSX.Element;
}

export const context = createContext<QueryClient | undefined>(undefined);
export const queryClient = new QueryClient();

export function WebServicesProvider({ children }: Props): JSX.Element {
  return (
    <QueryClientProvider client={queryClient} context={context}>
      {children}
      <Toast
        config={{ error: CustomErrorToast }}
        topOffset={50}
        visibilityTime={2500}
      />
    </QueryClientProvider>
  );
}
