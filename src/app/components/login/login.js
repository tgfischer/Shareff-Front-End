import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
  Button, Container, Form, Grid, Header, Message, Segment
} from 'semantic-ui-react';
import {intlShape, injectIntl, FormattedMessage} from 'react-intl';
import NavBar from '../General/NavBar';
import {login} from '../../actions/auth';

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
    const {err, intl} = this.props;
    const {formatMessage} = intl;

    return (
      <div style={styles.container}>
        <NavBar/>
        <Container style={styles.container} text>
          <Grid verticalAlign="middle" style={styles.grid}>
            <Grid.Column>
              <Header as="h1">
                <FormattedMessage id="login.title"/>
              </Header>

              <Segment basic>
                <Form size="huge" onSubmit={this.handleSubmit} loading={this.props.isFetching} error={Boolean(err)}>
                  <Form.Input
                    name="email"
                    label={formatMessage({id: 'login.email'})}
                    type="text"
                    icon="user"
                    iconPosition="left"
                    required
                    />

                  <Form.Input
                    name="password"
                    label={formatMessage({id: 'login.password'})}
                    type="password"
                    icon="lock"
                    iconPosition="left"
                    required
                    />

                  {err &&
                    <Message
                      header={formatMessage({id: 'error.error'})}
                      content={
                        err.message ? err.message : formatMessage({id: 'error.general'})
                      }
                      error
                      />
                  }

                  <Button
                    content={formatMessage({id: 'login.loginButton'})}
                    size="huge"
                    type="submit"
                    icon="chevron right"
                    labelPosition="right"
                    primary
                    />
                </Form>
              </Segment>

              <Message info>
                <Message.Header>
                  <FormattedMessage id="login.infoMessageTitle"/>
                </Message.Header>
                <p>
                  <FormattedMessage id="login.infoMessageContent"/>
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
  intl: intlShape.isRequired,
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

export default connect(mapStateToProps)(injectIntl(Login));
