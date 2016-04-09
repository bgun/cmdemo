import React, { Component, PropTypes } from 'react';

export default class SearchInput extends Component {

  constructor(props) {
    super();
    console.log("input constructor", props);
    this.state = {
      query: props.search.query,
      types: props.search.types
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      query: nextProps.search.query,
      types: nextProps.search.types
    });
  }

  onKeyUp(ev) {
    if (ev.keyCode === 13) {
      let q = this.state.query;
      this.props.handleChange({
        query: q,
        types: this.state.types
      });
      this.context.router.push('/search/'+q);
    }
  }

  handleInputChange(ev) {
    this.setState({
      query: ev.target.value
    });
  }

  handleSelectChange(ev) {
    this.props.handleChange({
      query: this.state.query,
      types: ev.target.value
    });
    this.context.router.push('/search/'+this.state.query);
  }

  render() {
    return (
      <div className='searchInput'>
        <div className='inner'>
          <input
            type='text'
            placeholder='Search'
            className='search-input'
            value={ this.state.query }
            onKeyUp={ e => this.onKeyUp(e) }
            onChange={ e => this.handleInputChange(e) }
          />
          <select onChange={ ev => this.handleSelectChange(ev) } value={ this.state.types }>
            <option value='businesses,usermaps'>All</option>
            <option value='businesses'         >Businesses</option>
            <option value='usermaps'           >Maps</option>
          </select>
        </div>
      </div>
    )
  }
}
SearchInput.propTypes = {
  handleChange: PropTypes.func.isRequired
};
SearchInput.contextTypes = {
  router: React.PropTypes.object.isRequired
};
