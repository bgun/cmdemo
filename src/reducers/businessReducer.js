export function businessReducer(state, action) {

  switch (action.type) {
    case 'RECEIVE_BUSINESS':
      let obj = {};
      obj[action.bid] = action.business;
      return Object.assign({}, state, obj);
      break;
    default:
      return state || {};
      break;
  }

}