import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link, withRouter} from 'react-router';
import validator from 'validator';
import GoogleMap from "google-map-react";
import {intlShape, injectIntl, FormattedMessage} from 'react-intl';
import {
  Breadcrumb, Button, Container, Grid, Header, Image, Segment
} from 'semantic-ui-react';
import NavBar from '../General/NavBar';
import {Loading} from '../General/Loading';
import {Marker} from '../General/Marker';
import {getRentalItem} from '../../actions/rentalItem';
import {PHOTO_PLACEHOLDER_URL} from '../../constants/constants';

const styles = {
  wrapper: {
    height: '100%'
  },
  container: {
    paddingTop: '2em'
  },
  paragraph: {
    fontSize: '1.5em'
  },
  mapSegment: {
    height: '450px',
    padding: '1em 0 0 0'
  }
};

class RentalItem extends Component {
  componentDidMount() {
    // Fetch the rental item using the item ID in the params
    const {itemId} = this.props.params;
    this.props.dispatch(getRentalItem(itemId));
  }
  render() {
    const {rentalItem} = this.props;
    const {unescape} = validator;

    return (
      <div style={styles.wrapper}>
        {rentalItem ?
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
                    <Grid.Column width={8}>
                      <Header as="h1" size="huge" className="bold" inverted>
                        {unescape(rentalItem.title)}
                      </Header>
                    </Grid.Column>
                    <Grid.Column width={4} floated="right">
                      <Button size="big" fluid inverted>
                        <FormattedMessage id="rentalItem.messageOwnerButton"/>
                      </Button>
                    </Grid.Column>
                    <Grid.Column width={4} floated="right">
                      <Button size="big" color="green" fluid>
                        <FormattedMessage id="rentalItem.requestToRentButton"/>
                      </Button>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Container>
            </Segment>
            <Container style={styles.container}>
              <Grid stackable>
                <Grid.Row>
                  <Grid.Column width={12}>
                    <Header as="h1" size="huge" dividing>
                      <FormattedMessage id="rentalItem.description"/>
                    </Header>
                    <p style={styles.paragraph}>
                      {unescape(rentalItem.description)}
                    </p>
                    <Header as="h1" size="huge" dividing>
                      <FormattedMessage id="rentalItem.termsOfUse"/>
                    </Header>
                    <p style={styles.paragraph}>
                      {unescape(rentalItem.termsOfUse)}
                    </p>
                  </Grid.Column>
                  <Grid.Column width={4}>
                    {rentalItem.photos.length === 0 &&
                      <Image src={PHOTO_PLACEHOLDER_URL} shape="rounded" bordered/>
                    }
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Container>
            <Segment style={styles.mapSegment} vertical>
              <GoogleMap
                bootstrapURLKeys={{key: process.env.GOOGLE_MAPS_API_KEY}}
                center={[rentalItem.latitude, rentalItem.longitude]}
                zoom={14}
                >
                <Marker lat={rentalItem.latitude} lng={rentalItem.longitude}/>
              </GoogleMap>
            </Segment>
          </div> :
          <Loading/>
        }
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
