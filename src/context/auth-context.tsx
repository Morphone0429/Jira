import React, { ReactNode, useCallback } from 'react';
import * as auth from 'auth-provider';
import { User } from 'screens/project-list/search-panel';
import { http } from 'utils/http';
import { useMount } from 'utils';
import { useAsync } from 'utils/use-async';
import { FullPageErrorFallback, FullPageLoading } from 'components/lib';
import { useDispatch, useSelector } from 'react-redux';
import { bootstrap, selectUser } from 'store/auth.slice';
import * as authStore from 'store/auth.slice';
export interface AuthForm {
  username: string;
  password: string;
}

export const bootstapUser = async () => {
  let user = null;
  const token = auth.getToken(); //有token时
  if (token) {
    const data = await http('me', { token });
    user = data.user;
  }
  return user;
};

export const AuthProVider = ({ children }: { children: ReactNode }) => {
  const { error, isLoading, isIdle, isError, run } = useAsync<User | null>();
  // @ts-ignore
  const dispatch: (...args: unknown[]) => Promise<User> = useDispatch();

  useMount(() => {
    run(dispatch(bootstrap()));
  });
  // 加载或初始时 返回
  if (isLoading || isIdle) {
    return <FullPageLoading></FullPageLoading>;
  }
  // 返回失败
  if (isError) {
    return <FullPageErrorFallback error={error as Error}></FullPageErrorFallback>;
  }
  return <div>{children}</div>;
};

export const useAuth = () => {
  // @ts-ignore
  const dispatch: (...args: unknown[]) => Promise<User> = useDispatch();
  const user = useSelector(selectUser);
  const login = useCallback((form: AuthForm) => dispatch(authStore.login(form)), [dispatch]);
  const register = useCallback(
    (form: AuthForm) => dispatch(authStore.register(form)),
    [dispatch]
  );
  const logout = useCallback(() => dispatch(authStore.logout()), [dispatch]);
  return {
    user,
    login,
    register,
    logout,
  };
};
