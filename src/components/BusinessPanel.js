import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

import BusinessComment from './BusinessComment';

require('../../css/BusinessPanel.less');


export default class BusinessPanel extends Component {

  render() {
    const { business } = this.props;

    if (!business) {
      return null;
    }

    let photo = null;
    if (business && business.external_meta && business.external_meta.photos) {
      photo = business.external_meta.photos[0] || {};
    }
    let tips = null;
    if (business && business.external_meta && business.external_meta.tips) {
      tips = business.external_meta.tips;
    }

    return (
      <div className='businessPanel'>
        { photo ? <div className="photo" style={{ backgroundImage: "url("+photo.url+")" }} /> : null }
        <div className="inner">
          <h1>{ business.name }</h1>
          <address>{ business.address }</address>
          <a className="phone" href={ 'tel:'+business.phone }>{ business.phone }</a>
          <div>Rating: { business.rating }</div>

          <div className="comments">
            <h3>Comments</h3>
            <ul>
              { tips ? tips.map((tip, index) => <BusinessComment key={ index } comment={ tip } /> ) : null }
            </ul>
          </div>
        </div>
        <Link className="btn-clear" to="/">x</Link>
      </div>
    )
  }

}
BusinessPanel.propTypes = {
  business: PropTypes.object
};