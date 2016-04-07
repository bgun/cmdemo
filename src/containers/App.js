import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import SearchInput   from '../components/SearchInput';
import SearchResults from '../components/SearchResults';

import { executeSearch } from '../actions';

require('../../css/App.css');


let _hasLatLon = function(obj) {
  return (obj.lat && obj.lon);
};

class App extends Component {

  constructor(props) {
    super();
    console.log("props", props);
  }

  componentWillReceiveProps(nextProps) {
    // This cannot go in componentDidMount because we might mount before Google Maps is initialized
    if (nextProps.googleMaps) {
      this._googleMaps = nextProps.googleMaps;
      this.createMapIfNeeded();
    }
    this._markersNeedRefresh = (nextProps.searchResults !== this.props.searchResults);
  }

  createMapIfNeeded() {
    let googleMaps = this._googleMaps;
    if (!this._map) {
      let transitLayer = new googleMaps.TransitLayer();
      this._map = new googleMaps.Map(this.refs.map, this.props.googleMapOptions);
      transitLayer.setMap(this._map);
    }
  }

  updateMap() {
    let googleMaps = this._googleMaps;

    if (this._markerObjects) {
      this._markerObjects.forEach(obj => {
        obj.marker.setMap(null);
      });
    }

    this._markerObjects = this.props.searchResults.filter(_hasLatLon).map((sr, index) => {
      let marker = new googleMaps.Marker({
        position: { lat: sr.lat, lng: sr.lon },
        map: this._map,
        title: 'Hello World!'
      });
      let popup = new googleMaps.InfoWindow({
        content: sr.name
      });

      let obj = { marker, popup };
      marker.addListener('click', () => this.openMarker(index));
      return obj;
    });
  }

  openMarker(index) {
    console.log(index);
    if (this._markerObjects) {
      this._markerObjects.forEach(obj => {
        obj.popup.close();
      });
      let m = this._markerObjects[index];
      m.popup.open(this._map, m.marker);
    }
  }

  render() {

    if (this._markersNeedRefresh) {
      this.updateMap();
    }

    return (
      <div>
        <div className='map-container' ref="map"></div>
        <div className='content'>
          <SearchInput handleChange={ query => this.props.handleSearchQuery(query) } />
          <SearchResults items={ this.props.searchResults } onItemClick={ index => this.openMarker(index) } />
        </div>
      </div>
    )
  }
}
App.propTypes = {
  handleSearchQuery: PropTypes.func.isRequired,
  googleMaps: PropTypes.any
};


export default connect(
  appState => ({
    googleMapOptions : appState.googleMap,
    searchQuery      : appState.search.query,
    searchResults    : appState.search.results.items || []
  }),
  dispatch => ({
    handleSearchQuery: (query) => dispatch(executeSearch(query))
  })
)(App);