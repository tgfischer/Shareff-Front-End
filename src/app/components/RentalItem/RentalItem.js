import React, {Component} from 'react';
import $ from 'jquery';
import {connect} from 'react-redux';
import {withRouter, Link} from 'react-router';
import validator from 'validator';
import GoogleMap from 'google-map-react';
import moment from 'moment';
import {intlShape, injectIntl, FormattedMessage} from 'react-intl';
import {
  Button, Card, Container, Form, Grid, Header, Icon, Image, Label, Modal,
  Segment, Statistic
} from 'semantic-ui-react';
import NavBar from '../General/NavBar';
import CalendarRange from '../General/CalendarRange';
import PageHeaderSegment from '../General/PageHeaderSegment';
import {Loading} from '../General/Loading';
import {Marker} from '../General/Marker';
import {Thumbnail} from '../General/Thumbnail';
import {getRentalItem, makeRentRequest} from '../../actions/rentalItem';
import {getUser} from '../../actions/auth';
import {BASE_URL, ERROR_PAGE} from '../../constants/constants';

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

class RentalItem extends Component {
  constructor(props) {
    super(props);
    this.handleRequestToRentButton = this.handleRequestToRentButton.bind(this);
    this.handleRequestToEditButton = this.handleRequestToEditButton.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.handleCloseResponseModal = this.handleCloseResponseModal.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleMakeRentRequest = this.handleMakeRentRequest.bind(this);
    this.getCategories = this.getCategories.bind(this);

    this.state = {
      openModal: false,
      openResponseModal: false,
      modalTitle: 'modal.error',
      modalContent: 'error.general',
      isMakeRequestButtonDisabled: true,
      startDate: {},
      endDate: {},
      totalPrice: null
    };
  }
  componentWillMount() {
    // Fetch the rental item using the item ID in the params
    const {itemId} = this.props.params;

    this.props.dispatch(getRentalItem(itemId)).then(() => {
      if (!this.props.user) {
        // Else if the user is authenticated
        const token = localStorage.getItem('token');
        this.props.dispatch(getUser(token));
      }

      // If the item is archived, we don't want the user to view this page
      if (this.props.rentalItem.status === "Archived") {
        this.props.router.push(ERROR_PAGE);
      }
    });
  }
  handleRequestToRentButton() {
    this.setState({openModal: true});
  }
  handleRequestToEditButton() {
    const {itemId} = this.props.params;
    this.props.router.push(`/listings/edit/${itemId}`);
  }
  handleOnChange(startDate, endDate) {
    this.setState({
      isMakeRequestButtonDisabled: !(startDate.date && endDate.date),
      startDate,
      endDate
    });

    if (this.state.startDate.date && this.state.endDate.date) {
      const start = moment(this.state.startDate.date);
      const end = moment(this.state.endDate.date);
      const duration = moment.duration(end.diff(start)).asDays();
      const totalPrice = (duration * this.props.rentalItem.price).toFixed(2);

      this.setState({totalPrice});
    }
  }
  handleCloseModal() {
    this.setState({
      openModal: false,
      isMakeRequestButtonDisabled: true
    });
  }
  handleCloseResponseModal() {
    this.setState({openResponseModal: false});
  }
  handleMakeRentRequest(e) {
    e.preventDefault();

    const {startDate, endDate} = this.state;
    const {user, rentalItem, intl} = this.props;
    const {formatMessage} = intl;

    //
    // Note, I'm using jQuery here because onChange is way too slow, and the
    // submit button is outside the form. Putting it inside the form breaks the
    // modal
    //

    // Make the rent request
    this.props.dispatch(makeRentRequest({
      itemId: rentalItem.itemId,
      renterId: user.userId,
      ownerId: rentalItem.ownerId,
      userId: user.userId,
      startDate: startDate.date,
      endDate: endDate.date,
      message: $('.rent-request-modal textarea').val()
    })).then(({err}) => {
      // Set the modal title
      const title = err ? 'modal.error' : 'modal.success';
      this.setState({modalTitle: formatMessage({id: title})});

      // Set the modal content
      const content = err ? 'error.general' : 'rentalItem.modal.success';
      this.setState({modalContent: formatMessage({id: content})});

      // Open the modal
      this.setState({
        openModal: false,
        openResponseModal: true,
        isMakeRequestButtonDisabled: true
      });
    });
  }
  getCategories(categories) {
    const {formatMessage} = this.props.intl;

    return (
      <Label.Group size="large">
        {categories.map((category, i) => {
          return (
            <Label key={i} className="dark blue">
              {formatMessage({id: category})}
            </Label>
          );
        })}
      </Label.Group>
    );
  }
  render() {
    const {rentalItem, intl, user, isFetching} = this.props;
    const {
      openModal, modalTitle, modalContent, openResponseModal, totalPrice, isMakeRequestButtonDisabled
    } = this.state;
    const {unescape} = validator;
    const {formatMessage} = intl;
    const breadcrumbs = [{
      text: formatMessage({id: 'breadcrumb.home'}),
      to: '/'
    }];

    if (rentalItem) {
      // If the user came from a search, then we want to go back to the place they
      // were at before. Otherwise, don't add this breadcrumb
      if (this.props.location.query && this.props.location.query.q) {
        const {query} = this.props.location;

        breadcrumbs.push({
          text: formatMessage({id: 'listings.title'}, {q: unescape(query.q)}),
          to: {
            pathname: '/listings',
            query
          }
        });
      }

      breadcrumbs.push({
        text: unescape(rentalItem.title)
      });
    }

    return (
      <div style={styles.wrapper}>
        {rentalItem && user ?
          <div>
            <NavBar/>
            {user && user.userId === rentalItem.ownerId ?
              <PageHeaderSegment
                breadcrumbs={breadcrumbs}
                title={unescape(rentalItem.title)}
                subTitle={this.getCategories(rentalItem.category)}
                colour="blue"
                action={{
                  handleButtonClick: this.handleRequestToEditButton,
                  buttonText: formatMessage({id: 'rentalItem.requestToEditButton'}),
                  isButtonInverted: true
                }}
                /> :
              <PageHeaderSegment
                breadcrumbs={breadcrumbs}
                title={unescape(rentalItem.title)}
                subTitle={this.getCategories(rentalItem.category)}
                colour="blue"
                action={{
                  handleButtonClick: this.handleRequestToRentButton,
                  buttonText: formatMessage({id: 'rentalItem.requestToRentButton'}),
                  isButtonInverted: true
                }}
                />
            }
            <Segment className="dark blue" inverted vertical>
              <Container>
                <Grid verticalAlign="middle" stackable>
                  <Grid.Row>
                    <Grid.Column width={3}>
                      <Header as="h2" inverted>
                        <Icon name="user"/>
                        <Header.Content>
                          <FormattedMessage id="rentalItem.ownerTitle"/>
                          <Header.Subheader>
                            <Link to={`/user/${rentalItem.owner.userId}`}>
                              {unescape(rentalItem.owner.firstName)} {unescape(rentalItem.owner.lastName)}
                            </Link>
                          </Header.Subheader>
                        </Header.Content>
                      </Header>
                    </Grid.Column>
                    <Grid.Column width={3}>
                      <Header as="h2" inverted>
                        <Icon name="dollar"/>
                        <Header.Content>
                          <FormattedMessage id="rentalItem.priceTitle"/>
                          <Header.Subheader>
                            <FormattedMessage
                              id="rentalItem.priceContent"
                              values={{
                                price: rentalItem.price,
                                costPeriod: formatMessage({id: unescape(rentalItem.costPeriod)})
                              }}
                              />
                          </Header.Subheader>
                        </Header.Content>
                      </Header>
                    </Grid.Column>
                    <Grid.Column width={4}>
                      <Header as="h2" inverted>
                        <Icon name="thumbs up"/>
                        <Header.Content>
                          <FormattedMessage id="rentalItem.ratingTitle"/>
                          <Header.Subheader>
                            {!rentalItem.rating &&
                              <FormattedMessage id="rentalItem.noRatings"/>
                            }
                          </Header.Subheader>
                        </Header.Content>
                      </Header>
                    </Grid.Column>
                    <Grid.Column width={6}>
                      <Header as="h2" inverted>
                        <Icon name="home"/>
                        <Header.Content>
                          <FormattedMessage id="rentalItem.addressTitle"/>
                          <Header.Subheader>
                            {unescape(rentalItem.line1)} {unescape(rentalItem.line2 || '')}, {unescape(rentalItem.city)} {unescape(rentalItem.province)}, {unescape(rentalItem.postalCode)}
                          </Header.Subheader>
                        </Header.Content>
                      </Header>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Container>
            </Segment>
            <Segment vertical>
              <Container style={styles.container}>
                <Grid stackable>
                  <Grid.Row>
                    <Grid.Column width={10}>
                      <Header as="h1" size="huge">
                        <FormattedMessage id="rentalItem.description"/>
                      </Header>
                      <div
                        dangerouslySetInnerHTML={{__html: unescape(rentalItem.description)}}
                        className="description"
                        />
                    </Grid.Column>
                    <Grid.Column width={6}>
                      <Image src={BASE_URL + rentalItem.photos[0]} shape="rounded" bordered/>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Container>
            </Segment>
            {rentalItem.photos && rentalItem.photos.length !== 0 &&
              <Segment vertical>
                <Container style={styles.container}>
                  <Grid stackable>
                    <Grid.Row columns={1}>
                      <Grid.Column>
                        <Header as="h1" size="huge">
                          <FormattedMessage id="rentalItem.photosTitle"/>
                        </Header>
                      </Grid.Column>
                    </Grid.Row>
                    <Grid.Row columns={1}>
                      <Grid.Column>
                        <Card.Group itemsPerRow={5}>
                          {rentalItem.photos.map((photo, i) => {
                            return (
                              <Thumbnail key={i} src={BASE_URL + photo} height={250}/>
                            );
                          })}
                        </Card.Group>
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
                </Container>
              </Segment>
            }
            <Segment style={styles.mapSegment} vertical>
              <GoogleMap
                bootstrapURLKeys={{key: process.env.GOOGLE_MAPS_API_KEY}}
                center={[rentalItem.latitude, rentalItem.longitude]}
                options={{scrollwheel: false}}
                zoom={14}
                >
                <Marker lat={rentalItem.latitude} lng={rentalItem.longitude}/>
              </GoogleMap>
            </Segment>
            <Segment vertical>
              <Container style={styles.container}>
                <Grid stackable>
                  <Grid.Row columns={1}>
                    <Grid.Column>
                      <Header as="h1" size="huge">
                        <FormattedMessage id="rentalItem.termsOfUse"/>
                      </Header>
                      <div
                        dangerouslySetInnerHTML={{__html: unescape(rentalItem.termsOfUse)}}
                        className="terms"
                        />
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Container>
            </Segment>
          </div> :
          <Loading/>
        }
        <Modal size="small" dimmer="blurring" open={openModal} onClose={this.handleCloseModal}>
          <Modal.Header>
            <Header as="h1">
              <FormattedMessage id="rentalItem.modal.title"/>
            </Header>
          </Modal.Header>
          <Modal.Content>
            <Form onSubmit={this.handleMakeRentRequest} loading={isFetching} size="huge">
              <Grid stackable>
                <Grid.Row columns={1}>
                  <Grid.Column>
                    <Header as="h3">
                      <FormattedMessage id="rentalItem.modal.description"/>
                    </Header>
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row columns={1}>
                  <Grid.Column>
                    <CalendarRange onChange={this.handleOnChange}/>
                    <Form.TextArea
                      name="message"
                      label={formatMessage({id: 'rentalItem.modal.messageLabel'})}
                      placeholder={formatMessage({id: 'rentalItem.modal.messagePlaceholder'})}
                      rows="5"
                      />
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row columns={1}>
                  <Grid.Column textAlign="center">
                    <Statistic value={isMakeRequestButtonDisabled ? '--' : `$${totalPrice}`} label={formatMessage({id: 'rentalItem.modal.cost'})}/>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Form>
          </Modal.Content>
          <Modal.Actions>
            <Button
              content={formatMessage({id: 'rentalItem.modal.makeRequestButton'})}
              disabled={isMakeRequestButtonDisabled}
              onClick={this.handleMakeRentRequest}
              size="huge"
              primary
              />
            <Button
              content={formatMessage({id: 'modal.cancel'})}
              onClick={this.handleCloseModal}
              size="huge"
              basic
              />
          </Modal.Actions>
        </Modal>
        <Modal size="small" dimmer="blurring" open={openResponseModal} onClose={this.handleCloseResponseModal}>
          <Modal.Header>
            <Header as="h1">
              {modalTitle}
            </Header>
          </Modal.Header>
          <Modal.Content>
            <Header as="h3">
              {modalContent}
            </Header>
          </Modal.Content>
          <Modal.Actions>
            <Button
              content={formatMessage({id: 'modal.okay'})}
              onClick={this.handleCloseResponseModal}
              size="huge"
              primary
              />
          </Modal.Actions>
        </Modal>
      </div>
    );
  }
}

/* eslint-enable react/no-danger */

RentalItem.propTypes = {
  intl: intlShape.isRequired,
  isAuthenticated: React.PropTypes.bool,
  isFetching: React.PropTypes.bool,
  router: React.PropTypes.object,
  rentalItem: React.PropTypes.object,
  err: React.PropTypes.object,
  dispatch: React.PropTypes.func.isRequired,
  user: React.PropTypes.object,
  params: React.PropTypes.object.isRequired,
  location: React.PropTypes.object
};

const mapStateToProps = state => {
  const {reducers} = state;
  const {isAuthenticated, isFetching, user, rentalItem, err} = reducers;

  return {
    isAuthenticated,
    isFetching,
    rentalItem,
    user,
    err
  };
};

export default connect(mapStateToProps)(withRouter(injectIntl(RentalItem)));
