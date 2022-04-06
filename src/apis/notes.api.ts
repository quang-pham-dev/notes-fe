import { NOTES_ENDPOINTS } from 'configs';
import { createNote } from 'models';
import { axiosInstance } from './axios.interceptor';

const createNoteApi = (noteData: createNote) => {
  const endPointCreateNote = `${NOTES_ENDPOINTS}`;
  return axiosInstance.post(endPointCreateNote, noteData);
};

const fetchNotesApi = () => {
  const endPointGetNotes = `${NOTES_ENDPOINTS}`;
  return axiosInstance.get(endPointGetNotes);
};

const deleteNotesApi = (noteId: string) => {
  const endPointGetNotes = `${NOTES_ENDPOINTS}`;
  return axiosInstance.delete(`${endPointGetNotes}/${noteId}`);
};

export const noteService = {
  createNoteApi,
  fetchNotesApi,
  deleteNotesApi,
};
