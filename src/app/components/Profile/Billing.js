import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {
  Button, Form, Grid, Header, Modal
} from 'semantic-ui-react';
import {intlShape, injectIntl, FormattedMessage} from 'react-intl';
import {updateBillingInfo} from '../../actions/profile/billing';
import {Calendar} from '../General/Calendar';

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

    // Send the updated billing information to the server
    this.props.dispatch(updateBillingInfo(formData, user)).then(({billingInfo}) => {
      const {formatMessage} = intl;

      // Set the modal title
      const title = billingInfo ? 'modal.success' : 'modal.error';
      this.setState({modalTitle: formatMessage({id: title})});

      // Set the modal content
      const content = billingInfo ? 'billing.modal.success' : 'err.general';
      this.setState({modalContent: formatMessage({id: content})});

      // Open the modal
      this.setState({openModal: true, billingInfo});
    });
  }
  handleCloseModal() {
    this.setState({openModal: false});
  }
  render() {
    const {intl} = this.props;
    const {openModal, modalTitle, modalContent} = this.state;
    const {formatMessage} = intl;

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

              <Form size="huge" onSubmit={this.handleBillingSubmit}>
                <Form.Input
                  label={formatMessage({id: 'signUp.ccn'})}
                  name="ccn"
                  placeholder={formatMessage({id: 'signUp.ccn'})}
                  defaultValue="xxxx-1234"
                  type="text"
                  disabled
                  />

                <Form.Group widths="equal">
                  <Form.Input
                    label={formatMessage({id: 'signUp.cvn'})}
                    name="cvn"
                    placeholder={formatMessage({id: 'signUp.cvn'})}
                    value="xxx"
                    type="text"
                    disabled
                    />
                  <Calendar
                    label={formatMessage({id: 'signUp.expiryDate'})}
                    name="expiryDate"
                    placeholder={formatMessage({id: 'signUp.expiryDate'})}
                    type="month"
                    required
                    />
                </Form.Group>

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
