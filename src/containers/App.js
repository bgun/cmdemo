import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import SearchInput from '../components/SearchInput';

import { executeSearch } from '../actions';

require('../../css/App.css');


class App extends Component {

  constructor() {
    super();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.googleMaps && !this._map) {
      this._map = new nextProps.googleMaps.Map(this.refs.map, {
        center: {lat: -34.397, lng: 150.644},
        mapTypeControl: false,
        zoom: 8
      });
    }
  }

  render() {
    const { dispatch } = this.props;
    return (
      <div>
        <h1>Hello</h1>
        <div className='map-container' ref="map"></div>
        <div className='content'>
          <div className='search-container'>
            <SearchInput onChange={ query => dispatch(executeSearch(query)) } />
          </div>
        </div>
      </div>
    )
  }
}
App.propTypes = {
  googleMaps: PropTypes.func
};

function mapStateToProps(state) {
  return {
  }
}

export default connect(mapStateToProps)(App);