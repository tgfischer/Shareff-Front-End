import React, {Component} from 'react';
import {NavBar} from '../navbar';
import {Button, Container, Form, Grid, Header, Message, Segment} from 'semantic-ui-react';

const styles = {
  container: {
    height: 'calc(100% - 2.85714286em)'
  },
  grid: {
    height: '100%'
  }
};

export class Login extends Component {
  render() {
    return (
      <div style={styles.container}>
        <NavBar/>
        <Container style={styles.container} text>
          <Grid verticalAlign="middle" style={styles.grid}>
            <Grid.Column>
              <Header as="h1">Log in</Header>

              <Segment basic>
                <Form size="huge">
                  <Form.Input name="email" label="Email" type="text"/>
                  <Form.Input name="password" label="Password" type="password"/>
                  <Button size="huge" type="submit" primary>Log In</Button>
                </Form>
              </Segment>

              <Message info>
                <Message.Header>
                  New to Shareff?
                </Message.Header>
                <p>
                  Sign up for a Shareff account today!
                </p>
              </Message>
            </Grid.Column>
          </Grid>
        </Container>
      </div>
    );
  }
}
