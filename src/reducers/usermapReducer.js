export function usermapReducer(state, action) {

  switch (action.type) {
    case 'RECEIVE_USERMAP':
      let obj = {};
      obj[action.map_id] = action.usermap;
      return Object.assign({}, state, obj);
      break;
    default:
      return state || {};
      break;
  }

}