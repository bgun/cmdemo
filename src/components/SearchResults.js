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

  constructor() {
    super();
    this.state = {
      minimize: false
    }
  }

  toggleMinimize() {
    this.setState({
      minimize: !this.state.minimize
    })
  }

  render() {
    const { onItemClick, results } = this.props;

    let classes = ['searchResults'];
    if (!results.length) {
      classes.push('empty')
    }
    if (this.state.minimize) {
      classes.push('minimize');
    }

    return (
      <div className={ classes.join(' ') }>
        <h4>{ results.length } results</h4>
        <span className='btn-minimize' onClick={ () => this.toggleMinimize() }>=</span>
        <ul>
          { results.filter(_isBusiness).map((result, index) => (
            <li key={ index } className="search-item">
              <BusinessItem business={ result } />
            </li>
          ))}
        </ul>
        <ul>
          { results.filter(_isUsermap).map((result, index) => (
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
  results: PropTypes.array.isRequired,
  onItemClick: PropTypes.func.isRequired
};