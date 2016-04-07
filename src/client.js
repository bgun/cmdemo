'use strict';

import 'babel-polyfill';
import 'isomorphic-fetch';

import React           from 'react';
import ReactDOM        from 'react-dom';
import { Provider }    from 'react-redux';

import { createStore, combineReducers, applyMiddleware } from 'redux';
import createLogger     from 'redux-logger';
import thunkMiddleware  from 'redux-thunk';

import { googleMapReducer } from './reducers/googleMapReducer';
import { searchReducer }    from './reducers/searchReducer';


const loggerMiddleware = createLogger();


let initialAppState = {
  googleMap: {
    center: {
      lat: 40.74,
      lng: -74
    },
    mapTypeControl: false,
    zoom: 14
  },
  search: {
    results: {
      items: []
    }
  }
};

let store = createStore(
  combineReducers({ googleMap: googleMapReducer, search: searchReducer }),
  initialAppState,
  applyMiddleware(
    thunkMiddleware,
    loggerMiddleware
  )
);

global.store = store;

import App from './containers/App';

let googleMaps = null;

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

