import { ReactNode } from 'react';
import { AuthProVider } from './auth-context';

export const AppProviders = ({ children }: { children: ReactNode }) => {
  return <AuthProVider>{children}</AuthProVider>;
};
