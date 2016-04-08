import React, { Component, PropTypes } from 'react';

require('../../css/SearchResults.less');


export default class SearchResults extends Component {

  render() {
    const { onItemClick, items } = this.props;

    return (
      <div className={ 'searchResults '+(items.length ? '' : 'empty') }>
        <ul>
          { items.map((result, index) => (
            <li key={ index } className="search-item" onClick={ e => onItemClick(index) }>
              <div className="name">{ result.name }</div>
              <address>{ result.address }</address>
            </li>
          ))}
        </ul>
      </div>
    )
  }

}
SearchResults.propTypes = {
  items: PropTypes.array.isRequired,
  onItemClick: PropTypes.func.isRequired
};