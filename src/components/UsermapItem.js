import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

export default class BusinessItem extends Component {
  render() {
    let { usermap } = this.props;
    return (
      <Link to={ "/map/"+usermap.map_id }>
        <span className="name">{ usermap.name }</span>
        <span className="count">{ usermap.markers_count } places</span>
      </Link>
    )
  }
}
