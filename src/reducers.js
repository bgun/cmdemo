function reducer(state, action) {

  switch (action.type) {
    case 'REQUEST_SEARCH':
      console.log("Started search", action.query);
      return Object.assign({}, state, {
        query: action.query
      });
      break;
    default:
      console.log("default reducer", state, action);
      return state || {};
      break;
  }

}

export default reducer;