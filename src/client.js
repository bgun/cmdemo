'use strict';

import 'babel-polyfill';
import 'isomorphic-fetch';

import React           from 'react';
import ReactDOM        from 'react-dom';
import { Provider }    from 'react-redux';
import { Router, Route, Link, browserHistory } from 'react-router';

import { createStore, combineReducers, applyMiddleware } from 'redux';
import createLogger     from 'redux-logger';
import thunkMiddleware  from 'redux-thunk';

import BusinessContainer from './containers/BusinessContainer';
import SearchContainer   from './containers/SearchContainer';
import UsermapContainer  from './containers/UsermapContainer';

import { businessReducer  } from './reducers/businessReducer';
import { googleMapReducer } from './reducers/googleMapReducer';
import { searchReducer    } from './reducers/searchReducer';
import { usermapReducer   } from './reducers/usermapReducer';


const loggerMiddleware = createLogger();


const initialAppState = {
  businesses: {},
  usermaps: {},
  googleMap: {
    center: {
      lat: 37.77,
      lng: -122.45
    },
    mapTypeControl: false,
    zoom: 13
  },
  search: {
    query: '',
    types: 'businesses',
    results: []
  }
};

let store = createStore(
  combineReducers({
    businesses : businessReducer,
    googleMap  : googleMapReducer,
    search     : searchReducer,
    usermaps   : usermapReducer
  }),
  initialAppState,
  applyMiddleware(
    thunkMiddleware,
    loggerMiddleware
  )
);

global.store = store;


import App from './containers/App';


ReactDOM.render(
  <Provider store={ store }>
    <Router history={ browserHistory }>
      <Route path="/" component={ App }>
        <Route path="search/:query" component={ SearchContainer } />
        <Route path="business/:bid" component={ BusinessContainer } />
        <Route path="map/:map_id"   component={ UsermapContainer } />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
);

// global hook for Google Maps async
global.initMap = () => {
  global.googleMaps = google.maps;
};
