import { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { AuthProVider } from './auth-context';
import { BrowserRouter as Router } from 'react-router-dom';
export const AppProviders = ({ children }: { children: ReactNode }) => {
  return (
    <QueryClientProvider client={new QueryClient()}>
      <Router>
        <AuthProVider>{children}</AuthProVider>
      </Router>
    </QueryClientProvider>
  );
};
