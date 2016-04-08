export function googleMapReducer(state, action) {

  switch (action.type) {
    case 'MAP_UPDATE':
      return Object.assign({}, state, {
        center: {
          lat: action.map.getCenter().lat(),
          lng: action.map.getCenter().lng()
        }
      });
      break;
    default:
      return state || {}
      break;
  }

}