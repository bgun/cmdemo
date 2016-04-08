import React, { Component, PropTypes } from 'react';

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

    return (
      <div className={ 'businessPanel '+loadingClass }>
        { photo ? <div className="photo" style={{ backgroundImage: "url("+photo.url+");" }} /> : null }
        <div className="inner">
          <h1>{ business.name }</h1>
          <address>{ business.address }</address>
        </div>
        <span className="clear" onClick={ () => this.props.handleClose() }>x</span>
      </div>
    )
  }

}
BusinessPanel.propTypes = {
  business: PropTypes.object
};