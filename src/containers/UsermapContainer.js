import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import UsermapPanel from '../components/UsermapPanel';


class UsermapContainer extends Component {

  render() {
    return (
      <div>
        <UsermapPanel usermap={ this.props.activeUsermap } />
      </div>
    )
  }

}
export default connect(
  appState => ({
    activeBusiness   : appState.route.type === 'business' ? (appState.business[appState.route.id] || { _loading: true }) : null,
    activeUsermap    : appState.route.type === 'usermap'  ? (appState.usermaps[appState.route.id] || { _loading: true }) : null,
  })
)(UsermapContainer);
