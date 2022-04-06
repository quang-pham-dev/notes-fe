import { createAsyncThunk } from '@reduxjs/toolkit';

import { toast } from 'react-toastify';

import { authService } from 'apis';
import { UserLogin, UserRegister } from 'models';
import {
  removeAllLocalStorage,
  setAccessTokenToLocalStorage,
  setRefreshTokenToLocalStorage,
  setUserToLocalStorage,
} from 'utils';

// Register user
export const registerAsync = createAsyncThunk(
  'auth/register',
  async (userData: UserRegister, thunkAPI) => {
    try {
      const response = await authService.registerApi(userData);

      if (response.data) {
        toast.success('Register success Please confirm your email');
        const { user } = response.data.data;
        setUserToLocalStorage(user);
      }
      return response.data;
    } catch (error: unknown | any) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      toast.error(message);
      return thunkAPI.rejectWithValue(message);
    }
  },
);

// Login user
export const loginAsync = createAsyncThunk('auth/login', async (userData: UserLogin, thunkAPI) => {
  try {
    const response = await authService.loginApi(userData);
    if (response.data) {
      toast.success('Welcome to Note Tracker');
      const { accessToken, refreshToken, user } = response.data.data;
      setAccessTokenToLocalStorage(accessToken);
      setRefreshTokenToLocalStorage(refreshToken);
      setUserToLocalStorage(user);
    }

    return response.data;
  } catch (error: any) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
    return thunkAPI.rejectWithValue(message);
  }
});

export const logoutAsync = createAsyncThunk('auth/logout', async () => {
  try {
    const response = await authService.logoutApi();
    if (response.data.data.status === 200) {
      toast.success('Logout successfully');
      removeAllLocalStorage();
    }
    return response.data;
  } catch (error: any) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    removeAllLocalStorage();
    toast.error(message);
  }
});

export const confirmEmailAsync = createAsyncThunk(
  'auth/confirmEmail',
  async (token: any, thunkAPI) => {
    try {
      const response = await authService.confirmEmailApi(token);
      if (response.data.data.status === 200) {
        toast.success('Confirm successfully');
      }
      return response.data;
    } catch (error: any) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      toast.error(message);
      return thunkAPI.rejectWithValue(message);
    }
  },
);
