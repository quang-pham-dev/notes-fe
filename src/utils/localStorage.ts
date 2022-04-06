import { UserResponse } from 'models';

/**
 * @feature Local Storage
 * @module util.storage
 * @author William Pham
 */

export const get = (key: string) => localStorage.getItem(key);

export const set = (key: string, data: string) => localStorage.setItem(key, data);

export const remove = (key: string) => localStorage.removeItem(key);

export const setJSON = (key: string, data: any) => set(key, JSON.stringify(data));

export const getJSON = <T = any>(key: string): T | null => {
  const data = get(key);
  return typeof data === 'string' ? JSON.parse(data) : null;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { get, set, remove, setJSON, getJSON };

export const setAccessTokenToLocalStorage = (accessToken?: string | null) => {
  if (accessToken) {
    localStorage.setItem('access-token', accessToken);
  } else {
    removeAllLocalStorage();
  }
};

export const setRefreshTokenToLocalStorage = (refreshToken?: string | null) => {
  if (refreshToken) {
    localStorage.setItem('refresh-token', refreshToken);
  } else {
    removeAllLocalStorage();
  }
};

export const setUserToLocalStorage = (user?: UserResponse | null) => {
  if (user) {
    localStorage.setItem('user', JSON.stringify(user));
  } else {
    removeAllLocalStorage();
  }
};

export const removeAllLocalStorage = () => {
  localStorage.removeItem('user');
  localStorage.removeItem('access-token');
  localStorage.removeItem('refresh-token');
};

export const getAccessToken = () => {
  return localStorage.getItem('access-token');
};

export const getRefreshToken = () => {
  return localStorage.getItem('refresh-token');
};
