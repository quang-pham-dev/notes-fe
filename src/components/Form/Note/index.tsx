import { createNoteAsync } from 'features/notes/notesThunkAPI';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

function NoteForm() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
  });

  const dispatch = useDispatch();

  const { title, description } = formData;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (title.trim() !== '' && description.trim() !== '') {
      dispatch(createNoteAsync({ title, description }));
    }
    setFormData({ title: '', description: '' });
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
            onChange={onChange}
            placeholder="Enter note title"
            required
          />
          <input
            type="text"
            name="description"
            id="description"
            value={description}
            onChange={onChange}
            placeholder="Enter note description"
            required
          />
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
