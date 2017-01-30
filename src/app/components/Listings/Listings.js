import React, {Component} from 'react';
import {connect} from 'react-redux';
import {intlShape, injectIntl} from 'react-intl';
import NavBar from '../General/NavBar';

class Listings extends Component {
  render() {
    return (
      <div>
        <NavBar/>
      </div>
    );
  }
}

Listings.propTypes = {
  intl: intlShape.isRequired,
  isFetching: React.PropTypes.bool,
  router: React.PropTypes.object,
  dispatch: React.PropTypes.func.isRequired,
  err: React.PropTypes.object
};

const mapStateToProps = state => {
  const {reducers} = state;
  const {isFetching, err} = reducers;

  return {
    isFetching,
    err
  };
};

export default connect(mapStateToProps)(injectIntl(Listings));
