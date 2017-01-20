import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {
  Button, Form, Grid, Header, Message
} from 'semantic-ui-react';
import {intlShape, injectIntl, FormattedMessage} from 'react-intl';
import {Calendar} from '../General/Calendar';

class PersonalInfo extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(e, {formData}) {
    console.log(`${e} ${formData}`);
  }
  render() {
    const {err, intl, user} = this.props;
    const {formatMessage} = intl;
    const {
      firstName, lastName, line1, line2
    } = user;

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
      <Grid>
        <Grid.Column>
          <Header as="h1">
            <FormattedMessage id="personalInfo.title"/>
          </Header>

          <Form size="huge" onSubmit={this.handleSubmit} loading={this.props.isFetching} error={Boolean(err)}>
            <Form.Group widths="equal">
              <Form.Input
                label={formatMessage({id: 'personalInfo.firstName'})}
                name="firstName"
                placeholder={formatMessage({id: 'personalInfo.firstName'})}
                defaultValue={firstName}
                type="text"
                required
                />

              <Form.Input
                label={formatMessage({id: 'personalInfo.lastName'})}
                name="lastName"
                placeholder={formatMessage({id: 'personalInfo.lastName'})}
                defaultValue={lastName}
                type="text"
                required
                />
            </Form.Group>
            <Form.Input
              label={formatMessage({id: 'personalInfo.addressOne'})}
              name="addressOne"
              placeholder={formatMessage({id: 'personalInfo.addressOne'})}
              defaultValue={line1}
              type="text"
              required
              />
            <Form.Input
              label={formatMessage({id: 'personalInfo.addressTwo'})}
              name="addressTwo"
              placeholder={formatMessage({id: 'personalInfo.addressTwo'})}
              defaultValue={line2}
              type="text"
              />
            <Form.Input
              label={formatMessage({id: 'personalInfo.city'})}
              name="city"
              placeholder={formatMessage({id: 'personalInfo.city'})}
              type="text"
              required
              />
            <Form.Group widths="equal">
              <Form.Select
                label={formatMessage({id: 'personalInfo.province'})}
                name="province"
                placeholder={formatMessage({id: 'personalInfo.province'})}
                options={provinces}
                required
                />

              <Form.Input
                label={formatMessage({id: 'personalInfo.postalCode'})}
                name="postalCode"
                placeholder={formatMessage({id: 'personalInfo.postalCode'})}
                type="text"
                required
                />
            </Form.Group>
            <Form.Input
              label={formatMessage({id: 'personalInfo.email'})}
              name="email"
              placeholder={formatMessage({id: 'personalInfo.email'})}
              type="text"
              required
              />
            <Form.Group widths="equal">
              <Form.Input
                label={formatMessage({id: 'personalInfo.password'})}
                name="password"
                placeholder={formatMessage({id: 'personalInfo.password'})}
                type="password"
                required
                />

              <Form.Input
                label={formatMessage({id: 'personalInfo.confirmPassword'})}
                name="confirmPassword"
                placeholder={formatMessage({id: 'personalInfo.confirmPassword'})}
                type="password"
                required
                />
            </Form.Group>
            <Form.Input
              label={formatMessage({id: 'personalInfo.ccn'})}
              name="ccn"
              placeholder={formatMessage({id: 'personalInfo.ccn'})}
              type="number"
              required
              />
            <Form.Group widths="equal">
              <Form.Input
                label={formatMessage({id: 'personalInfo.cvn'})}
                name="cvn"
                placeholder={formatMessage({id: 'personalInfo.cvn'})}
                type="number"
                required
                />

              <Calendar
                label={formatMessage({id: 'personalInfo.expiryDate'})}
                name="expiryDate"
                placeholder={formatMessage({id: 'personalInfo.expiryDate'})}
                type="month"
                required
                />
            </Form.Group>

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
              content={formatMessage({id: 'personalInfo.updateButton'})}
              size="huge"
              type="submit"
              icon="save"
              labelPosition="right"
              primary
              />
          </Form>
        </Grid.Column>
      </Grid>
    );
  }
}

PersonalInfo.propTypes = {
  intl: intlShape.isRequired,
  isAuthenticated: React.PropTypes.bool,
  isFetching: React.PropTypes.bool,
  err: React.PropTypes.object,
  user: React.PropTypes.object,
  router: React.PropTypes.object,
  dispatch: React.PropTypes.func.isRequired
};

const mapStateToProps = state => {
  const {auth} = state;
  const {isAuthenticated, isFetching, user, err} = auth;

  return {
    isAuthenticated,
    isFetching,
    user,
    err
  };
};

export default connect(mapStateToProps)(withRouter(injectIntl(PersonalInfo)));
