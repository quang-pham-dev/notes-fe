import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Note, NoteResponse, NoteResponseDelete, NotesResponse } from 'models';

import { RootState } from 'stores';
import { createNoteAsync, deleteNoteAsync, fetchNoteAsync } from './notesThunkAPI';

export interface NotesState {
  notes: Note[];
  isSuccess: boolean;
  isError: boolean;
  isLoading: boolean;
  errorMessage: unknown | string;
}

const initialState: NotesState = {
  notes: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  errorMessage: '',
};

const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    clearState: (state) => {
      state.notes = [];
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.errorMessage = '';
      return state;
    },
  },
  extraReducers: (builder) => {
    builder
      // notes
      .addCase(createNoteAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createNoteAsync.fulfilled, (state, action: PayloadAction<NoteResponse>) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.notes.push(action.payload.data.note);
      })
      .addCase(createNoteAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload;
      })
      // fetchNote
      .addCase(fetchNoteAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchNoteAsync.fulfilled, (state, action: PayloadAction<NotesResponse>) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.notes = action.payload.data.notes;
      })
      .addCase(fetchNoteAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload;
      })
      //delete Note
      .addCase(deleteNoteAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteNoteAsync.fulfilled, (state, action: PayloadAction<NoteResponseDelete>) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.notes = state.notes.filter((note: any) => note.id !== action.payload.data.id);
      })
      .addCase(deleteNoteAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload;
      });
  },
});

// Actions
export const { clearState } = notesSlice.actions;

export const selectnotes = (state: RootState) => state.notes;

// Reducer
const notesReducer = notesSlice.reducer;
export default notesReducer;
