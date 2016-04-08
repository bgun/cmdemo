import React, { Component, PropTypes } from 'react';

export default class SearchInput extends Component {

  constructor() {
    super();
    this.state = {
      query: ''
    }
  }

  componentDidMount() {
    this.setState({
      query: this.props.query
    })
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      query: nextProps.query
    })
  }

  onKeyUp(ev) {
    if (ev.keyCode === 13) {
      let q = this.state.query;
      this.context.router.push('/search/'+q);
      this.props.handleChange(q);
    }
  }

  onChange(ev) {
    this.setState({
      query: ev.target.value
    });
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
            onChange={ e => this.onChange(e) }
          />
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
