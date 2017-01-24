import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {intlShape, injectIntl, FormattedMessage} from 'react-intl';
import $ from 'jquery';

class UploadFile extends Component {
  state = {
    isDisabled: true
  }
  constructor(props) {
    super(props);

    // Map 'this' to the functions
    this.handleBrowseClick = this.handleBrowseClick.bind(this);
    this.handlePhotoChange = this.handlePhotoChange.bind(this);
    this.handleUploadClick = this.handleUploadClick.bind(this);
  }
  handleBrowseClick() {
    // Programmically click the hidden input
    $('input[type=file]').click();
  }
  handlePhotoChange(e) {
    const file = $(e.target);
    let name = '';

    for (let i = 0; i < e.target.files.length; i++) {
      name += `${e.target.files[i].name}, `;
    }

    // remove trailing ","
    name = name.replace(/,\s*$/, '');

    $('input[type=text]', file.parent()).val(name);

    // Enable the upload button
    this.setState({isDisabled: false});
  }
  handleUploadClick() {
    if (!this.state.isDisabled) {
      const files = $('input[type=file]')[0].files;
      const formData = new FormData();

      for (let i = 0; i < files.length; i++) {
        formData.append('files[]', files[i]);
      }

      this.props.dispatch(this.props.uploadAction(formData)).then(() => {
        console.log("yay");
      }).catch(err => {
        console.log(err);
      });
    }
  }
  render() {
    const {fluid, label, multiple, name, required} = this.props;

    return (
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
  uploadFolder: React.PropTypes.string.isRequired,
  uploadRoute: React.PropTypes.string.isRequired
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
