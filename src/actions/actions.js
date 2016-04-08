// central file for importing all actions

import executeSearch from './executeSearch';
import fetchBusiness from './fetchBusiness';

let clearRoute = () => ({
  type: 'CLEAR_ROUTE'
});

export default {
  executeSearch,
  fetchBusiness,
  clearRoute
};
