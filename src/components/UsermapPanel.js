import React, { Component, PropTypes } from 'react';

require('../../css/UsermapPanel.less');


class MarkerItem extends Component {
  render() {
    let { marker } = this.props;
    let business = marker.business;

    return (
      <li className="markerItem" key={ marker.marker_id }>
        <h4>{ business.name }</h4>
        <address>{ business.address }</address>
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
        <span className="clear" onClick={ () => this.props.handleClose() }>x</span>
      </div>
    )
  }

}
UsermapPanel.propTypes = {
  usermap: PropTypes.object
};