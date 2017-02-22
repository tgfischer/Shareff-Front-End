import React, {Component} from 'react';
import {intlShape, injectIntl} from 'react-intl';
import $ from 'jquery';
import '../../../../node_modules/fullcalendar/dist/fullcalendar.min.js';
import '../../../../node_modules/fullcalendar/dist/fullcalendar.min.css';
import '../../../../node_modules/moment/moment.js';

class FullCalendar extends Component {
  componentDidMount() {
    const {onDayClick, intl} = this.props;
    const {formatMessage} = intl;

    // Initialize the calendar
    $(".full-calendar").fullCalendar({
      dayClick: onDayClick,
      buttonText: {
        today: formatMessage({id: 'fullCalendar.today'})
      },
      eventSources: [{
        events: [
          {
            title: 'event1',
            start: '2017-02-10'
          },
          {
            title: 'event2',
            start: '2017-02-10',
            end: '2017-02-25'
          }
        ],
        color: '#b6e1fc',
        textColor: 'white'
      },
      {
        events: [
          {
            title: 'event3',
            start: '2017-02-03T12:30:00',
            allDay: false // will make the time show
          }
        ],
        color: '#087cc4',
        textColor: 'white'
      }]
    });

    // Add the Semantic UI button classes
    $('.fc').find('.fc-button-group').addClass('ui buttons');
    $('.fc').find('.fc-today-button').addClass('ui basic button');
    $('.fc').find('.fc-button-group').find('button').addClass('ui primary button');
  }
  render() {
    return (
      <div className="full-calendar"/>
    );
  }
}

FullCalendar.propTypes = {
  intl: intlShape.isRequired,
  onDayClick: React.PropTypes.func.isRequired
};

export default injectIntl(FullCalendar);
