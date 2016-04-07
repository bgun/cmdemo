export function searchReducer(state, action) {

  switch (action.type) {
    case 'REQUEST_SEARCH':
      return Object.assign({}, state, {
        query: action.query
      });
      break;
    case 'RECEIVE_SEARCH':
      return Object.assign({}, state, {
        results: action.results
      });
      break;
    default:
      return state || {};
      break;
  }

}