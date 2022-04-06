import { useDispatch } from 'react-redux';

import { GrClose } from 'react-icons/gr';

import { deleteNoteAsync } from 'features/notes/notesThunkAPI';
import { Note } from 'models';

function NoteItem({ note }: { note: Note }) {
  const dispatch = useDispatch();

  return (
    <div className="note">
      <h2>{note.title}</h2>
      <p>{note.description}</p>
      <div className="time-stamp">{new Date(note.createdAt).toLocaleString('en-US')}</div>
      <button onClick={() => dispatch(deleteNoteAsync(note.id))} className="close">
        <GrClose />
      </button>
    </div>
  );
}

export default NoteItem;
