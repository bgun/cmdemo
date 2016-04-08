import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import BusinessPanel from '../components/BusinessPanel';
import SearchInput   from '../components/SearchInput';
import SearchResults from '../components/SearchResults';

import Actions from '../actions/actions';

require('../../css/App.css');


let _isBusiness = function(obj) {
  return obj.type === 1 && obj.bid;
};
let _isUser = function(obj) {
  return obj.type === 3 && obj.user_id;
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

    this._markerObjects = this.props.searchResults.filter(_isBusiness).map((sr, index) => {
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

  clickItem(index) {
    let item = this.props.searchResults[index];
    if (_isBusiness(item)) {
      this.openMarker(index);
      this.props.handleLoadBusiness(item.bid);
    } else {
      console.log("user or map", item);
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
          <SearchResults items={ this.props.searchResults } onItemClick={ index => this.clickItem(index) } />
          { this.props.activeBusiness ? <BusinessPanel business={ this.props.activeBusiness } handleClose={ () => this.props.handleClearRoute() } /> : null }
        </div>
      </div>
    )
  }
}
App.propTypes = {
  handleClearRoute  : PropTypes.func.isRequired,
  handleLoadBusiness: PropTypes.func.isRequired,
  handleSearchQuery : PropTypes.func.isRequired,
  googleMaps: PropTypes.any
};


export default connect(
  appState => ({
    activeBusiness   : appState.route.type === 'business' ? (appState.business[appState.route.id] || { _loading: true }) : null,
    activeUsermap    : appState.route.type === 'usermap'  ? (appState.usermaps[appState.route.id] || { _loading: true }) : null,
    googleMapOptions : appState.googleMap,
    searchQuery      : appState.search.query,
    searchResults    : appState.search.results.items || [],
  }),
  dispatch => ({
    handleSearchQuery  : query => dispatch(Actions.executeSearch(query)),
    handleLoadBusiness : bid   => dispatch(Actions.fetchBusiness(bid)),
    handleClearRoute   : ()    => dispatch(Actions.clearRoute())
  })
)(App);