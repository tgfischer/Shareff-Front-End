import React, {Component} from 'react';
import {Icon} from 'semantic-ui-react';
import $ from 'jquery';
import '../../../assets/semantic-ui/components/popup.min.js';
import '../../../assets/semantic-ui/components/transition.min.js';
import '../../../assets/semantic-ui/components/calendar.min.js';
import '../../../assets/semantic-ui/components/calendar.min.css';

export class Calendar extends Component {
  componentDidMount() {
    const {type, inline, defaultValue} = this.props;

    $(".ui.calendar").calendar({
      type,
      inline
    });

    if (defaultValue) {
      $(".ui.calendar").calendar(`set ${name}`, defaultValue);
    }
  }
  render() {
    const {required, label, name, placeholder} = this.props;

    return (
      <div className={required ? "required field" : "field"}>
        <label>{label}</label>
        <div className="ui calendar">
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
  defaultValue: React.PropTypes.object,
  type: React.PropTypes.string,
  required: React.PropTypes.bool,
  inline: React.PropTypes.bool
};
