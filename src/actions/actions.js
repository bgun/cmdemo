// central file for importing all actions

import executeSearch from './executeSearch';
import fetchBusiness from './fetchBusiness';
import fetchUsermap  from './fetchUsermap';

let clearRoute = () => ({
  type: 'CLEAR_ROUTE'
});

export default {
  clearRoute,
  executeSearch,
  fetchBusiness,
  fetchUsermap
};