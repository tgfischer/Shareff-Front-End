import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
  Button, Container, Dimmer, Form, Grid, Header, Loader, Message, Segment
} from 'semantic-ui-react';
import NavBar from '../navbar';
import {login} from '../../actions/actions';

const styles = {
  container: {
    height: 'calc(100% - 2.85714286em)'
  },
  grid: {
    minHeight: '100%'
  }
};

class Login extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(e, {formData}) {
    // Prevent the default form action
    e.preventDefault();

    this.props.dispatch(login({
      email: formData.email.trim(),
      password: formData.password
    })).then(({isAuthenticated}) => {
      if (isAuthenticated) {
        // Reload this route
        this.props.router.push('/');
      }
    });
  }
  render() {
    const {err} = this.props;

    return (
      <div style={styles.container}>
        <NavBar/>
        <Container style={styles.container} text>
          <Grid verticalAlign="middle" style={styles.grid}>
            <Grid.Column>
              <Header as="h1">Log in</Header>

              <Segment basic>
                <Dimmer active={this.props.isFetching} inverted>
                  <Loader size="huge" inverted/>
                </Dimmer>

                <Form size="huge" onSubmit={this.handleSubmit}>
                  <Form.Input name="email" label="Email" type="text"/>
                  <Form.Input name="password" label="Password" type="password"/>
                  <Button size="huge" type="submit" primary>Log In</Button>
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

Login.propTypes = {
  isAuthenticated: React.PropTypes.bool,
  isFetching: React.PropTypes.bool,
  router: React.PropTypes.object,
  dispatch: React.PropTypes.func.isRequired,
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

export default connect(mapStateToProps)(Login);
