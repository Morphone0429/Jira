import React, { ReactNode, useState } from 'react';
import * as auth from 'auth-provider';
import { User } from 'screens/project-list/search-panel';
import { http } from 'utils/http';
import { useMount } from 'utils';
import { useAsync } from 'utils/use-async';
import { FullPageErrorFallback, FullPageLoading } from 'components/lib';
interface AuthForm {
  username: string;
  password: string;
}

const bootstapUser = async () => {
  let user = null;
  const token = auth.getToken(); //有token时
  if (token) {
    const data = await http('me', { token });
    user = data.user;
  }
  return user;
};

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
  // const [user, setUser] = useState<User | null>(null);
  const {
    data: user,
    error,
    isLoading,
    isIdle,
    isError,
    run,
    setData: setUser,
  } = useAsync<User | null>();

  const login = (form: AuthForm) => auth.login(form).then(setUser); // point free  消参  setUser ===  user => setUser(user)
  const register = (form: AuthForm) =>
    auth.register(form).then((user) => setUser(user));
  const logout = () => auth.logout().then(() => setUser(null));

  useMount(() => {
    // 当页面加载是 ,调用bootstapUser
    // bootstapUser().then(setUser);
    run(bootstapUser());
  });
  // 加载或初始时 返回
  if (isLoading || isIdle) {
    return <FullPageLoading></FullPageLoading>;
  }
  // 返回失败
  if (isError) {
    return (
      <FullPageErrorFallback error={error as Error}></FullPageErrorFallback>
    );
  }
  return (
    <AuthContext.Provider
      children={children}
      value={{ user, login, register, logout }}
    ></AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth必须在authProvider中使用');
  }
  return context;
};

export { AuthProVider, useAuth };
