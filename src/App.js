import React from 'react';
import { connect } from 'react-redux';

require('../css/App.css');


export default class App extends React.Component {

  constructor(props) {
    super();
    this.state = {
    }
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
    return (
      <div>
        <h1>Hello</h1>
        <div className='map-container' ref="map"></div>
        <div className='content'>
          <div className='search-container'>
            <input type='text' className='search-input' />
          </div>
        </div>
      </div>
    )
  }
}
