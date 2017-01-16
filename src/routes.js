import React from 'react';
import { Route } from 'react-router';

import App from './components/App';
import NotFoundPage from './components/NotFoundPage.js';

// Currently, routing is not really in use
export default (
  <Route path="/" component={App}>
    <Route path="*" component={NotFoundPage} />
  </Route>
);
