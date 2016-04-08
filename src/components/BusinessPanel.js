import React, { Component, PropTypes } from 'react';

export default class BusinessPanel extends Component {

  render() {
    const { business } = this.props;
    let loadingClass = '';
    if (business._loading) {
      loadingClass = 'loading';
    }

    return (
      <div className={ 'businessPanel '+loadingClass }>
        <h1>{ business.name }</h1>
        <address>{ business.address }</address>
        <span className="clear" onClick={ () => this.props.handleClose() }>x</span>
      </div>
    )
  }

}
BusinessPanel.propTypes = {
  business: PropTypes.object
};