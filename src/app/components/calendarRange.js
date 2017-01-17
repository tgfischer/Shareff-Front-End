import React, {Component} from 'react';
import {intlShape, injectIntl, FormattedMessage} from 'react-intl';
import {Icon} from 'semantic-ui-react';
import $ from 'jquery';
import '../../semantic-ui/components/popup.min.js';
import '../../semantic-ui/components/transition.min.js';
import '../../../node_modules/semantic-ui-calendar/dist/calendar.min.js';

import '../../../node_modules/semantic-ui-calendar/dist/calendar.min.css';

class CalendarRange extends Component {
  componentDidMount() {
    $(".ui.calendar").calendar({
      endCalendar: $('#rangeend')
    });
    $('#rangeend').calendar({
      startCalendar: $('#rangestart')
    });
  }
  render() {
    const {formatMessage} = this.props.intl;

    return (
      <div className="two fields">
        <div className="field">
          <label>
            <FormattedMessage id="calendarRange.startLabel"/>
          </label>
          <div className="ui calendar" id="rangestart">
            <div className="ui input left icon">
              <Icon name="calendar"/>
              <input
                name="start"
                type="text"
                placeholder={formatMessage({id: 'calendarRange.startPlaceholder'})}
                />
            </div>
          </div>
        </div>
        <div className="field">
          <label>
            <FormattedMessage id="calendarRange.endLabel"/>
          </label>
          <div className="ui calendar" id="rangeend">
            <div className="ui input left icon">
              <Icon name="calendar"/>
              <input
                name="end"
                type="text"
                placeholder={formatMessage({id: 'calendarRange.endPlaceholder'})}
                />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

CalendarRange.propTypes = {
  intl: intlShape.isRequired
};

export default injectIntl(CalendarRange);
