import React, {Component} from 'react';
import {NavBar} from '../navbar';
import {Calendar} from '../calendar';
import {Button, Container, Form, Grid, Header, Message, Segment} from 'semantic-ui-react';

const styles = {
  container: {
    height: 'calc(100% - 2.85714286em)'
  },
  grid: {
    minHeight: '100%'
  }
};

export class SignUp extends Component {
  render() {
    const provinces = [{
      text: 'AB', value: 'AB'
    }, {
      text: 'BC', value: 'BC'
    }, {
      text: 'MB', value: 'MB'
    }, {
      text: 'NB', value: 'NB'
    }, {
      text: 'NL', value: 'NL'
    }, {
      text: 'NS', value: 'NS'
    }, {
      text: 'NT', value: 'NT'
    }, {
      text: 'NU', value: 'NU'
    }, {
      text: 'ON', value: 'ON'
    }, {
      text: 'PE', value: 'PE'
    }, {
      text: 'QC', value: 'QC'
    }, {
      text: 'SK', value: 'SK'
    }, {
      text: 'YT', value: 'YT'
    }];

    return (
      <div style={styles.container}>
        <NavBar/>
        <Container style={styles.container}>
          <Grid verticalAlign="middle" style={styles.grid}>
            <Grid.Column>
              <Header as="h1">Sign Up</Header>

              <Segment basic>
                <Form size="huge">
                  <Form.Group widths="equal">
                    <Form.Input label="First Name" name="firstName" placeholder="First Name" type="text"/>
                    <Form.Input label="Last Name" name="lastName" placeholder="Last Name" type="text"/>
                  </Form.Group>
                  <Form.Input label="Address" name="address" placeholder="Address" type="text"/>
                  <Form.Group widths="equal">
                    <Form.Input label="City" name="city" placeholder="City" type="text"/>
                    <Form.Select label="Province" name="province" placeholder="Province" options={provinces}/>
                    <Form.Input label="Postal Code" name="postalCode" placeholder="Postal Code" type="text"/>
                  </Form.Group>
                  <Form.Group widths="equal">
                    <Form.Input label="Email" name="email" placeholder="Email" type="text"/>
                    <Form.Input label="Password" name="password" placeholder="Password" type="password"/>
                    <Form.Input label="Confirm Password" name="confirmPassword" placeholder="Confirm Password" type="password"/>
                  </Form.Group>
                  <Form.Group widths="equal">
                    <Form.Input label="Credit Card Number" name="ccn" placeholder="Credit Card Number" type="number"/>
                    <Form.Input label="CVN" name="cvn" placeholder="CVN" type="number"/>
                    <Calendar label="Expiry Date" name="expiryDate" placeholder="Expiry Date" type="month"/>
                  </Form.Group>

                  <Button size="huge" type="submit" primary>Log In</Button>
                </Form>
              </Segment>

              <Message info>
                <Message.Header>
                  Already have an account?
                </Message.Header>
                <p>
                  Log into your Shareff account instead!
                </p>
              </Message>
            </Grid.Column>
          </Grid>
        </Container>
      </div>
    );
  }
}
