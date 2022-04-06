import { createAsyncThunk } from '@reduxjs/toolkit';

import { toast } from 'react-toastify';

import { noteService } from 'apis';
import { createNote } from 'models';

export const createNoteAsync = createAsyncThunk(
  'notes/create',
  async (noteData: createNote, thunkAPI) => {
    try {
      const response = await noteService.createNoteApi(noteData);
      if (response.data.data.note) toast.success('The Note created successfully');
      return response.data;
    } catch (error: unknown | any) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  },
);

export const fetchNoteAsync = createAsyncThunk('notes/fetchAll', async (_, thunkAPI) => {
  try {
    const response = await noteService.fetchNotesApi();
    return response.data;
  } catch (error: unknown | any) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const deleteNoteAsync = createAsyncThunk(
  'notes/delete',
  async (noteId: string, thunkAPI) => {
    try {
      const response = await noteService.deleteNotesApi(noteId);
      if (response.data.data) {
        toast.success('Delete Note successfully');
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
