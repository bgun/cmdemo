import React, { Component, PropTypes } from 'react';
import ReactDOMServer from 'react-dom/server';
import { connect } from 'react-redux';

import BusinessPanel from '../components/BusinessPanel';
import SearchInput   from '../components/SearchInput';
import SearchResults from '../components/SearchResults';
import UsermapPanel  from '../components/UsermapPanel';

import Actions from '../actions/actions';

require('../../css/App.less');


var BUSINESS_PIN_ICON = {
  path: 'M -20,0 -20,40 -10,40 0,50 10,40 20,40, 20,0 -20,0 z',
  fillColor: 'white',
  fillOpacity: 1,
  scale: 1,
  strokeColor: '#AAAAAA',
  strokeWeight: 1
};


let _isBusiness = function(obj) {
  return obj.type === 1 && obj.bid;
};
let _isUsermap = function(obj) {
  return obj.type === 2 && obj.map_id;
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

    this._markersNeedRefresh = false;
    if (nextProps.searchResults !== this.props.searchResults) {
      this._markersNeedRefresh = true;
    }
    if (nextProps.activeUsermap && (nextProps.activeUsermap !== this.props.activeUsermap)) {
      this._markersNeedRefresh = true;
    }
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

    let bounds = new googleMaps.LatLngBounds();

    // remove all existing markers
    if (this._markerObjects) {
      this._markerObjects.forEach(obj => {
        obj.marker.setMap(null);
      });
    }

    if (this.props.activeUsermap) {
      let markers = this.props.activeUsermap.markers || [];
      this._markerObjects = markers.map((m, index) => {
        let LL = new googleMaps.LatLng(m.business.lat, m.business.lon);
        let marker = new googleMaps.Marker({
          position: LL,
          map: this._map
        });
        let popup = new googleMaps.InfoWindow({
          content: m.business.name
        });

        let obj = { marker, popup };
        marker.addListener('click', () => this.openMarker(index));

        bounds.extend(LL);
        return obj;
      });
    } else if (this.props.searchResults) {
      this._markerObjects = this.props.searchResults.filter(_isBusiness).map((sr, index) => {
        let LL = new googleMaps.LatLng(sr.lat, sr.lon);
        let marker = new googleMaps.Marker({
          position: LL,
          map: this._map
        });
        let popup = new googleMaps.InfoWindow({
          content: sr.name
        });

        let obj = { marker, popup };
        marker.addListener('click', () => this.openMarker(index));

        bounds.extend(LL);
        return obj;
      });

      this._map.fitBounds(bounds);
    }
  }

  openMarker(index) {
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
    } else if (_isUsermap(item)) {
      this.props.handleLoadUsermap(item.map_id);
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
          { this.props.activeUsermap  ? <UsermapPanel  usermap ={ this.props.activeUsermap  } handleClose={ () => this.props.handleClearRoute() } /> : null }
        </div>
      </div>
    )
  }
}
App.propTypes = {
  handleClearRoute  : PropTypes.func.isRequired,
  handleLoadBusiness: PropTypes.func.isRequired,
  handleLoadUsermap : PropTypes.func.isRequired,
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
    handleSearchQuery  : query  => dispatch(Actions.executeSearch(query)),
    handleLoadBusiness : bid    => dispatch(Actions.fetchBusiness(bid)),
    handleLoadUsermap  : map_id => dispatch(Actions.fetchUsermap(map_id)),
    handleClearRoute   : ()     => dispatch(Actions.clearRoute())
  })
)(App);