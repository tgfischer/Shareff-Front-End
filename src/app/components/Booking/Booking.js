import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {intlShape, injectIntl} from 'react-intl';
import NavBar from '../General/NavBar';
import {getUser} from '../../actions/auth';
import {getBooking} from '../../actions/booking';

const styles = {
  wrapper: {
    height: '100%'
  },
  listItem: {
    padding: '0 2em'
  },
  container: {
    paddingTop: '2em',
    paddingBottom: '2em'
  },
  paragraph: {
    fontSize: '1.5em'
  },
  mapSegment: {
    height: '450px',
    padding: '0'
  }
};

/* eslint-disable react/no-danger */
class Booking extends Component {
  // constructor(props) {
  //   super(props);
  // }
  componentWillMount() {
    const {bookingId} = this.props.params;

    this.props.dispatch(getBooking(bookingId)).then(() => {
      if (!this.props.user) {
        const token = localStorage.getItem('token');
        this.props.dispatch(getUser(token));
      }
    });
  }
  render() {
    // const {bookingInfo, intl, user, isFetching} = this.props;
    return (
      <div style={styles.wrapper}>
        <div>
          <NavBar/>
        </div>
      </div>
    );
  }
}

/* eslint-enable react/no-danger */

Booking.propTypes = {
  intl: intlShape.isRequired,
  isAuthenticated: React.PropTypes.bool,
  isFetching: React.PropTypes.bool,
  router: React.PropTypes.object,
  bookingInfo: React.PropTypes.object,
  err: React.PropTypes.object,
  dispatch: React.PropTypes.func.isRequired,
  user: React.PropTypes.object,
  params: React.PropTypes.object.isRequired,
  location: React.PropTypes.object
};

const mapStateToProps = state => {
  const {reducers} = state;
  const {isAuthenticated, isFetching, user, bookingInfo, err} = reducers;

  return {
    isAuthenticated,
    isFetching,
    bookingInfo,
    user,
    err
  };
};

export default connect(mapStateToProps)(withRouter(injectIntl(Booking)));
