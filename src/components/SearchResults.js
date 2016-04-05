import React, { Component, PropTypes } from 'react';

export default class SearchResults extends Component {

  render() {
    const { onItemClick, results } = this.props;

    return (
      <div className='searchResults'>
        <ul>
          { results.map((result, index) => (
            <li key={ index } onClick={ e => onItemClick(index) }>{ result }</li>
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