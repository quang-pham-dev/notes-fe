import React from 'react';

import Spinner from 'components/Spinner/Spinner';

import './style.scss';

const LoadingScreen = () => {
  return (
    <div className="page-loading">
      <div className="loading-content">
        <Spinner />
      </div>
    </div>
  );
};

export default LoadingScreen;
