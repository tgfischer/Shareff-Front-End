import React, {Component} from 'react';
import moment from 'moment';
import {connect} from 'react-redux';
import {withRouter, Link} from 'react-router';
import {intlShape, injectIntl, FormattedMessage} from 'react-intl';
import {
  Breadcrumb, Button, Container, Grid, Header, Icon, Image, Rating, Segment, Statistic, Step
} from 'semantic-ui-react';
import NavBar from '../General/NavBar';
import {Loading} from '../General/Loading';
import {getUser} from '../../actions/auth';
import {getBooking, createUserReview, confirmItem} from '../../actions/booking';
import {BASE_URL, ERROR_PAGE} from '../../constants/constants';

const styles = {
  wrapper: {
    height: '100%'
  },
  listItem: {
    padding: '0 2em'
  },
  container: {
    padding: '1em 0'
  },
  subHeader: {
    paddingTop: "0.25em",
    fontSize: "1.5em"
  },
  breadcrumbWrapper: {
    display: 'inline-block'
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
      const {bookingInfo, user, dispatch} = this.props;
      this.setState({bookingInfo});

      if (!user) {
        const token = localStorage.getItem('token');
        dispatch(getUser(token));
      }
    });
  }
  handleItemConfirm() {
    const {bookingInfo, user, router, dispatch} = this.props;
    const {booking} = bookingInfo;

    dispatch(confirmItem({
      bookingId: booking.bookingId,
      userId: user.userId,
      confirm: true
    })).then(({bookingInfo, err}) => {
      if (bookingInfo) {
        this.setState({bookingInfo});
      } else if (err) {
        router.push(ERROR_PAGE);
        console.error(err);
      }
    });
  }
  handleItemReject() {
    const {bookingInfo, user, dispatch, router} = this.props;
    const {booking} = bookingInfo;

    dispatch(confirmItem({
      bookingId: booking.bookingId,
      userId: user.userId,
      confirm: false
    })).then(({bookingInfo, err}) => {
      if (bookingInfo) {
        this.setState({bookingInfo});
      } else if (err) {
        router.push(ERROR_PAGE);
        console.error(err);
      }
    });
  }
  handleRatingSubmit(event, data) {
    const {bookingInfo, user, dispatch, router} = this.props;
    const {booking} = bookingInfo;
    // Dispatch to update the booking to create a new userReview for this booking
    dispatch(createUserReview({
      bookingId: booking.bookingId,
      ratingUserId: user.userId,
      rating: data.rating
    })).then(({bookingInfo, err}) => {
      if (bookingInfo) {
        this.setState({bookingInfo});
      } else if (err) {
        router.push(ERROR_PAGE);
        console.error(err);
      }
    });
  }
  render() {
    const {user, intl, isFetching} = this.props;
    const {formatMessage} = intl;
    const {bookingInfo} = this.state;

    const breadcrumbs = [{
      text: formatMessage({id: 'breadcrumb.home'}),
      to: '/'
    }, {
      text: formatMessage({id: 'breadcrumb.profile'}),
      to: '/profile/info'
    }, {
      text: formatMessage({id: 'breadcrumb.mySchedule'}),
      to: '/profile/my-schedule'
    }, {
      text: formatMessage({id: 'booking.title'})
    }];

    return (
      <div style={styles.wrapper}>
        {bookingInfo && user ?
          <div>
            <NavBar/>
            <Segment color="blue" inverted vertical>
              <Container>
                <Grid verticalAlign="middle" stackable>
                  <Grid.Row>
                    <Grid.Column>
                      <Breadcrumb>
                        {breadcrumbs.map((breadcrumb, i) => {
                          const {text, to} = breadcrumb;
                          const isLast = i === breadcrumbs.length - 1;

                          return (
                            <div style={styles.breadcrumbWrapper} key={i}>
                              {!isLast &&
                                <div style={styles.breadcrumbWrapper}>
                                  <Breadcrumb.Section as={Link} to={to}>
                                    {text}
                                  </Breadcrumb.Section>
                                  <Breadcrumb.Divider icon="right angle"/>
                                </div>
                              }
                              {isLast &&
                                <Breadcrumb.Section active>
                                  {text}
                                </Breadcrumb.Section>
                              }
                            </div>
                          );
                        })}
                      </Breadcrumb>
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row columns={3} centered>
                    <Grid.Column>
                      <Statistic inverted>
                        <Statistic.Value>
                          ${bookingInfo.booking.totalCost}
                        </Statistic.Value>
                        <Statistic.Label style={styles.subHeader}>
                          <FormattedMessage id="booking.totalCostHeader"/>
                        </Statistic.Label>
                      </Statistic>
                    </Grid.Column>
                    <Grid.Column>
                      <Statistic inverted>
                        <Statistic.Value>
                          {bookingInfo.booking.status}
                        </Statistic.Value>
                        <Statistic.Label style={styles.subHeader}>
                          <FormattedMessage id="booking.statusHeader"/>
                        </Statistic.Label>
                      </Statistic>
                    </Grid.Column>
                    <Grid.Column>
                      <Statistic inverted>
                        <Statistic.Value>
                          <FormattedMessage
                            id="booking.paymentStatus"
                            values={{
                              status: bookingInfo.booking.totalCost
                            }}
                            />
                        </Statistic.Value>
                        <Statistic.Label style={styles.subHeader}>
                          <FormattedMessage id="booking.paymentStatusHeader"/>
                        </Statistic.Label>
                      </Statistic>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Container>
            </Segment>
            <Container style={styles.container}>
              <Segment size="huge" loading={isFetching}>
                <Header as="h1" dividing>
                  <FormattedMessage id="booking.bookingStatusTitle"/>
                  <Header.Subheader>
                    <FormattedMessage id="booking.bookingStatusSubTitle"/>
                  </Header.Subheader>
                </Header>
                <Step.Group size="huge" stackable="tablet" fluid ordered>
                  <Step
                    active={bookingInfo.booking.status === 'Pending'}
                    completed={bookingInfo.booking.status !== 'Pending'}
                    title={formatMessage({id: 'booking.status.pending'})}
                    description={formatMessage({id: 'booking.status.pendingDescription'})}
                    />
                  <Step
                    active={bookingInfo.booking.status === 'Active'}
                    completed={bookingInfo.booking.status === 'Complete'}
                    title={formatMessage({id: 'booking.status.active'})}
                    description={formatMessage({id: 'booking.status.activeDescription'})}
                    />
                </Step.Group>
                {bookingInfo.booking.status === 'Active' && ((bookingInfo.renter.userId === user.userId && bookingInfo.booking.renterStartConfirm === null) ||
                  (user.userId && bookingInfo.owner.userId === user.userId && bookingInfo.booking.ownerStartConfirm === null)) &&
                  <Segment>
                    <Grid verticalAlign="middle" columns={3}>
                      <Grid.Row>
                        <Grid.Column width={10}>
                          <Header as="h1">
                            {bookingInfo.renter.userId === user.userId && bookingInfo.booking.renterStartConfirm === null &&
                              <FormattedMessage id="booking.activeResponses.renterReceived"/>
                            }
                            {bookingInfo.owner.userId === user.userId && bookingInfo.booking.ownerStartConfirm === null &&
                              <FormattedMessage id="booking.activeResponses.ownerDelivered"/>
                            }
                          </Header>
                        </Grid.Column>
                        <Grid.Column width={6}>
                          <Button
                            content={formatMessage({id: 'booking.confirmButton'})}
                            icon="checkmark"
                            labelPosition="right"
                            onClick={this.handleItemConfirm}
                            size="huge"
                            positive
                            />
                          <Button
                            content={formatMessage({id: 'booking.rejectButton'})}
                            icon="delete"
                            labelPosition="right"
                            onClick={this.handleItemReject}
                            size="huge"
                            negative
                            />
                        </Grid.Column>
                      </Grid.Row>
                    </Grid>
                  </Segment>
                }
                {bookingInfo.booking.status === 'Complete' &&
                  <Segment size="huge">
                    {bookingInfo.renter.userId === user.userId &&
                      <Grid verticalAlign="middle" columns={3}>
                        {bookingInfo.booking.renterEndConfirm === null &&
                          <Grid.Row>
                            <Grid.Column width={10}>
                              <Header as="h1">
                                <FormattedMessage id="booking.activeResponses.renterDelivered"/>
                              </Header>
                            </Grid.Column>
                            <Grid.Column width={6}>
                              <Button
                                content="Confirm"
                                icon="checkmark"
                                labelPosition="right"
                                onClick={this.handleItemConfirm}
                                size="huge"
                                positive
                                />
                              <Button
                                content="Reject"
                                icon="delete"
                                labelPosition="right"
                                onClick={this.handleItemReject}
                                size="huge"
                                negative
                                />
                            </Grid.Column>
                          </Grid.Row>
                        }
                        {bookingInfo.renter.rating ?
                          <Grid.Row>
                            <Grid.Column width={10}>
                              <Header as="h1">
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
                          </Grid.Row> :
                          <Grid.Row>
                            <Grid.Column width={10}>
                              <Header as="h1">
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
                          </Grid.Row>
                        }
                      </Grid>
                    }
                    {bookingInfo.owner && bookingInfo.owner.userId && user.userId && bookingInfo.owner.userId === user.userId &&
                      <Grid verticalAlign="middle" columns={2}>
                        {bookingInfo.booking.ownerEndConfirm === null &&
                          <Grid.Row>
                            <Grid.Column width={10}>
                              <Header as="h1">
                                <FormattedMessage id="booking.activeResponses.ownerReceived"/>
                              </Header>
                            </Grid.Column>
                            <Grid.Column width={6}>
                              <Button
                                content="Confirm"
                                icon="checkmark"
                                labelPosition="right"
                                onClick={this.handleItemConfirm}
                                size="huge"
                                positive
                                />
                              <Button
                                content="Reject"
                                icon="delete"
                                labelPosition="right"
                                onClick={this.handleItemReject}
                                size="huge"
                                negative
                                />
                            </Grid.Column>
                          </Grid.Row>
                        }
                        {bookingInfo.owner.rating ?
                          <Grid.Row>
                            <Grid.Column width={10}>
                              <Header as="h1">
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
                          <Grid.Row>
                            <Grid.Column width={10}>
                              <Header as="h1">
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
                    }
                  </Segment>
                }
                <Grid verticalAlign="middle">
                  <Grid.Row>
                    <Grid.Column>
                      <Header as="h1" dividing>
                        <FormattedMessage id="booking.bookingTimeTitle"/>
                        <Header.Subheader>
                          <FormattedMessage id="booking.bookingTimeSubTitle"/>
                        </Header.Subheader>
                      </Header>
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row centered columns={2}>
                    <Grid.Column textAlign="center">
                      <Icon name="calendar" size="huge"/>
                      <Statistic>
                        <Statistic.Value className="small">
                          {moment(bookingInfo.booking.startDate).format('MMM Do YYYY, h:mm a')}
                        </Statistic.Value>
                        <Statistic.Label style={styles.subHeader}>
                          <FormattedMessage id="booking.startDate"/>
                        </Statistic.Label>
                      </Statistic>
                    </Grid.Column>
                    <Grid.Column textAlign="center">
                      <Icon name="calendar" size="huge"/>
                      <Statistic>
                        <Statistic.Value className="small">
                          {moment(bookingInfo.booking.endDate).format('MMM Do YYYY, h:mm a')}
                        </Statistic.Value>
                        <Statistic.Label style={styles.subHeader}>
                          <FormattedMessage id="booking.endDate"/>
                        </Statistic.Label>
                      </Statistic>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
                <Grid style={styles.container} verticalAlign="middle">
                  <Grid.Row centered columns={5}>
                    <Grid.Column textAlign="center" width={4}>
                      <Header as="h2">
                        {bookingInfo.renter.firstName} {bookingInfo.renter.lastName}
                        <Header.Subheader>
                          <FormattedMessage id="booking.renter"/>
                        </Header.Subheader>
                      </Header>
                      <Link to={`/user/${bookingInfo.renter.userId}`}>
                        <Image src={BASE_URL + bookingInfo.renter.photoUrl} shape="rounded" bordered fluid/>
                      </Link>
                    </Grid.Column>
                    <Grid.Column textAlign="center" width={2}>
                      <Icon name="long arrow left" size="huge"/>
                    </Grid.Column>
                    <Grid.Column textAlign="center" width={4}>
                      <Header as="h3">
                        {bookingInfo.rentalItem.title}
                        <Header.Subheader>
                          <FormattedMessage id="booking.item"/>
                        </Header.Subheader>
                      </Header>
                      <Link to={`/listings/${bookingInfo.rentalItem.itemId}`}>
                        <Image src={BASE_URL + bookingInfo.rentalItem.photos[0]} shape="rounded" bordered fluid/>
                      </Link>
                    </Grid.Column>
                    <Grid.Column textAlign="center" width={2}>
                      <Icon name="long arrow left" size="huge"/>
                    </Grid.Column>
                    <Grid.Column textAlign="center" width={4}>
                      <Header as="h2">
                        {bookingInfo.owner.firstName} {bookingInfo.owner.lastName}
                        <Header.Subheader>
                          <FormattedMessage id="booking.owner"/>
                        </Header.Subheader>
                      </Header>
                      <Link to={`/user/${bookingInfo.owner.userId}`}>
                        <Image src={BASE_URL + bookingInfo.owner.photoUrl} shape="rounded" bordered fluid/>
                      </Link>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Segment>
            </Container>
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
