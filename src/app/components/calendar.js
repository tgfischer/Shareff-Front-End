import React, {Component} from 'react';
import {Icon} from 'semantic-ui-react';
import $ from 'jquery';
import '../../../node_modules/semantic-ui/dist/components/popup.min.js';
import '../../../node_modules/semantic-ui/dist/components/transition.min.js';
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
      <div className="field">
        <label>{this.props.label}</label>
        <div className="ui calendar">
          <div className="ui input left icon">
            <Icon name="calendar"/>
            <input name={this.props.name} type="text" placeholder={this.props.placeholder}/>
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
  type: React.PropTypes.string.isRequired
};
