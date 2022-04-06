import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from 'stores';
import { loginAsync, logoutAsync, registerAsync } from './authThunkAPI';
import { User, UserResponse } from 'models';

export interface AuthState {
  isAuthenticated: boolean;
  isFetching?: boolean;
  isSuccess: boolean;
  currentUser: User | null;
  isError: boolean;
  errorMessage: unknown | string;
}

const initialState: AuthState = {
  isAuthenticated: false,
  isFetching: false,
  isSuccess: false,
  currentUser: JSON.parse(localStorage?.getItem('user') as string) || null,
  isError: false,
  errorMessage: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // login(state, action: PayloadAction<LoginPayload>) {
    //   state.logging = true;
    // },
    // loginSuccess(state, action: PayloadAction<User>) {
    //   state.isSuccess = true;
    //   state.logging = false;
    //   state.currentUser = action.payload;
    // },
    // loginFailed(state, action: PayloadAction<string>) {
    //   state.logging = false;
    // },
    // logout(state) {
    //   state.isSuccess = false;
    //   state.currentUser = undefined;
    // },
    clearState: (state) => {
      state.isAuthenticated = false;
      state.isFetching = false;
      state.isSuccess = false;
      state.isError = false;
      state.errorMessage = '';

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
      });
  },
});

// Actions
export const { clearState } = authSlice.actions;

export const selectAuth = (state: RootState) => state.auth;

// Reducer
const authReducer = authSlice.reducer;
export default authReducer;
