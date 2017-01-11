/* eslint-disable import/default */

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import routes from './routes';
import configureStore from './store/configureStore';

import './favicon.ico';
import './assets/images/emojione.sprites.png';
import './assets/styles/emojione.sprites.scss';
import './assets/styles/styles.scss';
import './assets/styles/emoji-picker.scss';

import { syncHistoryWithStore } from 'react-router-redux';

import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

const store = configureStore();

// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(browserHistory, store);

render(
  <Provider store={store}>
    <Router history={history} routes={routes} />
  </Provider>, document.getElementById('app')
);
