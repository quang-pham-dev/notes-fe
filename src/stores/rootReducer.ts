import { combineReducers } from '@reduxjs/toolkit';
import authReducer from 'features/auth/authSlice';
import appReducer from 'features/app/appSlice';
import notesReducer from 'features/notes/notesSlice';

const rootReducer = combineReducers({
  app: appReducer,
  auth: authReducer,
  notes: notesReducer,
});

export { rootReducer };
