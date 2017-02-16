import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import validator from 'validator';
import {
  Button, Form, Grid, Header, Image, Modal
} from 'semantic-ui-react';
import {intlShape, injectIntl, FormattedMessage} from 'react-intl';
import {BASE_URL} from '../../constants/constants';
import {getPersonalInfo} from '../../actions/profile/personalInfo';
import {uploadPhotos} from '../../actions/uploadPhotos';
import UploadFile from '../General/UploadFile';

class PersonalInfo extends Component {
  state = {
    openModal: false,
    modalTitle: 'modal.success',
    modalContent: 'personalInfo.modal.success'
  }
  constructor(props) {
    super(props);
    this.handlePersonalInfoSubmit = this.handlePersonalInfoSubmit.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }
  handlePersonalInfoSubmit(e, {formData}) {
    e.preventDefault();

    const {intl, user} = this.props;

    // Add the userId and the addressId to the object that will be sent to the
    // server
    formData.userId = user.userId;
    formData.addressId = user.addressId;

    // Send the updated personal information to the server
    this.props.dispatch(getPersonalInfo(formData)).then(({err}) => {
      const {formatMessage} = intl;

      // Set the modal title
      const title = err ? 'modal.error' : 'modal.success';
      this.setState({modalTitle: formatMessage({id: title})});

      // Set the modal content
      const content = err ? 'error.general' : 'personalInfo.modal.success';
      this.setState({modalContent: formatMessage({id: content})});

      // Open the modal
      this.setState({openModal: true});
    });
  }
  handleCloseModal = () => this.setState({openModal: false})
  render() {
    const {intl, user} = this.props;
    const {openModal, modalTitle, modalContent} = this.state;
    const {formatMessage} = intl;
    const {unescape} = validator;
    const {
      firstName, lastName, line1, line2, city, province, postalCode, email,
      photoUrl, description
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
      <div>
        <Grid>
          <Grid.Row>
            <Grid.Column>
              <Header as="h1" dividing>
                <FormattedMessage id="personalInfo.title"/>
                <Header.Subheader>
                  <FormattedMessage id="personalInfo.subTitle"/>
                </Header.Subheader>
              </Header>

              <Form size="huge" onSubmit={this.handlePersonalInfoSubmit}>
                <Form.Group widths="equal">
                  <Form.Input
                    label={formatMessage({id: 'personalInfo.firstName'})}
                    name="firstName"
                    placeholder={formatMessage({id: 'personalInfo.firstName'})}
                    defaultValue={unescape(firstName || '')}
                    type="text"
                    required
                    />

                  <Form.Input
                    label={formatMessage({id: 'personalInfo.lastName'})}
                    name="lastName"
                    placeholder={formatMessage({id: 'personalInfo.lastName'})}
                    defaultValue={unescape(lastName || '')}
                    type="text"
                    required
                    />
                </Form.Group>
                <Form.Input
                  label={formatMessage({id: 'personalInfo.email'})}
                  name="email"
                  placeholder={formatMessage({id: 'personalInfo.email'})}
                  defaultValue={unescape(email || '')}
                  type="text"
                  required
                  />
                <Form.Group widths="equal">
                  <Form.Input
                    label={formatMessage({id: 'personalInfo.password'})}
                    name="password"
                    placeholder={formatMessage({id: 'personalInfo.password'})}
                    type="password"
                    />

                  <Form.Input
                    label={formatMessage({id: 'personalInfo.confirmPassword'})}
                    name="confirmPassword"
                    placeholder={formatMessage({id: 'personalInfo.confirmPassword'})}
                    type="password"
                    />
                </Form.Group>

                <Header as="h1" dividing>
                  <FormattedMessage id="personalInfo.descriptionTitle"/>
                  <Header.Subheader>
                    <FormattedMessage id="personalInfo.descriptionSubTitle"/>
                  </Header.Subheader>
                </Header>

                <Form.TextArea
                  name="description"
                  label={formatMessage({id: 'personalInfo.descriptionLabel'})}
                  placeholder={formatMessage({id: 'personalInfo.descriptionPlaceholder'})}
                  defaultValue={unescape(description || '')}
                  rows="5"
                  />

                <Header as="h1" dividing>
                  <FormattedMessage id="personalInfo.addressTitle"/>
                  <Header.Subheader>
                    <FormattedMessage id="personalInfo.addressSubTitle"/>
                  </Header.Subheader>
                </Header>

                <Form.Input
                  label={formatMessage({id: 'personalInfo.addressOne'})}
                  name="addressOne"
                  placeholder={formatMessage({id: 'personalInfo.addressOne'})}
                  defaultValue={unescape(line1 || '')}
                  type="text"
                  required
                  />
                <Form.Input
                  label={formatMessage({id: 'personalInfo.addressTwo'})}
                  name="addressTwo"
                  placeholder={formatMessage({id: 'personalInfo.addressTwo'})}
                  defaultValue={unescape(line2 || '')}
                  type="text"
                  />
                <Form.Input
                  label={formatMessage({id: 'personalInfo.city'})}
                  name="city"
                  placeholder={formatMessage({id: 'personalInfo.city'})}
                  defaultValue={unescape(city || '')}
                  type="text"
                  required
                  />
                <Form.Group widths="equal">
                  <Form.Select
                    label={formatMessage({id: 'personalInfo.province'})}
                    name="province"
                    placeholder={formatMessage({id: 'personalInfo.province'})}
                    defaultValue={unescape(province || '')}
                    options={provinces}
                    required
                    />

                  <Form.Input
                    label={formatMessage({id: 'personalInfo.postalCode'})}
                    name="postalCode"
                    placeholder={formatMessage({id: 'personalInfo.postalCode'})}
                    defaultValue={unescape(postalCode || '')}
                    type="text"
                    required
                    />
                </Form.Group>

                <Button
                  content={formatMessage({id: 'personalInfo.saveChangesButton'})}
                  size="huge"
                  type="submit"
                  icon="save"
                  labelPosition="right"
                  primary
                  />
              </Form>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <Form size="huge" onSubmit={this.handleProfilePhotoSubmit}>
                <Header as="h1" dividing>
                  <FormattedMessage id="personalInfo.profilePhoto.title"/>
                </Header>
                <Grid>
                  <Grid.Row>
                    <Grid.Column>
                      <Image src={BASE_URL + photoUrl} shape="rounded" size="medium" centered bordered/>
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row>
                    <Grid.Column>
                      <UploadFile
                        label={formatMessage({id: 'personalInfo.profilePhoto.label'})}
                        uploadAction={uploadPhotos}
                        uploadRoute="upload_profile_photo"
                        name="uploadProfilePhoto"
                        fluid
                        isProfilePhoto
                        />
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
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
  const {reducers} = state;
  const {isAuthenticated, isFetching, user, err} = reducers;

  return {
    isAuthenticated,
    isFetching,
    user,
    err
  };
};

export default connect(mapStateToProps)(withRouter(injectIntl(PersonalInfo)));
