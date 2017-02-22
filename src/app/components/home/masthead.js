import React, {Component} from 'react';
import {withRouter} from 'react-router';
import {intlShape, injectIntl, FormattedMessage} from 'react-intl';
import {Accordion, Container, Form, Grid, Header, Icon, Segment} from 'semantic-ui-react';
import CalendarRange from '../General/CalendarRange';
import MaxPriceSlider from '../General/Sliders/MaxPriceSlider';
import MaxDistanceSlider from '../General/Sliders/MaxDistanceSlider';

const styles = {
  masthead: {
    paddingTop: "8em"
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
    const {formatMessage} = this.props.intl;

    return (
      <Segment style={styles.masthead} vertical>
        <Container text>
          <Form size="huge" onSubmit={this.handleOnSubmit}>
            <Grid verticalAlign="middle" columns={1}>
              <Grid.Row centered>
                <Grid.Column>
                  <Header as="h1" size="huge" className="bold" style={styles.header}>
                    <FormattedMessage id="masthead.title"/>
                    <Header.Subheader style={styles.subHeader}>
                      <FormattedMessage id="masthead.desc"/>
                    </Header.Subheader>
                  </Header>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column>
                  <Form.Input
                    action={{color: "blue", labelPosition: "right", icon: "search", content: formatMessage({id: 'masthead.search'}), size: "huge"}}
                    name="q"
                    label="Search"
                    type="text"
                    />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column>
                  <CalendarRange/>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column>
                  <Accordion onTitleClick={this.handleToggleAdvancedSettings} fluid styled>
                    <Accordion.Title>
                      <Icon name="options"/>
                      <FormattedMessage id="masthead.advancedSettings"/>
                    </Accordion.Title>
                    <Accordion.Content>
                      {showAdvancedSettings &&
                        <div>
                          <Form.Input name="location" label={formatMessage({id: 'masthead.location'})} type="text"/>
                          <Form.Group widths="equal">
                            <MaxPriceSlider colour="blue"/>
                            <MaxDistanceSlider colour="blue"/>
                          </Form.Group>
                        </div>
                      }
                    </Accordion.Content>
                  </Accordion>
                </Grid.Column>
              </Grid.Row>
            </Grid>
            <input name="page" type="text" defaultValue="0" style={{display: 'none'}}/>
          </Form>
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
