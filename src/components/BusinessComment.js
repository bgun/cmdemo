import React, { Component, PropTypes } from 'react';

export default class BusinessComment extends Component {

  render() {
    let { comment } = this.props;

    return (
      <li className="businessComment">{ comment.note }</li>
    )
  }

}