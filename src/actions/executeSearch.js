import qs from 'qs';

export default function executeSearch(query) {

  return (dispatch, getState) => {

    let params = {
      lat: getState().googleMap.center.lat,
      lon: getState().googleMap.center.lng,
      zoom: 15,
      radius: 5,
      businesses: 1,
      locations: 0,
      users: 1,
      user_maps: 1,
      categories: 0,
      client: "web",
      max_businesses: 10,
      max_locations: 3,
      max_users: 3,
      max_user_maps: 3,
      max_categories: 3
    };

    let url = "https://ndev-coresearch.citymaps.com/search/autocomplete/"+query+"?" + qs.stringify(params);

    dispatch({
      type: 'REQUEST_SEARCH',
      query: query
    });

    fetch(url)
      .then(response => response.json())
      .then(json => {
        dispatch({
          type: 'RECEIVE_SEARCH',
          results: json
        });
      });
  };

}