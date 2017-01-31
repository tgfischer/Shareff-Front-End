import React, {Component} from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {
  Breadcrumb, Button, Container, Form, Grid, Header, Icon, Segment
} from 'semantic-ui-react';
import {intlShape, injectIntl, FormattedMessage} from 'react-intl';
import NavBar from '../General/NavBar';
import CalendarRange from '../General/CalendarRange';
import MaxPriceSlider from '../General/Sliders/MaxPriceSlider';
import {Loading} from '../General/Loading';
import {getListings} from '../../actions/listings';

const styles = {
  wrapper: {
    height: '100%'
  },
  container: {
    paddingTop: '2em'
  }
};

class Listings extends Component {
  state = {
    listings: null,
    advancedSettings: 'hidden'
  }
  constructor(props) {
    super(props);
    this.handleToggleAdvancedSettings = this.handleToggleAdvancedSettings.bind(this);
  }
  componentWillMount() {
    const {q, startDate, endDate, location} = this.props.location.query;

    this.props.dispatch(getListings({
      q, startDate, endDate, location
    })).then(listings => this.setState({listings}));
  }
  handleToggleAdvancedSettings(e) {
    e.preventDefault();

    // Get the class name
    const {advancedSettings} = this.state;

    // Toggle the visibility of the advanced settings section
    this.setState({advancedSettings: advancedSettings ? null : 'hidden'});
  }
  render() {
    const {location, intl} = this.props;
    const {listings, advancedSettings} = this.state;
    const {formatMessage} = intl;
    const {q} = location.query;

    return (
      <div style={styles.wrapper}>
        {listings ?
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
                          <FormattedMessage id="listings.title" values={{q: unescape(q)}}/>
                        </Breadcrumb.Section>
                      </Breadcrumb>
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row>
                    <Grid.Column>
                      <Header as="h1" size="huge" className="bold" inverted>
                        <FormattedMessage id="listings.title" values={{q: unescape(q)}}/>
                      </Header>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Container>
            </Segment>
            <Segment className="dark blue" inverted vertical>
              <Container>
                <Form size="huge" className="inverted">
                  <Grid verticalAlign="middle" stackable>
                    <Grid.Row>
                      <Grid.Column>
                        <Form.Input defaultValue={unescape(q)} name="q" type="text" action fluid>
                          <input/>
                          <Button onClick={this.handleToggleAdvancedSettings} size="huge" icon inverted>
                            <Icon name="options"/>
                          </Button>
                          <Button labelPosition="right" icon="search" content={formatMessage({id: 'masthead.search'})} size="huge" inverted/>
                        </Form.Input>
                      </Grid.Column>
                    </Grid.Row>
                    <Grid.Row className={advancedSettings}>
                      <Grid.Column>
                        {advancedSettings !== 'hidden' &&
                          <div>
                            <Header as="h2" className="bold" inverted>
                              <FormattedMessage id="masthead.advancedSettings"/>
                            </Header>
                            <CalendarRange/>
                            <Form.Input name="location" label={formatMessage({id: 'masthead.location'})} type="text"/>
                            <MaxPriceSlider/>
                          </div>
                        }
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
                </Form>
              </Container>
            </Segment>
          </div> :
          <Loading/>
        }
      </div>
    );
  }
}

Listings.propTypes = {
  intl: intlShape.isRequired,
  isFetching: React.PropTypes.bool,
  router: React.PropTypes.object,
  dispatch: React.PropTypes.func.isRequired,
  err: React.PropTypes.object,
  location: React.PropTypes.object
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
