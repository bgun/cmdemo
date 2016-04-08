import React, { Component, PropTypes } from 'react';

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
          { markers.map((m, index) =>
            <li key={ m.marker_id }>
              <h4>{ m.business.name }</h4>
              <address>{ m.business.address }</address>
            </li>
          ) }
        </ul>
      </div>
    )
  }

}
UsermapPanel.propTypes = {
  usermap: PropTypes.object
};