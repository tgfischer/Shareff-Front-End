import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {
  Button, Form, Grid, Header, Modal, Icon
} from 'semantic-ui-react';
import {Calendar} from '../General/Calendar';
import {intlShape, injectIntl, FormattedMessage} from 'react-intl';
import {updateBillingInfo} from '../../actions/profile/billing';
// import $ from 'jquery';

const styles = {
  paymentIcon: {
    marginTop: '30px',
    marginLeft: '15px'
  },
  billinglabel: {
    color: 'red',
    marginTop: '20px',
    marginBottom: '20px',
    marginLeft: '20px'
  }
};

class Billing extends Component {
  constructor(props) {
    super(props);
    this.handleBillingSubmit = this.handleBillingSubmit.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);

    this.state = {
      openModal: false,
      modalTitle: 'modal.success',
      modalContent: 'billing.modal.success',
      billingInfo: null
    };
  }
  handleBillingSubmit(e, {formData}) {
    e.preventDefault();

    const {intl, user} = this.props;

    /** error checking for bank account information
     *
     * if all fields are empty, do not show modal
     * if all fiels are same as props, do not show modal
     * if fields are not numeric, show modal
     */

    const bankFieldsAreEmpty = (!formData.accountNumber && !formData.transitNumber && !formData.institutionNumber && !formData.dob);
    const bankFieldsChanged = (formData.accountNumber !== `XXXXXXX` || formData.transitNumber !== `XXXXX` || formData.institutionNumber !== `XXX` || formData.dob !== user.dob);
    const bankFieldsNotNumeric = (isNaN(parseInt(formData.accountNumber, 10)) || isNaN(parseInt(formData.transitNumber, 10)) || isNaN(parseInt(formData.institutionNumber, 10)));

    if (bankFieldsChanged && !bankFieldsAreEmpty) {
      if (bankFieldsNotNumeric) {
        const {formatMessage} = intl;
        this.setState({modalTitle: formatMessage({id: 'modal.error'})});

        const content = 'billing.modal.bankAccountError';
        this.setState({modalContent: formatMessage({id: content})});
        this.setState({openModal: true, user});
        return;
      }
    }

    /** error checking for credi card information
     *
     * if all fields are empty, do not show modal
     * if all fiels are same as props, do not show modal
     * if fields are not numeric, show modal
     */
    const ccFieldsAreEmpty = (!formData.ccn && !formData.cvn && !formData.ccExpiryDate);
    const ccFieldsChanged = (formData.ccn !== `XXXX-${user.ccLast4Digits}` || formData.cvn !== `XXX` || formData.expiryDate !== user.ccExpiryDate);
    const ccFieldsNotNumeric = (isNaN(parseInt(formData.ccn, 10)) || isNaN(parseInt(formData.cvn, 10)));

    if (ccFieldsChanged && !ccFieldsAreEmpty) {
      if (ccFieldsNotNumeric) {
        const {formatMessage} = intl;
        this.setState({modalTitle: formatMessage({id: 'modal.error'})});

        const content = 'billing.modal.creditCardError';
        this.setState({modalContent: formatMessage({id: content})});
        this.setState({openModal: true, user});
        return;
      }
    }

    if (!bankFieldsChanged && !ccFieldsChanged) {
      const {formatMessage} = intl;
      this.setState({modalTitle: formatMessage({id: 'modal.error'})});

      const content = 'billing.modal.noNewValuesError';
      this.setState({modalContent: formatMessage({id: content})});
      this.setState({openModal: true, user});
      return;
    }

    // Send the updated billing information to the server
    this.props.dispatch(updateBillingInfo(formData, user)).then(({user}) => {
      const {formatMessage} = intl;

      // Set the modal title
      const title = user ? 'modal.success' : 'modal.error';
      this.setState({modalTitle: formatMessage({id: title})});

      // Set the modal content
      const content = user ? 'billing.modal.success' : 'error.general';
      this.setState({modalContent: formatMessage({id: content})});

      // Open the modal
      this.setState({openModal: true, user});
    });
  }
  handleCloseModal() {
    this.setState({openModal: false});
  }
  render() {
    const {intl, user} = this.props;
    const {openModal, modalTitle, modalContent} = this.state;
    const {formatMessage} = intl;
    const {
      firstName, lastName, dob, ccLast4Digits, ccExpiryDate,
      stripeCustomerId, stripeAccountId
    } = user;
    const fullName = `${firstName} ${lastName}`;

    // credit card default values
    const ccn = stripeCustomerId ? `XXXX-${ccLast4Digits}` : ``;
    const cvn = stripeCustomerId ? `XXX` : ``;
    const ccnWidth = stripeCustomerId ? "14" : "16";
    const ccExpiryDateWidth = stripeCustomerId ? "8" : "10";

    // bank account default values
    const accountNumber = stripeAccountId ? `XXXXXXX` : ``;
    const transitNumber = stripeAccountId ? `XXXXX` : ``;
    const institutionNumber = stripeAccountId ? `XXX` : ``;

    // all the credit cards stripe supports are the same name
    // as the semantic-ui icon name except:
    // stripe = JCB, semantic-ui = japan credit bureau
    // stripe = uknown, semantic-ui = credit card alternative
    // an icon should always show up beside the ccn
    let ccBrand = user.ccBrand ? user.ccBrand.toLowerCase() : '';
    if (ccBrand === 'jcb') {
      ccBrand = 'japan credit bureau';
    } else if (ccBrand === 'unknown') {
      ccBrand = 'credit card alternative';
    }

    return (
      <div>
        <Grid>
          <Grid.Row>
            <Grid.Column>
              <Header as="h1" dividing>
                <FormattedMessage id="billing.title"/>
                <Header.Subheader>
                  <FormattedMessage id="billing.subTitle"/>
                </Header.Subheader>
              </Header>

              <Header as="h2">
                <FormattedMessage id="billing.creditCardInfo"/>
                <Header.Subheader>
                  <FormattedMessage id="billing.creditCardInfoSubtitle"/>
                </Header.Subheader>
              </Header>

              {!stripeCustomerId &&
                <Header as="h3" style={styles.billinglabel}>
                  <FormattedMessage id="billing.noCreditCard"/>
                </Header>
              }

              <Form size="huge" onSubmit={this.handleBillingSubmit}>
                <Form.Group>
                  <Form.Input
                    label={formatMessage({id: 'signUp.ccn'})}
                    name="ccn"
                    placeholder={formatMessage({id: 'signUp.ccn'})}
                    defaultValue={unescape(ccn || '')}
                    type="text"
                    width={unescape(ccnWidth || '')}
                    />
                  {ccBrand &&
                    <Icon
                      style={styles.paymentIcon}
                      name={unescape(ccBrand || '')}
                      size="big"
                      width="2"
                      />
                  }
                </Form.Group>

                <Form.Group>
                  <Form.Input
                    label={formatMessage({id: 'signUp.cvn'})}
                    name="cvn"
                    placeholder={formatMessage({id: 'signUp.cvn'})}
                    defaultValue={unescape(cvn || '')}
                    type="text"
                    width="6"
                    />
                  <Calendar
                    label={formatMessage({id: 'signUp.expiryDate'})}
                    name="expiryDate"
                    placeholder={formatMessage({id: 'signUp.expiryDate'})}
                    type="month"
                    defaultValue={unescape(ccExpiryDate || '')}
                    width={unescape(ccExpiryDateWidth || '')}
                    />
                </Form.Group>

                <Header as="h2">
                  <FormattedMessage id="billing.bankAccountInfo"/>
                  <Header.Subheader>
                    <FormattedMessage id="billing.bankAccountInfoSubtitle"/>
                  </Header.Subheader>
                </Header>

                {!stripeAccountId &&
                  <Header as="h3" style={styles.billinglabel}>
                    <FormattedMessage id="billing.noBankAccount"/>
                  </Header>
                }

                <Form.Input
                  label={formatMessage({id: 'billing.accountHolderName'})}
                  name="accountHolderName"
                  placeholder={formatMessage({id: 'billing.accountHolderName'})}
                  defaultValue={unescape(fullName || '')}
                  type="text"
                  />
                <Form.Input
                  label={formatMessage({id: 'billing.accountNumber'})}
                  name="accountNumber"
                  placeholder={formatMessage({id: 'billing.accountNumber'})}
                  defaultValue={unescape(accountNumber || '')}
                  type="text"
                  />
                <Form.Group>
                  <Form.Input
                    label={formatMessage({id: 'billing.transitNumber'})}
                    name="transitNumber"
                    placeholder={formatMessage({id: 'billing.transitNumber'})}
                    defaultValue={unescape(transitNumber || '')}
                    type="text"
                    width="10"
                    />
                  <Form.Input
                    label={formatMessage({id: 'billing.institutionNumber'})}
                    name="institutionNumber"
                    placeholder={formatMessage({id: 'billing.institutionNumber'})}
                    defaultValue={unescape(institutionNumber || '')}
                    type="text"
                    width="6"
                    />
                </Form.Group>
                <Calendar
                  label={formatMessage({id: 'billing.dob'})}
                  name="dob"
                  placeholder={formatMessage({id: 'billing.dob'})}
                  type="date"
                  defaultValue={unescape(dob || '')}
                  />

                <Button
                  content={formatMessage({id: 'billing.saveChangesButton'})}
                  size="huge"
                  type="submit"
                  icon="save"
                  labelPosition="right"
                  primary
                  />
              </Form>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <Modal size="small" dimmer="blurring" open={openModal} onClose={this.handleCloseModal}>
          <Modal.Header>
            <Header as="h1">
              {modalTitle}
            </Header>
          </Modal.Header>
          <Modal.Content>
            <Header as="h3">
              {modalContent}
            </Header>
          </Modal.Content>
          <Modal.Actions>
            <Button
              content={formatMessage({id: 'modal.okay'})}
              onClick={this.handleCloseModal}
              size="huge"
              primary
              />
          </Modal.Actions>
        </Modal>
      </div>
    );
  }
}

Billing.propTypes = {
  intl: intlShape.isRequired,
  isAuthenticated: React.PropTypes.bool,
  isFetching: React.PropTypes.bool,
  err: React.PropTypes.object,
  user: React.PropTypes.object,
  router: React.PropTypes.object,
  dispatch: React.PropTypes.func.isRequired
};

const mapStateToProps = state => {
  const {reducers} = state;
  const {isAuthenticated, isFetching, user, err} = reducers;

  return {
    isAuthenticated,
    isFetching,
    user,
    err
  };
};

export default connect(mapStateToProps)(withRouter(injectIntl(Billing)));
