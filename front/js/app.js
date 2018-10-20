import '@babel/polyfill';

import React from 'react';
import ReactDom from 'react-dom';

// Include the main scss file for webpack processing.
import '../css/app.scss';

import Home from './components/Home';
import getLogger from './util/logger';

const log = getLogger('App');

const init = () => {
  log.info('init() :: App starts booting...');

  ReactDom.render(<Home />, document.getElementById('app'));
};

init();
