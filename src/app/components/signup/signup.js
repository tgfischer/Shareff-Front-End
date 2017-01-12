import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
  Button, Container, Dimmer, Form, Grid, Header, Loader, Message, Segment
} from 'semantic-ui-react';
import NavBar from '../navbar';
import {Calendar} from '../calendar';
import {signup} from '../../actions/actions';

const styles = {
  container: {
    height: 'calc(100% - 2.85714286em)'
  },
  grid: {
    minHeight: '100%'
  }
};

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(e, {formData}) {
    // Prevent the default form action
    e.preventDefault();

    // Trim the whitespace off of all of the properties
    for (const key in formData) {
      // First check to see if the property has the trim function
      // We don't want to trim the password though!
      if (key !== 'password' && formData[key].trim) {
        formData[key] = formData[key].trim();
      }
    }

    // If the confirmPassword properties exists in the object, delete it
    if (formData.confirmPassword) {
      delete formData.confirmPassword;
    }

    this.props.dispatch(signup(formData)).then(({isAuthenticated}) => {
      if (isAuthenticated) {
        // Reload this route
        this.props.router.push('/');
      }
    });
  }
  render() {
    const {err} = this.props;

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
                <Dimmer active={this.props.isFetching} inverted>
                  <Loader size="huge" inverted/>
                </Dimmer>

                <Form size="huge" onSubmit={this.handleSubmit}>
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

                  <Button size="huge" type="submit" primary>Sign Up</Button>
                </Form>
              </Segment>

              {err &&
                <Message error>
                  <Message.Header>
                    Error
                  </Message.Header>
                  <p>{err.message ? err.message : 'Something went wrong while trying to fulfill your request. Please try again later'}</p>
                </Message>
              }

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

SignUp.propTypes = {
  router: React.PropTypes.object,
  isFetching: React.PropTypes.bool,
  dispatch: React.PropTypes.func.isRequired,
  errorMessage: React.PropTypes.string,
  err: React.PropTypes.object
};

const mapStateToProps = state => {
  const {auth} = state;
  const {isAuthenticated, isFetching, err} = auth;

  return {
    isAuthenticated,
    isFetching,
    err
  };
};

export default connect(mapStateToProps)(SignUp);
