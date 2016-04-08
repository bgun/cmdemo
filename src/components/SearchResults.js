import React, { Component, PropTypes } from 'react';

import BusinessItem from './BusinessItem';
import UsermapItem  from './UsermapItem';

require('../../css/SearchResults.less');


let _isBusiness = function(obj) {
  return obj.type === 1 && obj.bid;
};
let _isUsermap = function(obj) {
  return obj.type === 2 && obj.map_id;
};
let _isUser = function(obj) {
  return obj.type === 3 && obj.user_id;
};

export default class SearchResults extends Component {

  render() {
    const { onItemClick, items } = this.props;

    return (
      <div className={ 'searchResults '+(items.length ? '' : 'empty') }>
        <ul>
          { items.filter(_isBusiness).map((result, index) => (
            <li key={ index } className="search-item">
              <BusinessItem business={ result } />
            </li>
          ))}
        </ul>
        <ul>
          { items.filter(_isUsermap).map((result, index) => (
            <li key={ index } className="search-item">
              <UsermapItem usermap={ result } />
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