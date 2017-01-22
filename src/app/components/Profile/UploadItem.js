import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {
  Button, Form, Grid, Header, Modal
} from 'semantic-ui-react';
import {intlShape, injectIntl, FormattedMessage} from 'react-intl';
import {uploadItem} from '../../actions/profile';

class UploadItem extends Component {
  state = {
    openModal: false,
    modalTitle: 'modal.success',
    modalContent: 'modal.uploadItemSuccess'
  }
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }
  handleSubmit(e, {formData}) {
    e.preventDefault();

    const {intl, user} = this.props;

    // Add the userId and the addressId to the object that will be sent to the
    // server
    formData.userId = user.userId;
    formData.addressId = user.addressId;

    // Send the updated personal information to the server
    this.props.dispatch(uploadItem(formData)).then(({err}) => {
      const {formatMessage} = intl;

      // Set the modal title
      const title = err ? 'modal.error' : 'modal.success';
      this.setState({modalTitle: formatMessage({id: title})});

      // Set the modal content
      const content = err ? 'error.general' : 'modal.uploadItemSuccess';
      this.setState({modalContent: formatMessage({id: content})});

      // Open the modal
      this.setState({openModal: true});
    });
  }
  handleCloseModal = () => this.setState({openModal: false})
  render() {
    const {isFetching, intl} = this.props;
    const {openModal, modalTitle, modalContent} = this.state;
    const {formatMessage} = intl;

    return (
      <Grid>
        <Grid.Column>
          <Header as="h1" dividing>
            <FormattedMessage id="uploadItem.pageTitle"/>
          </Header>

          <Form size="huge" onSubmit={this.handleSubmit} loading={isFetching}>
            <Form.Input
              label={formatMessage({id: 'uploadItem.title'})}
              name="title"
              placeholder={formatMessage({id: 'uploadItem.title'})}
              type="text"
              required
              />
            <Form.Input
              label={formatMessage({id: 'uploadItem.category'})}
              name="category"
              placeholder={formatMessage({id: 'uploadItem.category'})}
              type="text"
              />
            <Form.Input
              label={formatMessage({id: 'uploadItem.price'})}
              name="price"
              placeholder={formatMessage({id: 'uploadItem.price'})}
              type="number"
              required
              />
            <Form.TextArea
              label={formatMessage({id: 'uploadItem.description'})}
              name="description"
              placeholder={formatMessage({id: 'uploadItem.descriptionPlaceholder'})}
              required
              />
            <Form.TextArea
              label={formatMessage({id: 'uploadItem.terms'})}
              name="terms"
              placeholder={formatMessage({id: 'uploadItem.termsPlaceholder'})}
              required
              />
            <label>Upload your photos</label>
            <Button
              content={formatMessage({id: 'uploadItem.uploadPhotoButton'})}
              size="medium"
              icon="upload"
              labelPosition="right"
              floated="left"
              />

            <Button
              content={formatMessage({id: 'uploadItem.uploadButton'})}
              size="huge"
              type="submit"
              icon="upload"
              labelPosition="right"
              primary
              />
          </Form>

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
        </Grid.Column>
      </Grid>
    );
  }
}

UploadItem.propTypes = {
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

export default connect(mapStateToProps)(withRouter(injectIntl(UploadItem)));
