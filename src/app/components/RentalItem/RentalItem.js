import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link, withRouter} from 'react-router';
import validator from 'validator';
import {intlShape, injectIntl, FormattedMessage} from 'react-intl';
import {
  Breadcrumb, Container, Grid, Header, Image, Segment
} from 'semantic-ui-react';
import NavBar from '../General/NavBar';
import {Loading} from '../General/Loading';
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
                    <Grid.Column>
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

                      <Header as="h1" size="huge" className="bold" inverted>
                        {unescape(rentalItem.title)}
                      </Header>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Container>
            </Segment>
            <Container style={styles.container}>
              <Grid>
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
