import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

export default class BusinessItem extends Component {
  render() {
    let { business } = this.props;
    return (
      <Link to={ "/business/"+business.bid }>
        <span className="name">{ business.name }</span>
        <address>{ business.address }</address>
      </Link>
    )
  }
}
