import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import Actions from '../actions/actions';

import SearchResults from '../components/SearchResults';


class SearchContainer extends Component {

  componentDidMount() {
    this.props.handleSearchQuery(this.props.params.query);
  }

  componentWillReceiveProps(nextProps) {
    console.log("got props", nextProps, this.props);
    if (nextProps.searchQuery !== this.props.searchQuery) {
      nextProps.handleSearchQuery(nextProps.searchQuery);
    }
  }

  clickItem(index) {
    let item = this.props.searchResults[index];
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
        <SearchResults items={ this.props.searchResults } onItemClick={ index => this.clickItem(index) } />
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
    searchQuery      : appState.search.query,
    searchResults    : appState.search.results.items || [],
  }),
  dispatch => ({
    handleLoadBusiness : bid    => dispatch(Actions.fetchBusiness(bid)),
    handleLoadUsermap  : map_id => dispatch(Actions.fetchUsermap(map_id)),
    handleSearchQuery  : query  => dispatch(Actions.executeSearch(query))
  })
)(SearchContainer);