import React, {Component} from 'react';
import {FormattedMessage} from 'react-intl';
import $ from 'jquery';

export class UploadFile extends Component {
  componentDidMount() {
    $('.ui.file.browse.input').find('input[type=text], div.ui.button').on('click', e => {
      $(e.target).parent().find('input[type=file]').click();
    });

    $('input[type=file]', '.ui.file.browse.input').on('change', e => {
      const file = $(e.target);
      let name = '';

      for (let i = 0; i < e.target.files.length; i++) {
        name += `${e.target.files[i].name}, `;
      }

      // remove trailing ","
      name = name.replace(/,\s*$/, '');

      $('input[type=text]', file.parent()).val(name);
      $('.ui.upload.button').removeClass("disabled");
    });
  }
  render() {
    const {fluid, label, multiple, name, required} = this.props;

    return (
      <div className="field">
        <label htmlFor={name}>{label}</label>
        <div className="two fields">
          <div className={required ? "required thirteen wide field" : "thirteen wide field"}>
            <div className={fluid ? "ui fluid file input browse action" : "ui file input browse action"}>
              <input type="text" readOnly/>
              <input type="file" name={name} autoComplete="off" className="hidden" multiple={multiple}/>
              <div className="ui huge primary button">
                <FormattedMessage id="uploadFile.browseButton"/>
              </div>
            </div>
          </div>
          <div className="three wide field">
            <div className="ui huge inverted primary disabled upload button"><FormattedMessage id="uploadFile.uploadButton"/></div>
          </div>
        </div>
      </div>
    );
  }
}

UploadFile.propTypes = {
  fluid: React.PropTypes.bool,
  label: React.PropTypes.string,
  multiple: React.PropTypes.bool,
  name: React.PropTypes.string.isRequired,
  placeholder: React.PropTypes.string,
  required: React.PropTypes.bool,
  uploadFolder: React.PropTypes.string.isRequired,
  uploadRoute: React.PropTypes.string.isRequired
};
