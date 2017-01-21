import React, {Component} from 'react';
import {connect} from 'react-redux';
/* import {
  Button, Container, Form, Grid, Header, Message, Segment
} from 'semantic-ui-react'; */
import {intlShape, injectIntl, FormattedMessage} from 'react-intl';
import Item from './Item';
import NavBar from '../General/NavBar';
import {listings} from '../../actions/auth';

class Listings extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {err, intl} = this.props;
    const {formatMessage} = intl;

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
