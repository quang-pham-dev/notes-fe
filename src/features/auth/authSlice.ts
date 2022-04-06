import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from 'stores';
import { confirmEmailAsync, loginAsync, logoutAsync, registerAsync } from './authThunkAPI';
import { User, UserResponse } from 'models';

export interface AuthState {
  isAuthenticated: boolean;
  isFetching?: boolean;
  isSuccess: boolean;
  currentUser: User | null;
  isError: boolean;
  errorMessage: unknown | string;
  isConfirmed: boolean;
}

const initialState: AuthState = {
  isAuthenticated: false,
  isFetching: false,
  isSuccess: false,
  currentUser: JSON.parse(localStorage?.getItem('user') as string) || null,
  isError: false,
  errorMessage: '',
  isConfirmed: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearState: (state) => {
      state.isAuthenticated = false;
      state.isFetching = false;
      state.isSuccess = false;
      state.isError = false;
      state.errorMessage = '';
      state.isConfirmed = false;

      return state;
    },
  },
  extraReducers: (builder) => {
    builder
      // Register
      .addCase(registerAsync.pending, (state) => {
        state.isFetching = true;
      })
      .addCase(registerAsync.fulfilled, (state, action: PayloadAction<UserResponse>) => {
        state.isFetching = false;
        state.isSuccess = true;
      })
      .addCase(registerAsync.rejected, (state, action) => {
        state.isFetching = false;
        state.isError = true;
        state.errorMessage = action.payload;
        state.currentUser = null;
      })
      // Login
      .addCase(loginAsync.pending, (state) => {
        state.isAuthenticated = false;
        state.isFetching = true;
      })
      .addCase(loginAsync.fulfilled, (state, action: PayloadAction<UserResponse>) => {
        state.isAuthenticated = true;
        state.isFetching = false;
        state.isSuccess = true;
        state.currentUser = action.payload?.data?.user;
      })
      .addCase(loginAsync.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.isFetching = false;
        state.isError = true;
        state.errorMessage = action.payload;
        state.currentUser = null;
      })
      // Logout
      .addCase(logoutAsync.pending, (state) => {
        state.isFetching = true;
      })
      .addCase(logoutAsync.fulfilled, (state) => {
        state.isAuthenticated = false;
        state.currentUser = null;
      })
      .addCase(logoutAsync.rejected, (state, action) => {
        state.isFetching = false;
        state.isError = true;
        state.errorMessage = action.payload;
        state.currentUser = null;
      })
      // Confirm email
      .addCase(confirmEmailAsync.pending, (state) => {
        state.isFetching = true;
        state.isSuccess = false;
        state.isConfirmed = false;
      })
      .addCase(confirmEmailAsync.fulfilled, (state, action: PayloadAction<any>) => {
        state.isFetching = false;
        state.isSuccess = true;
        state.isConfirmed = true;
      })
      .addCase(confirmEmailAsync.rejected, (state, action) => {
        state.isFetching = false;
        state.isSuccess = false;
        state.isConfirmed = false;
        state.isError = true;
        state.errorMessage = action.payload;
      });
  },
});

// Actions
export const { clearState } = authSlice.actions;

export const selectAuth = (state: RootState) => state.auth;

// Reducer
const authReducer = authSlice.reducer;
export default authReducer;
