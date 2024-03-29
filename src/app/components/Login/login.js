import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
  Button, Container, Form, Grid, Header, Message, Segment
} from 'semantic-ui-react';
import {intlShape, injectIntl, FormattedMessage} from 'react-intl';
import CoreLayout from '../../layouts/CoreLayout';
import {login} from '../../actions/auth';

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    flex: '1',
    padding: '1em 0'
  },
  grid: {
    minHeight: '100%'
  }
};

class Login extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      err: undefined
    };
  }
  handleSubmit(e, {formData}) {
    // Prevent the default form action
    e.preventDefault();

    this.props.dispatch(login({
      email: formData.email.trim(),
      password: formData.password
    })).then(({isAuthenticated, err}) => {
      if (isAuthenticated) {
        // Reload this route
        this.props.router.push('/');
      } else {
        this.setState({err});
      }
    });
  }
  render() {
    const {intl} = this.props;
    const {err} = this.state;
    const {formatMessage} = intl;

    return (
      <CoreLayout>
        <div style={styles.container}>
          <Container text>
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
      </CoreLayout>
    );
  }
}

Login.propTypes = {
  intl: intlShape.isRequired,
  isAuthenticated: React.PropTypes.bool,
  isFetching: React.PropTypes.bool,
  router: React.PropTypes.object,
  dispatch: React.PropTypes.func.isRequired
};

const mapStateToProps = state => {
  const {reducers} = state;
  const {isAuthenticated, isFetching} = reducers;

  return {
    isAuthenticated,
    isFetching
  };
};

export default connect(mapStateToProps)(injectIntl(Login));
