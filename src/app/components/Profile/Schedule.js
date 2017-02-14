import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {intlShape, injectIntl} from 'react-intl';
import FullCalendar from '../General/FullCalendar';

class Schedule extends Component {
  constructor(props) {
    super(props);
    this.handleDayClick = this.handleDayClick.bind(this);
  }
  handleDayClick(date, e) {
    e.preventDefault();
  }
  render() {
    return (
      <div>
        <FullCalendar onDayClick={this.handleDayClick}/>
      </div>
    );
  }
}

Schedule.propTypes = {
  intl: intlShape.isRequired,
  isAuthenticated: React.PropTypes.bool.isRequired,
  isFetching: React.PropTypes.bool.isRequired,
  err: React.PropTypes.object,
  user: React.PropTypes.object.isRequired,
  router: React.PropTypes.object.isRequired,
  dispatch: React.PropTypes.func.isRequired
};

const mapStateToProps = state => {
  const {reducers} = state;
  const {isAuthenticated, isFetching, user, err} = reducers;

  return {
    isAuthenticated,
    isFetching,
    user,
    err
  };
};

export default connect(mapStateToProps)(withRouter(injectIntl(Schedule)));
