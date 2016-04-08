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
    const { usermap } = this.props;
    let loadingClass = '';
    if (usermap._loading) {
      loadingClass = 'loading';
    }

    let markers = usermap.markers || [];

    return (
      <div className={ 'usermapPanel '+loadingClass }>
        <h1>{ usermap.name }</h1>
        <ul>
          { markers.map((m, index) => <MarkerItem marker={ m } /> ) }
        </ul>
        <a className="btn-clear" href="/">x</a>
      </div>
    )
  }

}
UsermapPanel.propTypes = {
  usermap: PropTypes.object
};