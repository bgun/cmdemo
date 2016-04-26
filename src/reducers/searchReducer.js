export function searchReducer(state, action) {

  switch (action.type) {
    case 'REQUEST_SEARCH':
      return Object.assign({}, state, {
        query: action.search.query,
        types: action.search.types,
        results: []
      });
      break;
    case 'RECEIVE_SEARCH':
      return Object.assign({}, state, {
        results: action.results.items
      });
      break;
    default:
      return state || {};
      break;
  }

}