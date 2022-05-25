import { apiUrl } from 'screens/login';
import { User } from 'screens/project-list/search-panel';

const localStorageKey = '__auth_provider_token__';
const getToken = () => window.localStorage.getItem(localStorageKey);
const handleUserResponse = ({ user }: { user: User }) => {
  window.localStorage.setItem(localStorageKey, user.token || '');
  return user;
};
const login = (data: { username: string; password: string }) => {
  fetch(`${apiUrl}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }).then(async res => {
    if (res.ok) {
      return handleUserResponse(await res.json());
    }
  });
};

const register = (data: { username: string; password: string }) => {
  fetch(`${apiUrl}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }).then(async res => {
    if (res.ok) {
      return handleUserResponse(await res.json());
    }
  });
};

const logout = () => window.localStorage.removeItem(localStorageKey);

export { localStorageKey, getToken, handleUserResponse, login, register, logout };
