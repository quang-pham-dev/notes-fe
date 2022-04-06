import React from 'react';

// Libs
import { ToastContainer } from 'react-toastify';

// Components
import LoadingScreen from 'components/Loading/LoadingScreen';
import RoutesMain from './routers';
import { selectIsInitialized } from 'features/app/appSlice';
import { useAppSelector } from 'stores';

// Styles
import 'react-toastify/dist/ReactToastify.min.css';

function App() {
  const isLoading = useAppSelector(selectIsInitialized);

  return (
    <>
      {isLoading ? <LoadingScreen /> : <RoutesMain />}
      <ToastContainer
        style={{ fontSize: '14px' }}
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}

export default App;
