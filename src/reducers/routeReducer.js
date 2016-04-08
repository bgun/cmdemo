export function routeReducer(state, action) {

  switch (action.type) {
    case 'REQUEST_BUSINESS':
      return Object.assign({}, state, {
        type: 'business',
        id: action.bid
      });
      break;
    case 'REQUEST_USERMAP':
      return Object.assign({}, state, {
        type: 'usermap',
        id: action.map_id
      });
      break;
    case 'REQUEST_SEARCH':
      return Object.assign({}, state, {
        type: 'search',
        query: action.query
      });
      break;
    case 'CLEAR_ROUTE':
      return Object.assign({}, state, {
        type: null,
        id: '',
        query: ''
      });
      break;
    default:
      return state || {};
      break;
  }

}