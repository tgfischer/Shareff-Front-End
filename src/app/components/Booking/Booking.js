import React, {Component} from 'react';
import moment from 'moment';
import {connect} from 'react-redux';
import {withRouter, Link} from 'react-router';
import {intlShape, injectIntl, FormattedMessage} from 'react-intl';
import {
  Button, Container, Grid, Header, Icon, Image, Progress, Rating, Segment
} from 'semantic-ui-react';
import NavBar from '../General/NavBar';
import {Loading} from '../General/Loading';
import {getUser} from '../../actions/auth';
import {getBooking, createUserReview, confirmItem} from '../../actions/booking';
import {BASE_URL} from '../../constants/constants';

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
    paddingTop: "0.5em",
    paddingBottom: "0.5em",
    fontSize: "1.5em"
  },
  miniHeader: {
    fontSize: "1.5em"
  },
  miniSubHeader: {
    paddingTop: "0.4em",
    paddingBottom: "0.4em",
    fontSize: "1.5em"
  },
  largePadding: {
    paddingTop: "5em",
    paddingBottom: "5em"
  }
};

/* eslint-disable react/no-danger */
class Booking extends Component {
  constructor(props) {
    super(props);
    this.handleItemConfirm = this.handleItemConfirm.bind(this);
    this.handleItemReject = this.handleItemReject.bind(this);
    this.handleRatingSubmit = this.handleRatingSubmit.bind(this);

    this.state = {
      bookingInfo: null
    };
  }
  componentWillMount() {
    const {bookingId} = this.props.params;

    this.props.dispatch(getBooking(bookingId)).then(() => {
      const {bookingInfo} = this.props;
      this.setState({bookingInfo});
      if (!this.props.user) {
        const token = localStorage.getItem('token');
        this.props.dispatch(getUser(token));
      }
    });
  }
  handleItemConfirm() {
    const {bookingInfo, user} = this.props;
    const {booking} = bookingInfo;

    this.props.dispatch(confirmItem({
      bookingId: booking.bookingId,
      userId: user.userId,
      confirm: true
    })).then(({bookingInfo, err}) => {
      if (bookingInfo) {
        this.setState({bookingInfo});
      } else if (err) {
        console.log(err);
      }
    });
  }
  handleItemReject() {
    const {bookingInfo, user} = this.props;
    const {booking} = bookingInfo;

    this.props.dispatch(confirmItem({
      bookingId: booking.bookingId,
      userId: user.userId,
      confirm: false
    })).then(({bookingInfo, err}) => {
      if (bookingInfo) {
        this.setState({bookingInfo});
      } else if (err) {
        console.log(err);
      }
    });
  }
  handleRatingSubmit(event, data) {
    const {bookingInfo, user} = this.props;
    const {booking} = bookingInfo;
    // Dispatch to update the booking to create a new userReview for this booking
    this.props.dispatch(createUserReview({
      bookingId: booking.bookingId,
      ratingUserId: user.userId,
      rating: data.rating
    })).then(({bookingInfo, err}) => {
      if (bookingInfo) {
        this.setState({bookingInfo});
      } else if (err) {
        console.log(err);
      }
    });
  }
  render() {
    const {user} = this.props;
    const {bookingInfo} = this.state;

    return (
      <div style={styles.wrapper}>
        {bookingInfo && user ?
          <div>
            <NavBar/>
            <Segment vertical>
              <Container style={styles.container}>
                <Grid verticalAlign="middle" columns={3}>
                  {bookingInfo.booking && bookingInfo.booking.status &&
                    <Grid.Row centered>
                      <Grid.Column width={4}>
                        <div>
                          <Header as="h2" size="huge" className="bold" style={styles.miniHeader}>
                            <FormattedMessage id="booking.totalCostHeader"/>
                            <Header.Subheader style={styles.miniSubHeader}>
                              {bookingInfo.booking.totalCost}
                            </Header.Subheader>
                          </Header>
                        </div>
                      </Grid.Column>
                      <Grid.Column width={8}>
                        <div>
                          <Header as="h1" size="huge" className="bold" style={styles.header}>
                            <FormattedMessage id="booking.statusHeader"/>
                            <Header.Subheader style={styles.subHeader}>
                              {bookingInfo.booking.status}
                            </Header.Subheader>
                          </Header>
                        </div>
                      </Grid.Column>
                      <Grid.Column width={4}>
                        <div>
                          <Header as="h2" size="huge" className="bold" style={styles.miniHeader}>
                            <FormattedMessage id="booking.paymentStatusHeader"/>
                            <Header.Subheader style={styles.miniSubHeader}>
                              {bookingInfo.booking.paymentStatus}
                            </Header.Subheader>
                          </Header>
                        </div>
                      </Grid.Column>
                    </Grid.Row>
                  }
                </Grid>
                {bookingInfo.booking && bookingInfo.booking.status && bookingInfo.booking.status === 'Booking Pending' &&
                  <Progress percent={10} size="large" color="blue">
                    <FormattedMessage id="booking.pending"/>
                  </Progress>
                }
                {bookingInfo.booking && bookingInfo.booking.status && bookingInfo.booking.status === 'Booking Active' &&
                  <div>
                    <Progress percent={55} size="large" color="blue">
                      <FormattedMessage id="booking.active"/>
                    </Progress>
                    {bookingInfo.renter && bookingInfo.renter.userId && user.userId && bookingInfo.renter.userId === user.userId && bookingInfo.booking.renterStartConfirm === null &&
                      <div style={styles.container}>
                        <Grid verticalAlign="middle" columns={3}>
                          <Grid.Row centered>
                            <Grid.Column width={10}>
                              <Header as="h2" size="huge" style={styles.header}>
                                <FormattedMessage id="booking.activeResponses.renterReceived"/>
                              </Header>
                            </Grid.Column>
                            <Grid.Column width={6}>
                              <Button
                                content="Confirm"
                                icon="checkmark"
                                labelPosition="right"
                                onClick={this.handleItemConfirm}
                                positive
                                />
                              <Button
                                content="Reject"
                                icon="delete"
                                labelPosition="right"
                                onClick={this.handleItemReject}
                                negative
                                />
                            </Grid.Column>
                          </Grid.Row>
                        </Grid>
                      </div>
                    }
                    {bookingInfo.owner && bookingInfo.owner.userId && user.userId && bookingInfo.owner.userId === user.userId && bookingInfo.booking.ownerStartConfirm === null &&
                      <div style={styles.container}>
                        <Grid verticalAlign="middle" columns={3}>
                          <Grid.Row centered>
                            <Grid.Column width={10}>
                              <Header as="h2" size="huge" style={styles.header}>
                                <FormattedMessage id="booking.activeResponses.ownerDelivered"/>
                              </Header>
                            </Grid.Column>
                            <Grid.Column width={6}>
                              <Button
                                content="Confirm"
                                icon="checkmark"
                                labelPosition="right"
                                onClick={this.handleItemConfirm}
                                positive
                                />
                              <Button
                                content="Reject"
                                icon="delete"
                                labelPosition="right"
                                onClick={this.handleItemReject}
                                negative
                                />
                            </Grid.Column>
                          </Grid.Row>
                        </Grid>
                      </div>
                    }
                  </div>
                }
                {bookingInfo.booking && bookingInfo.booking.status && bookingInfo.booking.status === 'Booking Complete' &&
                  <div>
                    <Progress percent={100} size="large" color="blue">
                      <FormattedMessage id="booking.complete"/>
                    </Progress>
                    {bookingInfo.renter && bookingInfo.renter.userId && user.userId && bookingInfo.renter.userId === user.userId &&
                      <div style={styles.container}>
                        <Grid verticalAlign="middle" columns={3}>
                          {bookingInfo.booking.renterEndConfirm === null &&
                            <Grid.Row centered>
                              <Grid.Column width={10}>
                                <Header as="h2" size="huge" style={styles.header}>
                                  <FormattedMessage id="booking.activeResponses.renterDelivered"/>
                                </Header>
                              </Grid.Column>
                              <Grid.Column width={6}>
                                <Button
                                  content="Confirm"
                                  icon="checkmark"
                                  labelPosition="right"
                                  onClick={this.handleItemConfirm}
                                  positive
                                  />
                                <Button
                                  content="Reject"
                                  icon="delete"
                                  labelPosition="right"
                                  onClick={this.handleItemReject}
                                  negative
                                  />
                              </Grid.Column>
                            </Grid.Row>
                          }
                          {bookingInfo.renter.rating ?
                            <Grid.Row centered>
                              <div>
                                <Grid.Column width={10}>
                                  <Header as="h1" size="huge" style={styles.header}>
                                    <FormattedMessage id="booking.thanksForRating"/>
                                  </Header>
                                </Grid.Column>
                                <Grid.Column width={6}>
                                  <Rating
                                    maxRating={5}
                                    defaultRating={bookingInfo.renter.rating}
                                    icon="star"
                                    size="massive"
                                    disabled
                                    />
                                </Grid.Column>
                              </div>
                            </Grid.Row> :
                            <Grid.Row>
                              <div>
                                <Grid.Column width={10}>
                                  <Header as="h1" size="huge" style={styles.header}>
                                  <FormattedMessage
                                    id="booking.provideRating"
                                    values={{
                                      otherUserName: bookingInfo.owner.firstName
                                    }}
                                    />
                                  </Header>
                                </Grid.Column>
                                <Grid.Column width={6}>
                                  <Rating
                                    maxRating={5}
                                    defaultRating={0}
                                    icon="star"
                                    size="massive"
                                    onRate={this.handleRatingSubmit}
                                    />
                                </Grid.Column>
                              </div>
                            </Grid.Row>
                          }
                        </Grid>
                      </div>
                    }
                    {bookingInfo.owner && bookingInfo.owner.userId && user.userId && bookingInfo.owner.userId === user.userId &&
                      <div style={styles.container}>
                        <Grid verticalAlign="middle" columns={2}>
                          {bookingInfo.booking.ownerEndConfirm === null &&
                            <Grid.Row centered>
                              <Grid.Column width={10}>
                                <Header as="h2" size="huge" style={styles.header}>
                                  <FormattedMessage id="booking.activeResponses.ownerReceived"/>
                                </Header>
                              </Grid.Column>
                              <Grid.Column width={6}>
                                <Button
                                  content="Confirm"
                                  icon="checkmark"
                                  labelPosition="right"
                                  onClick={this.handleItemConfirm}
                                  positive
                                  />
                                <Button
                                  content="Reject"
                                  icon="delete"
                                  labelPosition="right"
                                  onClick={this.handleItemReject}
                                  negative
                                  />
                              </Grid.Column>
                            </Grid.Row>
                          }
                          {bookingInfo.owner.rating ?
                            <Grid.Row centered>
                              <Grid.Column width={10}>
                                <Header as="h1" size="huge" style={styles.header}>
                                  <FormattedMessage id="booking.thanksForRating"/>
                                </Header>
                              </Grid.Column>
                              <Grid.Column width={6}>
                                <Rating
                                  maxRating={5}
                                  defaultRating={bookingInfo.owner.rating}
                                  icon="star"
                                  size="massive"
                                  disabled
                                  />
                              </Grid.Column>
                            </Grid.Row> :
                            <Grid.Row centered>
                              <Grid.Column width={10}>
                                <Header as="h1" size="huge" style={styles.header}>
                                  <FormattedMessage
                                    id="booking.provideRating"
                                    values={{
                                      otherUserName: bookingInfo.renter.firstName
                                    }}
                                    />
                                </Header>
                              </Grid.Column>
                              <Grid.Column width={6}>
                                <Rating
                                  maxRating={5}
                                  defaultRating={0}
                                  icon="star"
                                  size="massive"
                                  onRate={this.handleRatingSubmit}
                                  />
                              </Grid.Column>
                            </Grid.Row>
                          }
                        </Grid>
                      </div>
                    }
                  </div>
                }
                <div style={styles.largePadding}>
                  <Grid verticalAlign="middle">
                    <Grid.Row centered columns={2}>
                      <Grid.Column textAlign="center">
                        {bookingInfo.booking && bookingInfo.booking.startDate &&
                          <div>
                            <Header as="h2" size="huge" style={styles.header} icon>
                              <Icon name="checked calendar"/>
                              <FormattedMessage id="booking.startDate"/>
                              <Header.Subheader style={styles.subHeader}>
                                {moment(bookingInfo.booking.startDate).format('MMM Do YYYY, h:mm a')}
                              </Header.Subheader>
                            </Header>
                          </div>
                        }
                      </Grid.Column>
                      <Grid.Column textAlign="center">
                        {bookingInfo.booking && bookingInfo.booking.endDate &&
                          <div>
                            <Header as="h2" size="huge" style={styles.header} icon>
                              <Icon name="checked calendar"/>
                              <FormattedMessage id="booking.endDate"/>
                              <Header.Subheader style={styles.subHeader}>
                                {moment(bookingInfo.booking.endDate).format('MMM Do YYYY, h:mm a')}
                              </Header.Subheader>
                            </Header>
                          </div>
                        }
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
                </div>
                <div style={styles.container}>
                  <Grid verticalAlign="middle">
                    <Grid.Row centered columns={5}>
                      <Grid.Column textAlign="center" width={4}>
                        {bookingInfo.renter && bookingInfo.renter.photoUrl &&
                          <div>
                            <Header as="h2" style={styles.header}>
                              <FormattedMessage
                                id="booking.renter"
                                values={{
                                  fName: bookingInfo.renter.firstName,
                                  lName: bookingInfo.renter.lastName
                                }}
                                />
                            </Header>
                            <Link to={`/user/${bookingInfo.renter.userId}`}>
                              <Image src={BASE_URL + bookingInfo.renter.photoUrl} shape="rounded" bordered fluid/>
                            </Link>
                          </div>
                        }
                      </Grid.Column>
                      <Grid.Column textAlign="center" width={2}>
                        <Icon name="long arrow left" size="huge"/>
                      </Grid.Column>
                      <Grid.Column textAlign="center" width={4}>
                        {bookingInfo.rentalItem && bookingInfo.rentalItem.photos &&
                          <div>
                            <Header as="h3" style={styles.header}>
                              {bookingInfo.rentalItem.title}
                            </Header>
                            <Link to={`/listings/${bookingInfo.rentalItem.itemId}`}>
                              <Image src={BASE_URL + bookingInfo.rentalItem.photos[0]} shape="rounded" bordered fluid/>
                            </Link>
                          </div>
                        }
                      </Grid.Column>
                      <Grid.Column textAlign="center" width={2}>
                        <Icon name="long arrow left" size="huge"/>
                      </Grid.Column>
                      <Grid.Column textAlign="center" width={4}>
                        {bookingInfo.owner && bookingInfo.owner.photoUrl &&
                          <div>
                            <Header as="h2" style={styles.header}>
                              <FormattedMessage
                                id="booking.owner"
                                values={{
                                  fName: bookingInfo.owner.firstName,
                                  lName: bookingInfo.owner.lastName
                                }}
                                />
                            </Header>
                            <Link to={`/user/${bookingInfo.owner.userId}`}>
                              <Image src={BASE_URL + bookingInfo.owner.photoUrl} shape="rounded" bordered fluid/>
                            </Link>
                          </div>
                        }
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
                </div>
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
  params: React.PropTypes.object.isRequired
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
