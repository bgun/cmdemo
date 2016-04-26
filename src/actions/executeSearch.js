import qs from 'qs';

export default function executeSearch(search) {

  return (dispatch, getState) => {

    console.log("searching",search);

    if (!search || !search.query) {
      console.warn("no query text");
      return null;
    }

    let search_businesses = (search.types.indexOf('businesses') === -1) ? 0 : 1;
    let search_usermaps   = (search.types.indexOf('usermaps'  ) === -1) ? 0 : 1;

    let params = {
      lat: getState().googleMap.center.lat,
      lon: getState().googleMap.center.lng,
      zoom: 15,
      radius: 5,
      businesses: search_businesses,
      locations: 0,
      users: 0,
      user_maps: search_usermaps,
      categories: 0,
      client: "web",
      max_businesses: 10,
      max_locations: 3,
      max_users: 3,
      max_user_maps: 3,
      max_categories: 3
    };

    let url = "https://coresearch.citymaps.com/search/autocomplete/"+search.query+"?" + qs.stringify(params);

    dispatch({
      type: 'REQUEST_SEARCH',
      search: search
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
