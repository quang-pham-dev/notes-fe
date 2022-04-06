import {
  getAccessToken,
  getRefreshToken,
  setAccessTokenToLocalStorage,
} from './../utils/localStorage';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { AUTH_ENDPOINTS, LOGIN, LOGOUT, REGISTER } from 'configs';

export const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL_PROD,
  withCredentials: true,
  timeout: 30000,
});

axiosInstance.interceptors.request.use(
  async (config: AxiosRequestConfig) => {
    // Do something before request is sent
    const accessToken = getAccessToken();
    if (accessToken) {
      const masterHeaders = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      };
      config.headers = { ...masterHeaders };
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    const data = response.data;
    if (data.errors && data.errors.length === 0) {
      // In Case: error when empty List.
      delete data.errors;
    }
    return Promise.resolve(response);
  },
  async (error) => {
    const originalRequest = error.config;
    const httpStatus = error.response?.status;

    if (!httpStatus || httpStatus === 500) {
      // Internal Server
    }
    if (
      originalRequest.url !== `${AUTH_ENDPOINTS}/${LOGIN}` &&
      originalRequest.url !== `${AUTH_ENDPOINTS}/${REGISTER}` &&
      originalRequest.url !== `${AUTH_ENDPOINTS}/${LOGOUT}` &&
      error.response
    ) {
      if (httpStatus === 401 && !originalRequest._retry) {
        // not yet login, redirect to login
        // handle access token expired
        originalRequest._retry = true;
        try {
          const refreshToken = getRefreshToken();
          const config = {
            headers: {
              Authorization: `Bearer ${refreshToken}`,
            },
          };
          axios.defaults.headers.common.Authorization = config.headers.Authorization;
          const result = await axios.post(`${process.env.REACT_APP_BASE_URL_PROD}auth/renewal`);
          const { accessToken } = result.data.data;
          // accessToken alway expire time to short than accessToken
          // when accessToken expired, we send refreshToken to server verify and server will be return new accessToken and refreshToken
          setAccessTokenToLocalStorage(accessToken);
          axios.defaults.headers.common.Authorization = accessToken;
          return await axiosInstance(error.config);
        } catch (error: unknown | any) {
          const message =
            (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString();
          return Promise.reject(message);
        }
      }
    }
    if (httpStatus === 400) {
      // error when bad request
    }

    return Promise.reject((error.response && error.response.data) || 'Something went wrong');
  },
);
