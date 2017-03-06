import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {
  Button, Form, Grid, Header, Modal, Dropdown, Card
} from 'semantic-ui-react';
import {intlShape, injectIntl, FormattedMessage} from 'react-intl';
import {BASE_URL, categories, costPeriods} from '../../constants/constants';
import {uploadPhotos} from '../../actions/uploadPhotos';
import {addItem} from '../../actions/profile/addItem';
import UploadFile from '../General/UploadFile';
import {DraftEditor} from '../General/DraftEditor';
import {Thumbnail} from '../General/Thumbnail';
import {getOptions} from '../../utils/Utils';

class UploadItem extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.handlePhotosUpload = this.handlePhotosUpload.bind(this);
    this.handleBillingClick = this.handleBillingClick.bind(this);

    this.state = {
      openModal: false,
      modalTitle: 'modal.success',
      modalContent: 'addItem.modal.addItemSuccess',
      photoUrls: null,
      itemId: null
    };
  }
  handleBillingClick(e) {
    e.preventDefault();
    this.props.router.push(`/profile/billing`);
  }
  handleSubmit(e, {formData}) {
    e.preventDefault();

    const {intl, dispatch, user} = this.props;

    // Add the userId to the object that will be sent to the server
    formData.userId = user.userId;
    formData.addressId = user.addressId;
    formData.photos = this.state.photoUrls;

    // Send the new item to the server
    dispatch(addItem(formData)).then(({err, itemId}) => {
      const {formatMessage} = intl;

      // Set the modal title
      const title = err ? 'modal.error' : 'modal.success';
      this.setState({modalTitle: formatMessage({id: title})});

      // Set the modal content
      const content = err ? 'error.general' : 'addItem.modal.addItemSuccess';
      this.setState({modalContent: formatMessage({id: content})});

      // Open the modal
      this.setState({openModal: true, itemId});
    });
  }
  handleCloseModal() {
    const {itemId} = this.state;
    const {router} = this.props;
    this.setState({openModal: false});

    if (itemId) {
      router.push(`/listings/${itemId}`);
    }
  }
  handlePhotosUpload(photoUrls) {
    this.setState({photoUrls});
  }
  componentDidMount() {
    const {user, intl} = this.props;
    if (!user.stripeAccountId) {
      const {formatMessage} = intl;

      // Set the modal title
      const title = 'modal.error';
      this.setState({modalTitle: formatMessage({id: title})});

      // Set the modal content
      const content = 'addItem.modal.noBankAccount';
      this.setState({modalContent: formatMessage({id: content})});

      // Open the modal
      this.setState({openModal: true});
    }
  }
  render() {
    const {intl, user} = this.props;
    const {
      openModal, modalTitle, modalContent, photoUrls
    } = this.state;
    const {formatMessage} = intl;

    const buttonDisabled = user.stripeAccountId === null;

    return (
      <div>
        <Grid>
          <Grid.Row>
            <Grid.Column>
              <Header as="h1" dividing>
                <FormattedMessage id="addItem.pageTitle"/>
              </Header>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <Form size="huge" onSubmit={this.handleSubmit}>
                <Form.Input
                  label={formatMessage({id: 'addItem.title'})}
                  name="title"
                  placeholder={formatMessage({id: 'addItem.title'})}
                  type="text"
                  required
                  />
                <div className="required field">
                  <label>
                    <FormattedMessage id="addItem.category"/>
                  </label>
                  <Dropdown
                    name="category"
                    placeholder={formatMessage({id: 'addItem.category'})}
                    fluid
                    multiple
                    labeled
                    selection
                    search
                    options={getOptions({values: categories, intl})}
                    />
                </div>
                <Form.Group>
                  <Form.Input
                    width="10"
                    icon="dollar"
                    iconPosition="left"
                    label={formatMessage({id: 'addItem.price'})}
                    name="price"
                    placeholder={formatMessage({id: 'addItem.price'})}
                    type="number"
                    required
                    />
                  <div className="required six wide field">
                    <label> {formatMessage({id: 'addItem.per'})} </label>
                    <Dropdown
                      name="costPeriod"
                      placeholder={formatMessage({id: 'addItem.costPeriod'})}
                      fluid
                      search
                      labeled
                      selection
                      options={getOptions({values: costPeriods, intl})}
                      />
                  </div>
                </Form.Group>
                <DraftEditor
                  label={formatMessage({id: 'addItem.description'})}
                  name="description"
                  required
                  />
                <DraftEditor
                  label={formatMessage({id: 'addItem.terms'})}
                  name="terms"
                  required
                  />
                <Header as="h1" dividing>
                  <FormattedMessage id="addItem.uploadPhotos"/>
                </Header>
                {photoUrls &&
                  <Card.Group itemsPerRow={3}>
                    {photoUrls.map((photoUrl, i) => {
                      return (
                        <Thumbnail key={i} src={BASE_URL + photoUrl} height={200}/>
                      );
                    })}
                  </Card.Group>
                }
                <UploadFile
                  uploadAction={uploadPhotos}
                  uploadRoute="upload_item_photos"
                  name="uploadPhotos"
                  fluid
                  multiple
                  onPhotosChange={this.handlePhotosUpload}
                  />
                <Grid.Row>
                  <Grid.Column>
                    <Button
                      content={formatMessage({id: 'addItem.addItemButton'})}
                      size="huge"
                      type="submit"
                      icon="plus"
                      labelPosition="right"
                      primary
                      disabled={buttonDisabled}
                      />
                  </Grid.Column>
                </Grid.Row>
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
            {buttonDisabled &&
              <Button
                content={formatMessage({id: 'addItem.modal.updateBillingInfo'})}
                size="huge"
                onClick={this.handleBillingClick}
                primary
                />
            }
            {buttonDisabled &&
              <Button
                content={formatMessage({id: 'addItem.modal.continueAnyways'})}
                onClick={this.handleCloseModal}
                size="huge"
                basic
                />
            }
            {!buttonDisabled &&
              <Button
                content={formatMessage({id: 'modal.okay'})}
                size="huge"
                onClick={this.handleCloseModal}
                primary
                />
            }
          </Modal.Actions>
        </Modal>
      </div>
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
