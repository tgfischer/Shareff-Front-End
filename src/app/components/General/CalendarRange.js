import React, {Component} from 'react';
import {intlShape, injectIntl, FormattedMessage} from 'react-intl';
import {Icon} from 'semantic-ui-react';
import $ from 'jquery';
import '../../../semantic-ui/components/popup.min.js';
import '../../../semantic-ui/components/transition.min.js';
import '../../../../node_modules/semantic-ui-calendar/dist/calendar.min.js';

import '../../../../node_modules/semantic-ui-calendar/dist/calendar.min.css';

class CalendarRange extends Component {
  state = {
    startDate: {},
    endDate: {}
  }
  componentDidMount() {
    const {defaultValues, onChange} = this.props;

    $("#rangestart").calendar({
      endCalendar: $('#rangeend'),
      onChange: (date, text) => {
        this.setState({
          startDate: {
            date,
            text
          }
        });

        if (onChange) {
          onChange(this.state.startDate, this.state.endDate);
        }
      }
    });
    $('#rangeend').calendar({
      startCalendar: $('#rangestart'),
      onChange: (date, text) => {
        this.setState({
          endDate: {
            date,
            text
          }
        });

        if (onChange) {
          onChange(this.state.startDate, this.state.endDate);
        }
      }
    });

    if (defaultValues) {
      const {startDate, endDate} = defaultValues;

      $('#rangestart').calendar('set endDate', endDate);
      $('#rangeend').calendar('set startDate', startDate);
    }
  }
  render() {
    const {intl, style} = this.props;
    const {formatMessage} = intl;

    return (
      <div className="two fields" style={style}>
        <div className="field">
          <label>
            <FormattedMessage id="calendarRange.startLabel"/>
          </label>
          <div className="ui calendar" id="rangestart">
            <div className="ui input left icon">
              <Icon name="calendar"/>
              <input
                name="startDate"
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
                name="endDate"
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
  intl: intlShape.isRequired,
  onChange: React.PropTypes.func,
  style: React.PropTypes.object,
  defaultValues: React.PropTypes.object
};

export default injectIntl(CalendarRange);
