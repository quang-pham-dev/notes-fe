export interface createNote {
  title: string;
  description: string;
}

export interface Note {
  user: string;
  id: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
}

export interface NoteResponseDelete {
  data: Note;
}

export interface NotesResponse {
  data: DataNotesResponse;
}

export interface NoteResponse {
  data: DataNoteResponse;
}

export interface DataNoteResponse {
  note: Note;
}

export interface DataNotesResponse {
  notes: Note[];
}
