import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link, withRouter} from 'react-router';
import validator from 'validator';
import GoogleMap from 'google-map-react';
import moment from 'moment';
import {intlShape, injectIntl, FormattedMessage} from 'react-intl';
import {
  Breadcrumb, Button, Container, Form, Grid, Header, Icon, Image, Modal, Segment
} from 'semantic-ui-react';
import NavBar from '../General/NavBar';
import CalendarRange from '../General/CalendarRange';
import {Loading} from '../General/Loading';
import {Marker} from '../General/Marker';
import {getRentalItem, makeRentRequest} from '../../actions/rentalItem';
import {getUser} from '../../actions/auth';
import {PHOTO_PLACEHOLDER_URL} from '../../constants/constants';

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

class RentalItem extends Component {
  state = {
    openModal: false,
    openResponseModal: false,
    modalTitle: 'modal.error',
    modalContent: 'error.general',
    isMakeRequestButtonDisabled: true,
    startDate: {},
    endDate: {},
    totalPrice: null
  }
  constructor(props) {
    super(props);
    this.handleRequestToRentButton = this.handleRequestToRentButton.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleMakeRentRequest = this.handleMakeRentRequest.bind(this);
  }
  componentDidMount() {
    // Fetch the rental item using the item ID in the params
    const {itemId} = this.props.params;

    this.props.dispatch(getRentalItem(itemId)).then(() => {
      if (!this.props.user) {
        // Else if the user is authenticated
        const token = localStorage.getItem('token');
        this.props.dispatch(getUser(token));
      }
    });
  }
  handleRequestToRentButton = () => this.setState({openModal: true})
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
  handleCloseModal = () => this.setState({
    openModal: false,
    isMakeRequestButtonDisabled: true
  })
  handleCloseResponseModal = () => this.setState({openResponseModal: false})
  handleMakeRentRequest(e) {
    e.preventDefault();

    const {startDate, endDate} = this.state;
    const {user, rentalItem, intl} = this.props;
    const {formatMessage} = intl;

    // Make the rent request
    this.props.dispatch(makeRentRequest({
      itemId: rentalItem.itemId,
      userId: user.userId,
      startDate: startDate.date,
      endDate: endDate.date
    })).then(err => {
      // Set the modal title
      const title = err ? 'modal.error' : 'modal.success';
      this.setState({modalTitle: formatMessage({id: title})});

      // Set the modal content
      const content = err ? 'error.general' : 'modal.makeRentRequestSuccess';
      this.setState({modalContent: formatMessage({id: content})});

      // Open the modal
      this.setState({
        openModal: false,
        openResponseModal: true,
        isMakeRequestButtonDisabled: true
      });
    });
  }
  render() {
    const {rentalItem, intl, user, isFetching} = this.props;
    const {
      openModal, modalTitle, modalContent, openResponseModal, totalPrice, isMakeRequestButtonDisabled
    } = this.state;
    const {unescape} = validator;
    const {formatMessage} = intl;

    return (
      <div style={styles.wrapper}>
        {rentalItem && user ?
          <div>
            <NavBar/>
            <Segment className="page-header" color="blue" inverted vertical>
              <Container>
                <Grid stackable>
                  <Grid.Row>
                    <Breadcrumb>
                      <Breadcrumb.Section as={Link} to="/">
                        <FormattedMessage id="breadcrumb.home"/>
                      </Breadcrumb.Section>
                      <Breadcrumb.Divider icon="right angle"/>
                      <Breadcrumb.Section as={Link} to="/listings">
                        <FormattedMessage id="breadcrumb.listings"/>
                      </Breadcrumb.Section>
                      <Breadcrumb.Divider icon="right angle"/>
                      <Breadcrumb.Section active>
                        {unescape(rentalItem.title)}
                      </Breadcrumb.Section>
                    </Breadcrumb>
                  </Grid.Row>
                  <Grid.Row verticalAlign="middle">
                    <Grid.Column width={13}>
                      <Header as="h1" size="huge" className="bold" inverted>
                        {unescape(rentalItem.title)}
                      </Header>
                    </Grid.Column>
                    <Grid.Column width={3} floated="right">
                      {user && user.userId !== rentalItem.ownerId &&
                        <Button onClick={this.handleRequestToRentButton} size="big" inverted fluid>
                          <FormattedMessage id="rentalItem.requestToRentButton"/>
                        </Button>
                      }
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Container>
            </Segment>
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
                            {rentalItem.owner.firstName} {rentalItem.owner.lastName}
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
                            <FormattedMessage id="rentalItem.priceContent" values={{price: rentalItem.price}}/>
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
                            {rentalItem.line1} {rentalItem.line2}, {rentalItem.city} {rentalItem.province}, {rentalItem.postalCode}
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
                      <p style={styles.paragraph}>
                        {unescape(rentalItem.description)}
                      </p>
                    </Grid.Column>
                    <Grid.Column width={6}>
                      <Image src={PHOTO_PLACEHOLDER_URL} shape="rounded" bordered/>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Container>
            </Segment>
            {rentalItem.photos.length !== 0 &&
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
                    <Grid.Row columns={5}>
                      <Grid.Column>
                        <Image src={PHOTO_PLACEHOLDER_URL} shape="rounded" bordered/>
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
                      <p style={styles.paragraph}>
                        {unescape(rentalItem.termsOfUse)}
                      </p>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Container>
            </Segment>
          </div> :
          <Loading/>
        }
        <Modal dimmer="blurring" open={openModal} onClose={this.handleCloseModal}>
          <Modal.Header>
            <Header as="h1">
              <FormattedMessage id="modal.requestToRentTitle"/>
            </Header>
          </Modal.Header>
          <Modal.Content>
            <Form onSubmit={this.handleMakeRentRequest} loading={isFetching} size="huge">
              <Grid stackable>
                <Grid.Row columns={1}>
                  <Grid.Column>
                    <Header as="h3">
                      <FormattedMessage id="modal.requestToRentDetails"/>
                    </Header>
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row columns={1}>
                  <Grid.Column>
                    <CalendarRange onChange={this.handleOnChange}/>
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row columns={1}>
                  <Grid.Column>
                    <Header as="h3" className="bold">
                      {isMakeRequestButtonDisabled &&
                        <FormattedMessage id="modal.invalidDates"/>
                      }
                      {!isMakeRequestButtonDisabled &&
                        <FormattedMessage id="modal.requestPriceTitle" values={{price: totalPrice}}/>
                      }
                    </Header>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Form>
          </Modal.Content>
          <Modal.Actions>
            <Button
              content={formatMessage({id: 'modal.makeRequest'})}
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

RentalItem.propTypes = {
  intl: intlShape.isRequired,
  isAuthenticated: React.PropTypes.bool,
  isFetching: React.PropTypes.bool,
  router: React.PropTypes.object,
  rentalItem: React.PropTypes.object,
  err: React.PropTypes.object,
  dispatch: React.PropTypes.func.isRequired,
  user: React.PropTypes.object,
  params: React.PropTypes.object.isRequired
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
