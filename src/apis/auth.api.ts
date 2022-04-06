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

// confirm email
const confirmEmailApi = (tokenConfirm: any) => {
  const endPointConfirmEmail = `${AUTH_ENDPOINTS}/confirm`;
  return axiosInstance.post(endPointConfirmEmail, tokenConfirm);
};

export const authService = {
  registerApi,
  logoutApi,
  loginApi,
  confirmEmailApi,
};
