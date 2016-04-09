import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import Actions from '../actions/actions';

import BusinessPanel from '../components/BusinessPanel';


class BusinessContainer extends Component {

  componentDidMount() {
    this.props.handleLoadBusiness(this.props.params.bid);
  }

  componentWillReceiveProps(nextProps) {
    let bid = this.props.params.bid;
    if (this.props.params.bid !== nextProps.params.bid) {
      nextProps.handleLoadBusiness(nextProps.params.bid);
    }
  }

  render() {
    let business = this.props.businesses[this.props.params.bid];
    return (
      <BusinessPanel business={ business } />
    )
  }

}
export default connect(
  appState => ({
    businesses: appState.businesses
  }),
  dispatch => ({
    handleLoadBusiness : bid => dispatch(Actions.fetchBusiness(bid))
  })
)(BusinessContainer);