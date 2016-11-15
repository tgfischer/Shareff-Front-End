import React, {Component} from 'react';
import {Container, Form, Grid, Header, Segment} from 'semantic-ui-react';

const styles = {
  masthead: {
    "padding-top": "8em"
  }
};

export class Masthead extends Component {
  render() {
    return (
      <Segment style={styles.masthead} vertical>
        <Container text>
          <Grid verticalAlign="middle" columns={1}>
            <Grid.Row centered>
              <Grid.Column>
                <Header as="h1" size="huge">
                  Shareff
                  <Header.Subheader>
                    Helping you find the things you need
                  </Header.Subheader>
                </Header>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                <Form size="huge">
                  <Form.Input label="Search" type="text"/>
                </Form>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      </Segment>
    );
  }
}
