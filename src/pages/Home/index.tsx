import React, { useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

import { useAuth } from 'hooks';
import { useAppDispatch, useAppSelector } from 'stores';
import NoteForm from 'components/Form/Note';
import NoteItem from 'components/NoteItem';
import { fetchNoteAsync } from 'features/notes/notesThunkAPI';
import LoadingScreen from 'components/Loading/LoadingScreen';

const HomePage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { currentUser } = useAuth();
  const { notes, isLoading } = useAppSelector((state) => state.notes);
  useEffect(() => {
    if (currentUser) dispatch(fetchNoteAsync());
  }, [currentUser, navigate, dispatch]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <>
      <section className="heading">
        <h1>Welcome {currentUser && `${currentUser.firstName}`}</h1>
        <p>Notes Dashboard</p>
      </section>

      <NoteForm />

      <section className="content">
        {notes?.length > 0 ? (
          <div className="notes">
            {notes?.map((note) => (
              <NoteItem key={note?.id} note={note} />
            ))}
          </div>
        ) : (
          <h3>You have not set any notes</h3>
        )}
      </section>
    </>
  );
};

export default HomePage;
