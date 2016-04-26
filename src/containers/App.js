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

  componentWillReceiveProps(nextProps) {
    // This cannot go in componentDidMount because we might mount before Google Maps is initialized
    this._markersNeedRefresh = false;
    if (nextProps.search.results !== this.props.search.results) {
      this._markersNeedRefresh = true;
    }
    if (nextProps.params.map_id) {
      this._markersNeedRefresh = true;
    }
  }

  componentDidMount() {
    this._googleMaps = global.google.maps;
    if (!this._map) {
      let transitLayer = new this._googleMaps.TransitLayer();
      this._map = new this._googleMaps.Map(this.refs.map, this.props.googleMapOptions);
      transitLayer.setMap(this._map);
      this._map.addListener('dragend', () => this.props.handleMapMove(this._map));
    }
    console.log("context", this.context);
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

    if (this.props.params.map_id) {
      console.log("updating map!");
      let usermap = this.props.usermaps[this.props.params.map_id];
      if (usermap && usermap.markers) {
        let markers = usermap.markers;
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
        this._map.fitBounds(bounds);
      }
    } else if (this.props.search.results) {
      let businesses = this.props.search.results.filter(_isBusiness);
      if (businesses.length) {
        this._markerObjects = businesses.map((sr, index) => {
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

  render() {
    if (this._markersNeedRefresh) {
      this.updateMap();
    }

    return (
      <div>
        <div className='map-container' ref="map"></div>
        <SearchInput handleChange={ search => this.props.handleSearchQuery(search) } search={ this.props.search } />
        <div className='content'>
          { this.props.children }
        </div>
      </div>
    )
  }
}
App.propTypes = {
  googleMaps: PropTypes.any
};
App.contextTypes = {
  router: React.PropTypes.object.isRequired
};


export default connect(
  appState => ({
    usermaps         : appState.usermaps,
    googleMapOptions : appState.googleMap,
    search           : appState.search
  }),
  dispatch => ({
    handleClearRoute   : ()     => dispatch(Actions.clearRoute()),
    handleMapMove      : map    => dispatch(Actions.mapUpdate(map)),
    handleSearchQuery  : search => dispatch(Actions.executeSearch(search))
  })
)(App);