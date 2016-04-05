import React, { Component, PropTypes } from 'react';

export default class SearchInput extends Component {

  onKeyUp(ev) {
    if (ev.keyCode === 13) {
      let value = ev.target.value;
      console.log("value", value);
      this.props.onChange(value);
    }
  }

  render() {
    return (
      <div className='searchInput'>
        <input type='text' className='search-input' onKeyUp={ e => this.onKeyUp(e) } />
      </div>
    )
  }
}
SearchInput.propTypes = {
  onChange: PropTypes.func.isRequired
};