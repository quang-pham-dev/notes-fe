import React from 'react';

import { Link } from 'react-router-dom';

import './style.scss';

const Error404Page = () => {
  return (
    <section className="page_404">
      <h1>404</h1>
      <p>Oops! Something went wrong.</p>
      <Link className="button" to="/">
        Go back home.
      </Link>
    </section>
  );
};

export default Error404Page;
