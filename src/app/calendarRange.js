import React, {Component} from 'react';
import {Icon} from 'semantic-ui-react';
import $ from 'jquery';
import '../../node_modules/semantic-ui/dist/components/popup.min.js';
import '../../node_modules/semantic-ui/dist/components/transition.min.js';
import '../../node_modules/semantic-ui-calendar/dist/calendar.min.js';

export class CalendarRange extends Component {
  componentDidMount() {
    $(".ui.calendar").calendar({
      endCalendar: $('#rangeend')
    });
    $('#rangeend').calendar({
      startCalendar: $('#rangestart')
    });
  }
  render() {
    return (
      <div className="two fields">
        <div className="field">
          <label>Start date</label>
          <div className="ui calendar" id="rangestart">
            <div className="ui input left icon">
              <Icon name="calendar"/>
              <input type="text" placeholder="Start"/>
            </div>
          </div>
        </div>
        <div className="field">
          <label>End date</label>
          <div className="ui calendar" id="rangeend">
            <div className="ui input left icon">
              <Icon name="calendar"/>
              <input type="text" placeholder="End"/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
