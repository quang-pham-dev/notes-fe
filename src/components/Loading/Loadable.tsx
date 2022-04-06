import React, { Suspense } from 'react';
import LoadingScreen from './LoadingScreen';

/* eslint-disable react/display-name */
export const Loadable = (Component: React.FC) => (props: JSX.IntrinsicAttributes) => {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <Component {...props} />
    </Suspense>
  );
};
