'use strict';

import 'babel-polyfill';
import 'isomorphic-fetch';

import React           from 'react';
import ReactDOM        from 'react-dom';
import { Provider }    from 'react-redux';
import { createStore } from 'redux';
import promiseMiddleware from 'redux-promise';

import reducers from './reducers';
let store = createStore(
  reducers,
  {},
  applyMiddleware(
    promiseMiddleware
  )
);

import App from './App';

let googleMaps;

let render = () => {
  ReactDOM.render(
    <Provider store={ store }>
      <App googleMaps={ googleMaps } />
    </Provider>,
    document.getElementById('root')
  );
};

global.initMap = () => {
  googleMaps = google.maps;
  render();
};
render();

