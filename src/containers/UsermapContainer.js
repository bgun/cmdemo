import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import Actions from '../actions/actions';

import UsermapPanel from '../components/UsermapPanel';


class UsermapContainer extends Component {

  componentDidMount() {
    this.props.handleLoadUsermap(this.props.params.map_id);
  }

  componentWillReceiveProps(nextProps) {
    let map_id = this.props.params.map_id;
    if (map_id !== nextProps.params.map_id) {
      nextProps.handleLoadUsermap(nextProps.params.map_id);
    }
  }

  render() {
    let usermap = this.props.usermaps[this.props.params.map_id];
    return (
      <UsermapPanel usermap={ usermap } />
    )
  }

}
export default connect(
  appState => ({
    usermaps: appState.usermaps
  }),
  dispatch => ({
    handleLoadUsermap : map_id => dispatch(Actions.fetchUsermap(map_id))
  })
)(UsermapContainer);
