import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {Button, Header, Modal} from 'semantic-ui-react';
import {intlShape, injectIntl, FormattedMessage} from 'react-intl';
import $ from 'jquery';

class UploadFile extends Component {
  state = {
    isDisabled: true,
    openModal: false,
    modalTitle: 'modal.success',
    modalContent: 'modal.uploadPhotosSuccess'
  }
  constructor(props) {
    super(props);

    // Map 'this' to the functions
    this.handleBrowseClick = this.handleBrowseClick.bind(this);
    this.handlePhotoChange = this.handlePhotoChange.bind(this);
    this.handleUploadClick = this.handleUploadClick.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }
  handleBrowseClick() {
    // Programmically click the hidden input
    $('input[type=file]').click();
  }
  handlePhotoChange(e) {
    const file = $(e.target);
    let name = '';

    // Concatenate all of the filenames together to be displayed
    for (let i = 0; i < e.target.files.length; i++) {
      name += `${e.target.files[i].name}, `;
    }

    // remove trailing ","
    name = name.replace(/,\s*$/, '');

    // Put the filenames in the input box
    $('input[type=text]', file.parent()).val(name);

    // Enable the upload button
    this.setState({isDisabled: false});
  }
  handleUploadClick() {
    if (!this.state.isDisabled) {
      const files = $('input[type=file]')[0].files;
      const formData = new FormData();

      // Add all of the files to the formData with the same key (files)
      for (let i = 0; i < files.length; i++) {
        formData.append('files', files[i]);
      }

      const {user, intl} = this.props;
      const token = localStorage.getItem('token');

      // Add the userId and token for validation
      formData.append('token', token);
      formData.append('userId', user.userId);

      // Upload the photos!
      this.props.dispatch(this.props.uploadAction(formData)).then(({err}) => {
        const {formatMessage} = intl;

        // Set the modal title
        const title = err ? 'modal.error' : 'modal.success';
        this.setState({modalTitle: formatMessage({id: title})});

        // Set the modal content
        const content = err ? 'error.general' : 'modal.uploadPhotosSuccess';
        this.setState({modalContent: formatMessage({id: content})});

        // Open the modal
        this.setState({openModal: true});
      });
    }
  }
  handleCloseModal = () => this.setState({openModal: false})
  render() {
    const {fluid, label, multiple, name, required, intl} = this.props;
    const {openModal, modalTitle, modalContent} = this.state;
    const {formatMessage} = intl;

    return (
      <div>
        <div className="field">
          <label htmlFor={name}>{label}</label>
          <div className="two fields">
            <div className={required ? "required thirteen wide field" : "thirteen wide field"}>
              <div className={fluid ? "ui fluid file input browse action" : "ui file input browse action"}>
                <input onClick={this.handleBrowseClick} type="text" readOnly/>
                <input onChange={this.handlePhotoChange} type="file" name={name} autoComplete="off" className="hidden" multiple={multiple}/>
                <div onClick={this.handleBrowseClick} className="ui huge primary button">
                  <FormattedMessage id="uploadFile.browseButton"/>
                </div>
              </div>
            </div>
            <div className="three wide field">
              <div
                onClick={this.handleUploadClick}
                className={this.state.isDisabled ?
                  "ui huge primary disabled upload button" :
                  "ui huge primary upload button"}
                >
                <FormattedMessage id="uploadFile.uploadButton"/>
              </div>
            </div>
          </div>
        </div>
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

UploadFile.propTypes = {
  dispatch: React.PropTypes.func.isRequired,
  fluid: React.PropTypes.bool,
  intl: intlShape.isRequired,
  label: React.PropTypes.string,
  multiple: React.PropTypes.bool,
  name: React.PropTypes.string.isRequired,
  placeholder: React.PropTypes.string,
  required: React.PropTypes.bool,
  uploadAction: React.PropTypes.func.isRequired,
  user: React.PropTypes.object.isRequired
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

export default connect(mapStateToProps)(withRouter(injectIntl(UploadFile)));
