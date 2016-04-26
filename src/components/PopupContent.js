import React from 'react';

require('../../css/PopupContent.less');


export default (props) => {
  let { business } = props;
  return (
    <div className="popupContent">
      <h3>{ business.name }</h3>
      <address>{ business.address }</address>
      <a className="phone" href={ 'tel:'+business.phone }>{ business.phone }</a>
    </div>
  );
}