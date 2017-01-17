import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
  Button, Container, Form, Grid, Header, Message, Segment
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
                <Form size="huge" onSubmit={this.handleSubmit} loading={this.props.isFetching}>
                  <Form.Input name="email" label="Email" type="text" icon="user" iconPosition="left" required/>
                  <Form.Input name="password" label="Password" type="password" icon="lock" iconPosition="left" required/>
                  <Button content="Log in" size="huge" type="submit" icon="chevron right" labelPosition="right" primary/>
                </Form>
              </Segment>

              {err &&
                <Message
                  header="Error"
                  content={
                    err.message ? err.message : 'Something went wrong while trying to fulfill your request. Please try again later'
                  }
                  error
                  />
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
