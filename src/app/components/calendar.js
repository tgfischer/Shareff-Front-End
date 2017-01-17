import React, {Component} from 'react';
import {Icon} from 'semantic-ui-react';
import $ from 'jquery';
import '../../semantic-ui/components/popup.min.js';
import '../../semantic-ui/components/transition.min.js';
import '../../../node_modules/semantic-ui-calendar/dist/calendar.min.js';
import '../../../node_modules/semantic-ui-calendar/dist/calendar.min.css';

export class Calendar extends Component {
  componentDidMount() {
    $(".ui.calendar").calendar({
      type: this.props.type
    });
  }
  render() {
    return (
      <div className={this.props.required ? "required field" : "field"}>
        <label>{this.props.label}</label>
        <div className="ui calendar">
          <div className="ui input left icon">
            <Icon name="calendar"/>
            <input name={this.props.name} type="text" placeholder={this.props.placeholder} required={this.props.required}/>
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
  type: React.PropTypes.string.isRequired,
  required: React.PropTypes.bool
};
