import React from 'react';
import { render } from 'react-dom';

// 3rd party
import { HelmetProvider } from 'react-helmet-async';
import { Provider as ReduxProvider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

// components
import App from './App';
import { store } from './stores';
import * as serviceWorker from './serviceWorker';

// styles
import './styles/index.scss';

render(
  <React.StrictMode>
    <HelmetProvider>
      <ReduxProvider store={store}>
        <Router>
          <App />
        </Router>
      </ReduxProvider>
    </HelmetProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
