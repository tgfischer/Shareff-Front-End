import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import validator from 'validator';
import {Form, Label, Segment, Container, Button, Modal, Header, Card} from 'semantic-ui-react';
import CoreLayout from '../../layouts/CoreLayout';
import PageHeaderSegment from '../General/PageHeaderSegment';
import {Loading} from '../General/Loading';
import {intlShape, injectIntl, FormattedMessage} from 'react-intl';
import {getRentalItem, removeMyItem, updateMyItem} from '../../actions/rentalItem';
import {getUser} from '../../actions/auth';
import {getOptions} from '../../utils/Utils';
import {DraftEditor} from '../General/DraftEditor';
import {Thumbnail} from '../General/Thumbnail';
import {uploadPhotos} from '../../actions/uploadPhotos';
import UploadFile from '../General/UploadFile';
import {BASE_URL, categories, costPeriods} from '../../constants/constants';

class EditItem extends Component {
  constructor(props) {
    super(props);
    this.getCategories = this.getCategories.bind(this);
    this.handleRequestToRemoveButton = this.handleRequestToRemoveButton.bind(this);
    this.handleRequestToSaveButton = this.handleRequestToSaveButton.bind(this);
    this.handleCloseRemoveModal = this.handleCloseRemoveModal.bind(this);
    this.handleCloseUpdateModal = this.handleCloseUpdateModal.bind(this);
    this.handleRemovePhoto = this.handleRemovePhoto.bind(this);
    this.handlePhotosUpload = this.handlePhotosUpload.bind(this);

    this.state = {
      openRemoveModal: false,
      openUpdateModal: false,
      modalTitle: 'modal.success',
      modalContent: 'editItem.removeModal.success',
      updateModalContent: 'editItem.updateModal.success',
      photoUrls: null
    };
  }
  componentWillMount() {
    // Fetch the rental item using the item ID in the params
    const {itemId} = this.props.params;

    this.props.dispatch(getRentalItem(itemId)).then(() => {
      if (!this.props.user) {
        // Else if the user is authenticated
        const token = localStorage.getItem('token');
        this.props.dispatch(getUser(token));
      }
      this.setState({photoUrls: this.props.rentalItem.photos});
    });
  }
  handleRequestToRemoveButton() {
     // Fetch the rental item using the item ID in the params
    const {itemId} = this.props.params;
    const {userId} = this.props.user;
    this.props.dispatch(removeMyItem({itemId, userId})).then(({err}) => {
      const {formatMessage} = this.props.intl;

      // Set the modal title
      const title = err ? 'modal.error' : 'modal.success';
      this.setState({modalTitle: formatMessage({id: title})});

      // Set the modal content
      const content = err ? 'error.general' : 'editItem.removeModal.success';
      this.setState({modalContent: formatMessage({id: content})});

      // Open the modal
      this.setState({openRemoveModal: true});
    });
  }
  handleRequestToSaveButton(e, {formData}) {
    e.preventDefault();

    // Add the userId and the itemId to the object that will be sent to the
    // server
    const {itemId} = this.props.params;
    const {userId} = this.props.user;
    formData.itemId = itemId;
    formData.userId = userId;
    formData.photos = this.state.photoUrls;
    formData.costPeriod = costPeriods[0];

    this.props.dispatch(updateMyItem(formData)).then(({err}) => {
      const {formatMessage} = this.props.intl;

      // Set the modal title
      const title = err ? 'modal.error' : 'modal.success';
      this.setState({modalTitle: formatMessage({id: title})});

      // Set the modal content
      const content = err ? 'error.general' : 'editItem.updateModal.success';
      this.setState({updateModalContent: formatMessage({id: content})});

      // Open the modal
      this.setState({openUpdateModal: true});
    });
  }
  handleCloseRemoveModal() {
    this.setState({openRemoveModal: false});
    this.props.router.push(`/profile/my-items`);
  }
  handleCloseUpdateModal() {
    const {rentalItem} = this.props;

    this.setState({openUpdateModal: false});
    this.props.router.push(`/listings/${rentalItem.itemId}`);
  }
  handleRemovePhoto(selectedPhotoUrl) {
    const {photoUrls} = this.state;
    const i = photoUrls.indexOf(selectedPhotoUrl);
    if (i !== -1) {
      photoUrls.splice(i, 1);
      this.setState({photoUrls});
    }
  }
  handlePhotosUpload(newPhotoUrls) {
    let {photoUrls} = this.state;
    photoUrls = photoUrls.concat(newPhotoUrls);
    this.setState({photoUrls});
  }
  getCategories(categories) {
    const {formatMessage} = this.props.intl;

    return (
      <Label.Group size="large">
        {categories.map((category, i) => {
          return (
            <Label key={i} className="dark blue">
              {formatMessage({id: category})}
            </Label>
          );
        })}
      </Label.Group>
    );
  }
  render() {
    const {rentalItem, user, intl, isFetching} = this.props;
    const {openRemoveModal, openUpdateModal, modalTitle, modalContent, updateModalContent, photoUrls} = this.state;
    const {formatMessage} = intl;
    const {unescape} = validator;
    const styles = {
      container: {
        padding: '1em 0'
      },
      photos: {
        margin: '0 auto'
      },
      child: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
      }
    };
    const breadcrumbs = [{
      text: formatMessage({id: 'breadcrumb.home'}),
      to: '/'
    }];

    if (rentalItem) {
      breadcrumbs.push({
        text: formatMessage({id: 'editItem.title'}, {itemTitle: unescape(rentalItem.title)})
      });
    }
    return (
      <div>
        {rentalItem && user ?
          <CoreLayout>
            <PageHeaderSegment
              breadcrumbs={breadcrumbs}
              title={formatMessage({id: 'editItem.title'}, {itemTitle: unescape(rentalItem.title)})}
              colour="blue"
              action={{
                handleButtonClick: this.handleRequestToRemoveButton,
                buttonText: formatMessage({id: 'editItem.removeItemButton'}),
                isButtonInverted: true
              }}
              />
            <Container style={styles.container}>
              <Segment loading={isFetching}>
                <Form size="huge" onSubmit={this.handleRequestToSaveButton}>
                  <Form.Input
                    label={formatMessage({id: 'addItem.title'})}
                    name="title"
                    placeholder=""
                    defaultValue={rentalItem.title || ''}
                    type="text"
                    required
                    />
                  <Form.Dropdown
                    label={formatMessage({id: 'addItem.category'})}
                    placeholder=""
                    fluid
                    multiple
                    labeled
                    selection
                    search
                    defaultValue={rentalItem.category}
                    name="category"
                    options={getOptions({values: categories, intl})}
                    required
                    />
                  <Form.Input
                    icon="dollar"
                    iconPosition="left"
                    label={formatMessage({id: 'addItem.price'})}
                    name="price"
                    placeholder=""
                    defaultValue={rentalItem.price || ''}
                    type="number"
                    required
                    />
                  <DraftEditor
                    label={formatMessage({id: 'addItem.description'})}
                    name="description"
                    defaultValue={rentalItem.description}
                    required
                    />
                  <DraftEditor
                    label={formatMessage({id: 'addItem.terms'})}
                    name="terms"
                    defaultValue={rentalItem.termsOfUse}
                    required
                    />
                  <Header as="h3">
                    <FormattedMessage id="editItem.photosTitle"/>
                  </Header>
                  {photoUrls &&
                    <Card.Group itemsPerRow={4} style={styles.photos} stackable>
                      {photoUrls.map((photoUrl, i) => {
                        return (
                          <Thumbnail
                            key={i}
                            src={BASE_URL + photoUrl}
                            height={200}
                            removeEnable={"true"}
                            photoUrl={photoUrl}
                            onRemovePhotoRequest={this.handleRemovePhoto}
                            />
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
                  <Button
                    content={formatMessage({id: 'editItem.saveChangesButton'})}
                    size="huge"
                    type="submit"
                    icon="save"
                    labelPosition="right"
                    primary
                    />
                </Form>
              </Segment>
            </Container>
            <Modal size="small" dimmer="blurring" open={openRemoveModal} onClose={this.handleCloseRemoveModal}>
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
                  onClick={this.handleCloseRemoveModal}
                  size="huge"
                  primary
                  />
              </Modal.Actions>
            </Modal>
            <Modal size="small" dimmer="blurring" open={openUpdateModal} onClose={this.handleCloseUpdateModal}>
              <Modal.Header>
                <Header as="h1">
                  {modalTitle}
                </Header>
              </Modal.Header>
              <Modal.Content>
                <Header as="h3">
                  {updateModalContent}
                </Header>
              </Modal.Content>
              <Modal.Actions>
                <Button
                  content={formatMessage({id: 'modal.okay'})}
                  onClick={this.handleCloseUpdateModal}
                  size="huge"
                  primary
                  />
              </Modal.Actions>
            </Modal>
          </CoreLayout> :
          <div style={styles.child}>
            <Loading/>
          </div>
        }
      </div>
    );
  }
}

EditItem.propTypes = {
  intl: intlShape.isRequired,
  isAuthenticated: React.PropTypes.bool.isRequired,
  isFetching: React.PropTypes.bool.isRequired,
  router: React.PropTypes.object.isRequired,
  rentalItem: React.PropTypes.object.isRequired,
  err: React.PropTypes.object,
  dispatch: React.PropTypes.func.isRequired,
  user: React.PropTypes.object.isRequired,
  params: React.PropTypes.object.isRequired
};

const mapStateToProps = state => {
  const {reducers} = state;
  const {isAuthenticated, isFetching, user, rentalItem, err} = reducers;

  return {
    isAuthenticated,
    isFetching,
    rentalItem,
    user,
    err
  };
};

export default connect(mapStateToProps)(withRouter(injectIntl(EditItem)));
