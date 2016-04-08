import qs from 'qs';

export default function executeSearch(bid) {

  return (dispatch, getState) => {

    let params = {
      external_meta: true
    };

    let url = "https://ndev-coreapi.citymaps.com/v2/business/"+bid+"?" + qs.stringify(params);

    dispatch({
      type: 'REQUEST_BUSINESS',
      bid: bid
    });

    fetch(url)
      .then(response => response.json())
      .then(json => {
        dispatch({
          type: 'RECEIVE_BUSINESS',
          bid: bid,
          business: json.business
        });
      });
  };

}