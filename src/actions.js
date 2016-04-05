export function executeSearch(query) {

  return dispatch => {
    dispatch({
      type: 'REQUEST_SEARCH',
      query: query
    });
    let url = "https://ndev-coresearch.citymaps.com/search/autocomplete/"+query+"?lat=40.74&lon=74&zoom=12&radius=5&businesses=1&locations=1&users=1&user_maps=1&categories=0&lander_regions=5000&client=web&max_businesses=10&max_locations=3&max_users=3&max_user_maps=3&max_categories=3";
    fetch(url)
      .then(response => response.json())
      .then(json => dispatch({
        type: 'RECEIVE_SEARCH',
        results: json
      }));
  };

}