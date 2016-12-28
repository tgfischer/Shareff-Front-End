import React, {Component} from 'react';
import {CalendarRange} from '../calendarRange';
import {Accordion, Container, Form, Grid, Header, Icon, Segment} from 'semantic-ui-react';

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

export class Masthead extends Component {
  render() {
    return (
      <Segment style={styles.masthead} vertical>
        <Container text>
          <Form size="huge">
            <Grid verticalAlign="middle" columns={1}>
              <Grid.Row centered>
                <Grid.Column>
                  <Header as="h1" size="huge" className="bold" style={styles.header}>
                    Shareff
                    <Header.Subheader style={styles.subHeader}>
                      Helping you find the things you need
                    </Header.Subheader>
                  </Header>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column>
                  <Form.Input action={{color: "blue", labelPosition: "right", icon: "search", content: "Search", size: "huge"}} name="search" label="Search" type="text"/>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column>
                  <CalendarRange/>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column>
                  <Accordion fluid styled>
                    <Accordion.Title>
                      <Icon name="options"/>
                      Advanced Settings
                    </Accordion.Title>
                    <Accordion.Content>
                      <Form.Input name="location" label="Location" type="text"/>
                    </Accordion.Content>
                  </Accordion>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Form>
        </Container>
      </Segment>
    );
  }
}
