import { AUTH_ENDPOINTS } from 'configs';
import { UserLogin, UserRegister } from 'models';
import { axiosInstance } from './axios.interceptor';

// Register user
const registerApi = (userData: UserRegister) => {
  const endPointRegister = `${AUTH_ENDPOINTS}/signUp`;
  return axiosInstance.post(endPointRegister, userData);
};

// Login user
const loginApi = (userData: UserLogin) => {
  const endPointLogin = `${AUTH_ENDPOINTS}/signIn`;
  return axiosInstance.post(endPointLogin, userData);
};

// Logout user
const logoutApi = () => {
  const endPointSignOut = `${AUTH_ENDPOINTS}/signOut`;
  return axiosInstance.post(endPointSignOut);
};

// refresh token user
const refreshTokenApi = () => {
  const endPointRefreshToken = `${AUTH_ENDPOINTS}/renewal`;
  return axiosInstance.post(endPointRefreshToken);
};

export const authService = {
  registerApi,
  logoutApi,
  loginApi,
  refreshTokenApi,
};
