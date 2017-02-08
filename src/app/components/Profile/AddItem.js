import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {
  Button, Form, Grid, Header, Modal, Dropdown, Image
} from 'semantic-ui-react';
import {intlShape, injectIntl, FormattedMessage} from 'react-intl';
import {BASE_URL} from '../../constants/constants';
import {addItem, uploadPhotos} from '../../actions/profile';
import UploadFile from '../General/UploadFile';

class UploadItem extends Component {
  state = {
    openModal: false,
    modalTitle: 'modal.success',
    modalContent: 'modal.uploadItemSuccess',
    photoUrls: null
  }
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.onPhotoStateChange = this.onPhotoStateChange.bind(this);
  }
  handleSubmit(e, {formData}) {
    e.preventDefault();

    const {intl, user} = this.props;

    // Add the userId to the object that will be sent to the server
    formData.userId = user.userId;
    formData.addressId = user.addressId;
    formData.photos = this.state.photoUrls;

    // Send the new item to the server
    this.props.dispatch(addItem(formData)).then(({err}) => {
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
  handleCloseModal = () => this.setState({openModal: false});
  onPhotoStateChange = photoUrls => this.setState({photoUrls});
  render() {
    const {intl} = this.props;
    const {openModal, modalTitle, modalContent, photoUrls} = this.state;
    const {formatMessage} = intl;

    const categories = [
      {key: 'electronics', text: 'Electronics', value: 'electronics'},
      {key: 'sports', text: 'Sports Equipment', value: 'sports'},
      {key: 'farm', text: 'Farm Equipment', value: 'farm'},
      {key: 'utensils', text: 'Utensils', value: 'utensils'},
      {key: 'appliances', text: 'Appliances', value: 'appliances'},
      {key: 'education', text: 'Education', value: 'education'},
      {key: 'other', text: 'Other', value: 'other'}
    ];

    const costPeriods = [
      {text: 'Hour', value: 'hour'},
      {text: 'Day', value: 'day'},
      {text: 'Week', value: 'week'},
      {text: 'Month', value: 'month'}
    ];

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
                <Form.Field>
                  <label> {formatMessage({id: 'addItem.category'})} </label>
                  <Dropdown
                    name="category"
                    placeholder={formatMessage({id: 'addItem.category'})}
                    fluid
                    multiple
                    labeled
                    selection
                    search
                    options={categories}
                    />
                </Form.Field>
                <Form.Group>
                  <Form.Input
                    width="10"
                    label={formatMessage({id: 'addItem.price'})}
                    name="price"
                    placeholder={formatMessage({id: 'addItem.price'})}
                    type="number"
                    required
                    />
                  <Form.Field width="6">
                    <label> {formatMessage({id: 'addItem.costPeriod'})} </label>
                    <Dropdown
                      name="costPeriod"
                      placeholder={formatMessage({id: 'addItem.costPeriod'})}
                      fluid
                      search
                      labeled
                      selection
                      options={costPeriods}
                      required
                      />
                  </Form.Field>
                </Form.Group>
                <Form.TextArea
                  label={formatMessage({id: 'addItem.description'})}
                  name="description"
                  placeholder={formatMessage({id: 'addItem.descriptionPlaceholder'})}
                  required
                  />
                <Form.TextArea
                  label={formatMessage({id: 'addItem.terms'})}
                  name="terms"
                  placeholder={formatMessage({id: 'addItem.termsPlaceholder'})}
                  required
                  />
                <Grid.Row>
                  <Grid.Column>
                    <Header as="h1" dividing>
                      <FormattedMessage id="addItem.uploadPhotos"/>
                    </Header>
                    <Grid>
                      <Grid.Row columns="4">
                        {
                          photoUrls ? photoUrls.map((photoUrl, i) => {
                            return (
                              <Grid.Column key={i}>
                                <Image
                                  src={BASE_URL + photoUrl}
                                  shape="rounded"
                                  size="small"
                                  centered
                                  bordered
                                  />
                              </Grid.Column>
                            );
                          }) : ""
                        }
                      </Grid.Row>
                      <Grid.Row>
                        <Grid.Column>
                          <UploadFile
                            uploadAction={uploadPhotos}
                            name="uploadPhotos"
                            fluid
                            multiple
                            updateAddItemComponent={this.onPhotoStateChange}
                            />
                        </Grid.Column>
                      </Grid.Row>
                    </Grid>
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                  <Grid.Column>
                    <Button
                      content={formatMessage({id: 'addItem.addItemButton'})}
                      size="huge"
                      type="submit"
                      icon="plus"
                      labelPosition="right"
                      primary
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
