import { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux';
import { store } from 'store';
import { AuthProVider } from './auth-context';

export const AppProviders = ({ children }: { children: ReactNode }) => {
  return (
    <Provider store={store}>
      <QueryClientProvider client={new QueryClient()}>
        <AuthProVider>{children}</AuthProVider>
      </QueryClientProvider>
    </Provider>
  );
};
