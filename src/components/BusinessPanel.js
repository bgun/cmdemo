import React, { Component, PropTypes } from 'react';

import BusinessComment from './BusinessComment';

require('../../css/BusinessPanel.less');


export default class BusinessPanel extends Component {

  render() {
    const { business } = this.props;
    let loadingClass = '';
    if (business._loading) {
      loadingClass = 'loading';
    }

    let photo = null;
    if (business.external_meta && business.external_meta.photos) {
      photo = business.external_meta.photos[0] || {};
    }
    let tips = null;
    if (business.external_meta && business.external_meta.tips) {
      tips = business.external_meta.tips;
    }

    return (
      <div className={ 'businessPanel '+loadingClass }>
        { photo ? <div className="photo" style={{ backgroundImage: "url("+photo.url+");" }} /> : null }
        <div className="inner">
          <h1>{ business.name }</h1>
          <address>{ business.address }</address>
          <a className="phone" href={ 'tel:'+business.phone }>{ business.phone }</a>
          <div>Rating: { business.rating }</div>

          <div className="comments">
            <h3>Comments</h3>
            <ul>
              { tips ? tips.map(tip => <BusinessComment comment={ tip } /> ) : null }
            </ul>
          </div>
        </div>
        <span className="clear" onClick={ () => this.props.handleClose() }>x</span>
      </div>
    )
  }

}
BusinessPanel.propTypes = {
  business: PropTypes.object
};