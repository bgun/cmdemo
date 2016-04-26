import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import Actions from '../actions/actions';

import SearchResults from '../components/SearchResults';


class SearchContainer extends Component {

  componentDidMount() {
    this.props.handleSearchQuery({
      query: this.props.params.query,
      types: this.props.search.types
    });
  }

  componentWillReceiveProps(nextProps) {
    /*
    if (nextProps.search !== this.props.search) {
      nextProps.handleSearchQuery({
        query: nextProps.params.query,
        types: this.props.search.types
      });
    }
    */
  }

  clickItem(index) {
    let item = this.props.search.results[index];
    if (_isBusiness(item)) {
      this.openMarker(index);
      this.props.handleLoadBusiness(item.bid);
    } else if (_isUsermap(item)) {
      this.props.handleLoadUsermap(item.map_id);
    } else {
      console.log("user or map", item);
    }
  }

  render() {
    return (
      <div>
        <SearchResults results={ this.props.search.results } onItemClick={ index => this.clickItem(index) } />
      </div>
    )
  }

}

SearchContainer.propTypes = {
  handleLoadBusiness: PropTypes.func.isRequired,
  handleLoadUsermap : PropTypes.func.isRequired
};

export default connect(
  appState => ({
    googleMapOptions : appState.googleMap,
    search           : appState.search
  }),
  dispatch => ({
    handleLoadBusiness : bid    => dispatch(Actions.fetchBusiness(bid)),
    handleLoadUsermap  : map_id => dispatch(Actions.fetchUsermap(map_id)),
    handleSearchQuery  : search => dispatch(Actions.executeSearch(search))
  })
)(SearchContainer);