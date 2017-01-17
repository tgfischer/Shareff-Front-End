import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
  Button, Container, Form, Grid, Header, Message, Segment
} from 'semantic-ui-react';
import {intlShape, injectIntl, FormattedMessage} from 'react-intl';
import NavBar from '../General/NavBar';
import {Calendar} from '../General/Calendar';
import {signup} from '../../actions/auth';

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
    const {err, intl} = this.props;
    const {formatMessage} = intl;

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
              <Header as="h1">
                <FormattedMessage id="signUp.title"/>
              </Header>

              <Segment basic>
                <Form size="huge" onSubmit={this.handleSubmit} loading={this.props.isFetching}>
                  <Form.Group widths="equal">
                    <Form.Input
                      label={formatMessage({id: 'signUp.firstName'})}
                      name="firstName"
                      placeholder={formatMessage({id: 'signUp.firstName'})}
                      type="text"
                      required
                      />

                    <Form.Input
                      label={formatMessage({id: 'signUp.lastName'})}
                      name="lastName"
                      placeholder={formatMessage({id: 'signUp.lastName'})}
                      type="text"
                      required
                      />
                  </Form.Group>
                  <Form.Input
                    label={formatMessage({id: 'signUp.address'})}
                    name="address"
                    placeholder={formatMessage({id: 'signUp.address'})}
                    type="text"
                    required
                    />
                  <Form.Group widths="equal">
                    <Form.Input
                      label={formatMessage({id: 'signUp.city'})}
                      name="city"
                      placeholder={formatMessage({id: 'signUp.city'})}
                      type="text"
                      required
                      />

                    <Form.Select
                      label={formatMessage({id: 'signUp.province'})}
                      name="province"
                      placeholder={formatMessage({id: 'signUp.province'})}
                      options={provinces}
                      required
                      />

                    <Form.Input
                      label={formatMessage({id: 'signUp.postalCode'})}
                      name="postalCode"
                      placeholder={formatMessage({id: 'signUp.postalCode'})}
                      type="text"
                      required
                      />
                  </Form.Group>
                  <Form.Group widths="equal">
                    <Form.Input
                      label={formatMessage({id: 'signUp.email'})}
                      name="email"
                      placeholder={formatMessage({id: 'signUp.email'})}
                      type="text"
                      required
                      />

                    <Form.Input
                      label={formatMessage({id: 'signUp.password'})}
                      name="password"
                      placeholder={formatMessage({id: 'signUp.password'})}
                      type="password"
                      required
                      />

                    <Form.Input
                      label={formatMessage({id: 'signUp.confirmPassword'})}
                      name="confirmPassword"
                      placeholder={formatMessage({id: 'signUp.confirmPassword'})}
                      type="password"
                      required
                      />
                  </Form.Group>
                  <Form.Group widths="equal">
                    <Form.Input
                      label={formatMessage({id: 'signUp.ccn'})}
                      name="ccn"
                      placeholder={formatMessage({id: 'signUp.ccn'})}
                      type="number"
                      required
                      />

                    <Form.Input
                      label={formatMessage({id: 'signUp.cvn'})}
                      name="cvn"
                      placeholder={formatMessage({id: 'signUp.cvn'})}
                      type="number"
                      required
                      />

                    <Calendar
                      label={formatMessage({id: 'signUp.expiryDate'})}
                      name="expiryDate"
                      placeholder={formatMessage({id: 'signUp.expiryDate'})}
                      type="month"
                      required
                      />
                  </Form.Group>

                  <Button size="huge" type="submit" primary>
                    <FormattedMessage id="signUp.signUpButton"/>
                  </Button>
                </Form>
              </Segment>

              {err &&
                <Message
                  header={formatMessage({id: 'error.error'})}
                  content={
                    err.message ? err.message : formatMessage({id: 'error.general'})
                  }
                  error
                  />
              }

              <Message info>
                <Message.Header>
                  <FormattedMessage id="signUp.infoMessageTitle"/>
                </Message.Header>
                <p>
                  <FormattedMessage id="signUp.infoMessageContent"/>
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
  intl: intlShape.isRequired,
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

export default connect(mapStateToProps)(injectIntl(SignUp));
