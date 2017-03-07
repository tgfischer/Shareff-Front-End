import React, {Component} from 'react';
import {Icon} from 'semantic-ui-react';
import {numberToWord} from 'semantic-ui-react/src/lib/numberToWord';
import $ from 'jquery';
import '../../../assets/semantic-ui/components/popup.min.js';
import '../../../assets/semantic-ui/components/transition.min.js';
import '../../../assets/semantic-ui/components/calendar.min.js';
import '../../../assets/semantic-ui/components/calendar.min.css';

export class Calendar extends Component {
  componentDidMount() {
    const {type, inline, defaultValue, name} = this.props;
    const calendarIdentifier = `.ui.calendar.${name}`;

    $(calendarIdentifier).calendar({
      type,
      inline
    });

    if (defaultValue) {
      $(calendarIdentifier).calendar('set date', defaultValue);
    }
  }
  render() {
    const {required, label, name, placeholder, width} = this.props;
    let classNameBuilder = required ? "required " : "";
    classNameBuilder += `${numberToWord(width)} wide field`;
    const calendarName = `ui calendar ${name}`;

    return (
      <div className={classNameBuilder}>
        <label>{label}</label>
        <div className={calendarName}>
          <div className="ui input left icon">
            <Icon name="calendar"/>
            <input name={name} type="text" placeholder={placeholder} required={required}/>
          </div>
        </div>
      </div>
    );
  }
}

Calendar.propTypes = {
  label: React.PropTypes.string.isRequired,
  name: React.PropTypes.string.isRequired,
  placeholder: React.PropTypes.string,
  defaultValue: React.PropTypes.string,
  type: React.PropTypes.string,
  required: React.PropTypes.bool,
  inline: React.PropTypes.bool,
  width: React.PropTypes.string
};
