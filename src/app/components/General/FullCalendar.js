import React, {Component} from 'react';
import {intlShape, injectIntl} from 'react-intl';
import $ from 'jquery';
import '../../../../node_modules/fullcalendar/dist/fullcalendar.min.js';
import '../../../../node_modules/fullcalendar/dist/fullcalendar.min.css';
import '../../../../node_modules/moment/moment.js';

class FullCalendar extends Component {
  constructor(props) {
    super(props);

    this.initCalendar = this.initCalendar.bind(this);
  }
  componentDidMount() {
    this.initCalendar(this.props);
  }
  componentDidUpdate() {
    this.initCalendar(this.props);
  }
  initCalendar(props) {
    const {formatMessage} = props.intl;

    $(".full-calendar").fullCalendar("destroy");
    // Initialize the calendar
    $(".full-calendar").fullCalendar({
      dayClick: props.onDayClick,
      buttonText: {
        today: formatMessage({id: 'fullCalendar.today'})
      },
      eventSources: [{
        events: props.rentedItems,
        color: '#b6e1fc',
        textColor: 'white'
      },
      {
        events: props.myItems,
        color: '#087cc4',
        textColor: 'white'
      },
      {
        events: props.unavailableDays,
        color: '#a8b8c1',
        textColor: 'white'
      }],
      eventClick: props.onEventClick
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
  onDayClick: React.PropTypes.func.isRequired,
  onEventClick: React.PropTypes.func.isRequired,
  rentedItems: React.PropTypes.array,
  myItems: React.PropTypes.array,
  unavailableDays: React.PropTypes.array
};

export default injectIntl(FullCalendar);
