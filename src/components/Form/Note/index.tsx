import { createNoteAsync } from 'features/notes/notesThunkAPI';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

function NoteForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const dispatch = useDispatch();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (title.trim() !== '' && description.trim() !== '') {
      dispatch(createNoteAsync({ title, description }));
    }
  };

  return (
    <section className="form">
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <input
            type="text"
            name="title"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter note title"
            max={256}
            min={1}
            required
          />
          <textarea
            name="description"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter note description"
            minLength={1}
            maxLength={512}
            required
          ></textarea>
        </div>
        <div className="form-group">
          <button className="btn btn-block" type="submit">
            New Note
          </button>
        </div>
      </form>
    </section>
  );
}

export default NoteForm;
