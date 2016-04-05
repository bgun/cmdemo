'use strict';

import 'babel-polyfill';
import 'isomorphic-fetch';

import React           from 'react';
import ReactDOM        from 'react-dom';
import { Provider }    from 'react-redux';

import { createStore, applyMiddleware } from 'redux';
import promiseMiddleware from 'redux-promise';


import reducers from './reducers';
let store = createStore(
  reducers,
  {}, // initialStore
  applyMiddleware(promiseMiddleware)
);


import App from './containers/App';

let googleMaps;

let render = () => {
  ReactDOM.render(
    <Provider store={ store }>
      <App googleMaps={ googleMaps } />
    </Provider>,
    document.getElementById('root')
  );
};

// global hook for Google Maps async
global.initMap = () => {
  googleMaps = google.maps;
  render();
};

render();

