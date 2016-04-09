export default function fetchUsermap(map_id) {

  return (dispatch, getState) => {

    let usermap_url = "https://ca.citymaps.com/v2/map/"+map_id;
    let markers_url = "https://ca.citymaps.com/v3/marker/map/"+map_id;

    dispatch({
      type: 'REQUEST_USERMAP',
      map_id: map_id
    });

    Promise.all([
      fetch(usermap_url).then(resp => resp.json()),
      fetch(markers_url).then(resp => resp.json())
    ]).then(responses => {
      let usermap = responses[0].map;
      usermap.markers = responses[1].markers;
      dispatch({
        type: 'RECEIVE_USERMAP',
        map_id: map_id,
        usermap: usermap
      });
    });
  };

}