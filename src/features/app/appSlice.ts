import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'stores/store';

export interface AppState {
  isLoading: boolean;
  isInitialized: boolean;
}

const initialState: AppState = {
  isLoading: false,
  isInitialized: false,
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isInitialized = true;
      state.isLoading = action.payload;
    },
  },
});

export const { setLoading } = appSlice.actions;

export const selectLoading = (state: RootState): boolean => state.app.isLoading;
export const selectIsInitialized = (state: RootState): boolean => state.app.isInitialized;

export default appSlice.reducer;
