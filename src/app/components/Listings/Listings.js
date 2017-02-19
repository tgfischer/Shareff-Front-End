import React, {Component} from 'react';
import {withRouter} from 'react-router';
import {connect} from 'react-redux';
import {
  Button, Container, Form, Grid, Header, Icon, Popup, Segment
} from 'semantic-ui-react';
import {intlShape, injectIntl, FormattedMessage} from 'react-intl';
import NavBar from '../General/NavBar';
import CalendarRange from '../General/CalendarRange';
import MaxPriceSlider from '../General/Sliders/MaxPriceSlider';
import MaxDistanceSlider from '../General/Sliders/MaxDistanceSlider';
import PageHeaderSegment from '../General/PageHeaderSegment';
import NoItemsFound from './NoItemsFound';
import Item from './Item';
import {Loading} from '../General/Loading';
import {getListings} from '../../actions/listings';

const styles = {
  wrapper: {
    height: '100%'
  },
  container: {
    paddingTop: '2em'
  },
  calendarRange: {
    marginBottom: '0'
  }
};

class Listings extends Component {
  state = {
    listings: null,
    advancedSettings: 'hidden'
  }
  constructor(props) {
    super(props);
    this.handleToggleAdvancedSettings = ::this.handleToggleAdvancedSettings;
    this.handleOnSubmit = ::this.handleOnSubmit;
    this.handleInputOnChange = ::this.handleInputOnChange;
    this.getInputRef = ::this.getInputRef;
  }
  componentWillMount() {
    const {q, startDate, endDate, location, maxPrice, maxDistance} = this.props.location.query;

    this.props.dispatch(getListings({
      q, startDate, endDate, location, maxPrice, maxDistance
    })).then(result => this.setState({listings: result.listings}));
  }
  handleToggleAdvancedSettings() {
    // Get the class name
    const {advancedSettings} = this.state;

    // Toggle the visibility of the advanced settings section
    this.setState({advancedSettings: advancedSettings ? null : 'hidden'});
  }
  handleOnSubmit(e, {formData}) {
    e.preventDefault();

    const {q, startDate, endDate, location, maxPrice, maxDistance} = formData;
    const {router, dispatch} = this.props;

    dispatch(getListings({
      q, startDate, endDate, location, maxPrice, maxDistance
    })).then(result => {
      router.push({
        pathname: '/listings',
        query: formData
      });
      this.setState({listings: result.listings});
    });
  }
  handleInputOnChange(e, {value}) {
    this.input.value = value;
  }
  getInputRef(input) {
    this.input = input;
  }
  render() {
    const {intl, isFetching} = this.props;
    const {listings, advancedSettings} = this.state;
    const {formatMessage} = intl;
    const {q, startDate, endDate, location, maxPrice, maxDistance} = this.props.location.query;

    const breadcrumbs = [{
      text: formatMessage({id: 'breadcrumb.home'}),
      to: '/'
    }, {
      text: formatMessage({id: 'listings.title'}, {q: unescape(q)})
    }];

    return (
      <div style={styles.wrapper}>
        {listings && !isFetching ?
          <div>
            <NavBar/>
            <PageHeaderSegment
              breadcrumbs={breadcrumbs}
              title={formatMessage({id: 'listings.title'}, {q: unescape(q || '')})}
              colour="blue"
              />
            <Segment className="dark blue" loading={isFetching} inverted vertical>
              <Container>
                <Form onSubmit={this.handleOnSubmit} size="huge" className="inverted">
                  <Grid verticalAlign="middle" stackable>
                    <Grid.Row>
                      <Grid.Column>
                        <Form.Input name="q" type="text" action fluid>
                          <input onChange={this.handleInputOnChange} value={unescape(q || '')} ref={this.getInputRef}/>
                          <Popup
                            trigger={
                              <Button onClick={this.handleToggleAdvancedSettings} size="huge" type="button" icon inverted>
                                <Icon name="options"/>
                              </Button>
                            }
                            content={formatMessage({id: 'masthead.advancedSettings'})}
                            inverted
                            />

                          <Button type="submit" labelPosition="right" icon="search" content={formatMessage({id: 'masthead.search'})} size="huge" inverted/>
                        </Form.Input>
                        <CalendarRange defaultValues={{startDate, endDate}} style={styles.calendarRange}/>
                      </Grid.Column>
                    </Grid.Row>
                    <Grid.Row className={advancedSettings}>
                      <Grid.Column>
                        {advancedSettings !== 'hidden' &&
                          <div>
                            <Header as="h2" className="bold" inverted>
                              <FormattedMessage id="masthead.advancedSettings"/>
                            </Header>
                            <Form.Input name="location" defaultValue={unescape(location || '')} label={formatMessage({id: 'masthead.location'})} type="text"/>
                            <Form.Group widths="equal">
                              <MaxPriceSlider colour="green" defaultValue={unescape(maxPrice || '')}/>
                              <MaxDistanceSlider colour="green" defaultValue={unescape(maxDistance || '')}/>
                            </Form.Group>
                          </div>
                        }
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
                </Form>
              </Container>
            </Segment>
            {listings.length === 0 &&
              <NoItemsFound/>
            }
            {listings.map((item, i) => {
              return (
                <Item
                  isAlternate={i % 2 !== 0}
                  item={item}
                  key={i}
                  search={this.props.location.query}
                  />
              );
            })}
          </div> :
          <Loading/>
        }
      </div>
    );
  }
}

Listings.propTypes = {
  intl: intlShape.isRequired,
  isFetching: React.PropTypes.bool.isRequired,
  router: React.PropTypes.object.isRequired,
  dispatch: React.PropTypes.func.isRequired,
  err: React.PropTypes.object,
  location: React.PropTypes.object.isRequired
};

const mapStateToProps = state => {
  const {reducers} = state;
  const {isFetching, err} = reducers;

  return {
    isFetching,
    err
  };
};

export default connect(mapStateToProps)(withRouter(injectIntl(Listings)));
