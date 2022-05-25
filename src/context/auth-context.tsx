import React, { ReactNode, useState } from 'react';
import * as auth from 'auth-provider';
import { User } from 'screens/project-list/search-panel';
interface AuthForm {
  username: string;
  password: string;
}

const AuthContext = React.createContext<
  | {
      user: User | null;
      register: (form: AuthForm) => Promise<void>;
      login: (form: AuthForm) => Promise<void>;
      logout: () => Promise<void>;
    }
  | undefined
>(undefined);
AuthContext.displayName = 'AuthContext';

const AuthProVider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const login = (form: AuthForm) => auth.login(form).then(setUser); // point free  消参
  const register = (form: AuthForm) => auth.register(form).then(user => setUser(user));
  const logout = () => auth.logout().then(() => setUser(null));
  return <AuthContext.Provider children={children} value={{ user, login, register, logout }}></AuthContext.Provider>;
};

const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth必须在authProvider中使用');
  }
  return context;
};

export { AuthProVider, useAuth };
