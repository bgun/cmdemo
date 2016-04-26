import React, { Component, PropTypes } from 'react';

import BusinessItem from './BusinessItem';

require('../../css/UsermapPanel.less');


class MarkerItem extends Component {
  render() {
    let { marker } = this.props;
    let business = marker.business;

    return (
      <li className="markerItem" key={ marker.marker_id }>
        <BusinessItem business={ business } />
      </li>
    );
  }
}


export default class UsermapPanel extends Component {

  render() {
    let { usermap } = this.props;

    if (!usermap) {
      usermap = {
        _loading: true,
        markers: []
      }
    }

    return (
      <div className={ 'usermapPanel '+(usermap._loading ? 'loading' : '') }>
        <div>
          <h1>{ usermap.name }</h1>
          <ul>
            { usermap.markers.map((m, index) => <MarkerItem key={ index } marker={ m } /> ) }
          </ul>
          <a className="btn-clear" href="/">x</a>
        </div>
      </div>
    )
  }

}
UsermapPanel.propTypes = {
  usermap: PropTypes.object
};