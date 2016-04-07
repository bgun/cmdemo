export function googleMapReducer(state, action) {

  switch (action.type) {
    case 'REQUEST_SEARCH':
      return state;
      break;
    default:
      return state || {}
      break;
  }

}