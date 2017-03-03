import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {intlShape, injectIntl, FormattedMessage} from 'react-intl';
import {
  Container, Grid, Header, Segment
} from 'semantic-ui-react';
import NavBar from '../General/NavBar';
import {Loading} from '../General/Loading';
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
  header: {
    fontSize: "2em"
  },
  subHeader: {
    fontSize: "1.5em"
  }
};

/* eslint-disable react/no-danger */
class Booking extends Component {
  constructor(props) {
    super(props);
    this.state = {name: 'Booking'};
  }
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
    const {bookingInfo, user} = this.props;
    console.log(bookingInfo);
    console.log(user);
    return (
      <div style={styles.wrapper}>
        {bookingInfo && user ?
          <div>
            <NavBar/>
            <Segment vertical>
              <Container style={styles.container}>
                <Grid verticalAlign="middle" columns={1}>
                  <Grid.Row centered>
                    <Grid.Column>
                      {bookingInfo.booking ?
                        <div>
                          <Header as="h1" size="huge" className="bold" style={styles.header}>
                            <FormattedMessage id="booking.statusHeader"/>
                            <Header.SubHeader style={styles.subHeader}>

                            </Header.SubHeader>
                          </Header>
                        </div> :
                        <Loading/>
                      }
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Container>
            </Segment>
          </div> :
          <Loading/>
        }
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
