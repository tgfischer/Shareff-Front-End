import React, {Component} from 'react';
import {withRouter} from 'react-router';
import {intlShape, injectIntl, FormattedMessage} from 'react-intl';
import {Accordion, Container, Dropdown, Form, Grid, Header, Icon, Segment} from 'semantic-ui-react';
import CalendarRange from '../General/CalendarRange';
import MaxPriceSlider from '../General/Sliders/MaxPriceSlider';
import MaxDistanceSlider from '../General/Sliders/MaxDistanceSlider';
import {getOptions} from '../../utils/Utils';
import {categories} from '../../constants/constants';

const styles = {
  masthead: {
    display: 'flex',
    justifyContent: 'center',
    flex: '1',
    padding: '1em 0'
  },
  grid: {
    minHeight: '100%'
  },
  header: {
    fontSize: "3em"
  },
  subHeader: {
    fontSize: "0.5em"
  }
};

class Masthead extends Component {
  constructor(props) {
    super(props);
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
    this.handleToggleAdvancedSettings = this.handleToggleAdvancedSettings.bind(this);

    this.state = {
      showAdvancedSettings: false
    };
  }
  handleOnSubmit(e, {formData}) {
    e.preventDefault();

    // Delete this random field that is added
    delete formData['category-search'];

    // Transition to the listings page, with the query params
    this.props.router.push({
      pathname: '/listings',
      query: formData
    });
  }
  handleToggleAdvancedSettings() {
    this.setState({showAdvancedSettings: !this.state.showAdvancedSettings});
  }
  render() {
    const {showAdvancedSettings} = this.state;
    const {intl} = this.props;
    const {formatMessage} = intl;

    return (
      <Segment style={styles.masthead} vertical>
        <Container text>
          <Grid verticalAlign="middle" style={styles.grid}>
            <Grid.Row>
              <Grid.Column>
                <Header as="h1" size="huge" className="bold" style={styles.header} textAlign="center">
                  <FormattedMessage id="masthead.title"/>
                  <Header.Subheader style={styles.subHeader}>
                    <FormattedMessage id="masthead.desc"/>
                  </Header.Subheader>
                </Header>
                <Form size="huge" onSubmit={this.handleOnSubmit} style={styles.minHeight}>
                  <Form.Input
                    action={{color: "blue", labelPosition: "right", icon: "search", content: formatMessage({id: 'masthead.search'}), size: "huge"}}
                    name="q"
                    label="Search"
                    type="text"
                    />
                  <CalendarRange/>
                  <Accordion onTitleClick={this.handleToggleAdvancedSettings} fluid styled>
                    <Accordion.Title>
                      <Icon name="options"/>
                      <FormattedMessage id="masthead.advancedSettings"/>
                    </Accordion.Title>
                    <Accordion.Content>
                      {showAdvancedSettings &&
                        <div>
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
                                options={getOptions({values: categories, intl})}
                                />
                            </div>
                            <Form.Input
                              name="location"
                              placeholder={formatMessage({id: 'masthead.location'})}
                              label={formatMessage({id: 'masthead.location'})}
                              type="text"
                              />
                          </Form.Group>
                          <Form.Group widths="equal">
                            <MaxPriceSlider colour="blue"/>
                            <MaxDistanceSlider colour="blue"/>
                          </Form.Group>
                        </div>
                      }
                    </Accordion.Content>
                  </Accordion>
                  <input name="page" type="text" defaultValue="0" style={{display: 'none'}}/>
                </Form>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      </Segment>
    );
  }
}

Masthead.propTypes = {
  intl: intlShape.isRequired,
  router: React.PropTypes.object.isRequired
};

export default withRouter(injectIntl(Masthead));
