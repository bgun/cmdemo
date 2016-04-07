import React, { Component, PropTypes } from 'react';

export default class SearchInput extends Component {

  constructor(props) {
    super();
  }

  onKeyUp(ev) {
    if (ev.keyCode === 13) {
      let value = ev.target.value;
      this.props.handleChange(value);
    }
  }

  render() {
    return (
      <div className='searchInput'>
        <input
          type='text'
          placeholder='Search'
          className='search-input'
          onKeyUp={ e => this.onKeyUp(e) }
        />
      </div>
    )
  }
}
SearchInput.propTypes = {
  handleChange: PropTypes.func.isRequired
};