import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import SearchInput from '../components/SearchInput';

import { executeSearch } from '../actions';

require('../../css/App.css');


class App extends Component {

  constructor(props) {
    super();
    console.log("App props", props);
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    let gmaps = nextProps.googleMaps
    if (gmaps && !this._map) {
      this._map = new gmaps.Map(this.refs.map, {
        center: { lat: 40.74, lng: -74 },
        mapTypeControl: false,
        zoom: 14
      });
      var transitLayer = new gmaps.TransitLayer();
      transitLayer.setMap(this._map);
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
  googleMaps: PropTypes.any
};

function mapStateToProps(state) {
  console.log("mapStateToProps", state);
  return {
    searchQuery: state.searchQuery
  }
}

export default connect(mapStateToProps)(App);