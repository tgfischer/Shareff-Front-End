import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Button, Container, Form, Grid, Header, Message, Segment} from 'semantic-ui-react';
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
    })).then(() => {
      // Reload this route
      this.props.router.replace(window.location);
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
                  <p style={err}></p>
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
  router: React.PropTypes.object,
  dispatch: React.PropTypes.func.isRequired,
  err: React.PropTypes.object
};

const mapStateToProps = state => {
  const {auth} = state;
  const {isAuthenticated, err} = auth;

  return {
    isAuthenticated,
    err
  };
};

export default connect(mapStateToProps)(Login);
