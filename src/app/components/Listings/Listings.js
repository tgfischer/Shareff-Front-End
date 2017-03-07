import React, {Component} from 'react';
import {withRouter} from 'react-router';
import {connect} from 'react-redux';
import {
  Button, Container, Form, Grid, Header, Icon, Popup, Segment, Dropdown
} from 'semantic-ui-react';
import {intlShape, injectIntl, FormattedMessage} from 'react-intl';
import CoreLayout from '../../layouts/CoreLayout';
import CalendarRange from '../General/CalendarRange';
import MaxPriceSlider from '../General/Sliders/MaxPriceSlider';
import MaxDistanceSlider from '../General/Sliders/MaxDistanceSlider';
import PageHeaderSegment from '../General/PageHeaderSegment';
import NoItemsFound from './NoItemsFound';
import Item from './Item';
import {Loading} from '../General/Loading';
import {getListings} from '../../actions/listings';
import {categories} from '../../constants/constants';
import {getOptions} from '../../utils/Utils';

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
  constructor(props) {
    super(props);
    this.handleToggleAdvancedSettings = this.handleToggleAdvancedSettings.bind(this);
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
    this.handlePrevClick = this.handlePrevClick.bind(this);
    this.handleNextClick = this.handleNextClick.bind(this);
    this.navigateToPage = this.navigateToPage.bind(this);
    this.handleInputOnChange = this.handleInputOnChange.bind(this);
    this.getListings = this.getListings.bind(this);
    this.getInputRef = this.getInputRef.bind(this);

    this.state = {
      listings: null,
      advancedSettings: 'hidden',
      numPerPage: 0,
      totalNumListings: 0,
      options: []
    };
  }
  componentWillMount() {
    const {intl, location} = this.props;
    const {query} = location;

    this.props.dispatch(getListings(query)).then(({listings, numPerPage, totalNumListings}) => this.setState({
      listings,
      numPerPage,
      totalNumListings,
      options: getOptions({values: categories, intl})
    }));
  }
  handleToggleAdvancedSettings() {
    // Get the class name
    const {advancedSettings} = this.state;

    // Toggle the visibility of the advanced settings section
    this.setState({advancedSettings: advancedSettings ? null : 'hidden'});
  }
  handleOnSubmit(e, {formData}) {
    // Reset the search to page 0
    formData.page = 0;

    this.navigateToPage(e, {
      formData
    });
  }
  handleInputOnChange(e, {value}) {
    this.input.value = value;
  }
  handlePrevClick(e) {
    const {query} = this.props.location;

    // Go to the previous page
    query.page = query.page ? --query.page : 0;

    this.navigateToPage(e, {
      formData: query
    });
  }
  handleNextClick(e) {
    const {query} = this.props.location;

    // Go to the next page
    query.page = query.page ? ++query.page : 0;

    this.navigateToPage(e, {
      formData: query
    });
  }
  navigateToPage(e, {formData}) {
    e.preventDefault();

    const {router, dispatch} = this.props;
    const {advancedSettings} = this.state;

    // Delete this random field thatis added
    delete formData["category-search"];

    if (advancedSettings === 'hidden') {
      this.getListings({router, dispatch, formData});
    } else {
      navigator.geolocation.getCurrentPosition(({coords}) => {
        // Add the geolocation to the request
        formData.latitude = coords.latitude;
        formData.longitude = coords.longitude;

        this.getListings({router, dispatch, formData});
      }, err => {
        console.error(err);
      }, {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      });
    }
  }
  getListings({router, dispatch, formData}) {
    // Transition to the listings page, with the query params
    router.push({
      pathname: '/listings',
      query: formData
    });

    // Get the search results
    dispatch(getListings(formData)).then(({listings, numPerPage, totalNumListings}) => this.setState({
      listings,
      numPerPage,
      totalNumListings
    }));
  }
  getInputRef(input) {
    this.input = input;
  }
  render() {
    const {intl, isFetching} = this.props;
    const {listings, numPerPage, totalNumListings, advancedSettings, options} = this.state;
    const {formatMessage} = intl;
    const {q, startDate, endDate, category, location, maxPrice, maxDistance, page} = this.props.location.query;

    const breadcrumbs = [{
      text: formatMessage({id: 'breadcrumb.home'}),
      to: '/'
    }, {
      text: formatMessage({id: 'listings.title'}, {q: unescape(q)})
    }];

    return (
      <div style={styles.wrapper}>
        {listings ?
          <CoreLayout>
            <PageHeaderSegment
              breadcrumbs={breadcrumbs}
              title={formatMessage({id: 'listings.title'}, {q: unescape(q || '')})}
              colour="blue"
              />
            <Segment className="dark blue" inverted vertical>
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
                            <Form.Group widths="equal">
                              <div className="field">
                                <label>
                                  <FormattedMessage id="addItem.category"/>
                                </label>
                                <Dropdown
                                  name="category"
                                  placeholder={formatMessage({id: 'addItem.category'})}
                                  fluid
                                  multiple
                                  labeled
                                  selection
                                  search
                                  options={options}
                                  defaultValue={category}
                                  />
                              </div>
                              <Form.Input
                                name="location"
                                placeholder={formatMessage({id: 'masthead.location'})}
                                defaultValue={unescape(location || '')}
                                label={formatMessage({id: 'masthead.location'})}
                                type="text"
                                />
                            </Form.Group>
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
            {isFetching &&
              <Segment style={{paddingTop: '3em'}} size="huge" basic loading/>
            }
            {!isFetching && listings.length === 0 &&
              <NoItemsFound/>
            }
            {!isFetching && listings.map((item, i) => {
              return (
                <Item
                  isAlternate={i % 2 !== 0}
                  item={item}
                  key={i}
                  search={this.props.location.query}
                  />
              );
            })}
            {!isFetching && listings.length > 0 &&
              <Segment vertical>
                <Container>
                  <Grid stackable>
                    <Grid.Row>
                      <Grid.Column>
                        <Button
                          content={formatMessage({id: 'listings.prev'})}
                          onClick={this.handlePrevClick}
                          disabled={Number(page) === 0}
                          icon="left arrow"
                          labelPosition="left"
                          floated="left"
                          size="huge"
                          basic
                          />
                        <Button
                          content={formatMessage({id: 'listings.next'})}
                          onClick={this.handleNextClick}
                          disabled={(Number(page) + 1) * numPerPage >= totalNumListings}
                          icon="right arrow"
                          labelPosition="right"
                          floated="right"
                          size="huge"
                          basic
                          />
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
                </Container>
              </Segment>
            }
          </CoreLayout> :
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
