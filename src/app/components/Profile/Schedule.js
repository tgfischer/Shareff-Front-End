import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {intlShape, injectIntl} from 'react-intl';
import FullCalendar from '../General/FullCalendar';
import {getMySchedule} from '../../actions/profile/schedule';
import {Loading} from '../General/Loading';

const styles = {
  div: {
    margin: '15%'
  }
};

class Schedule extends Component {
  constructor(props) {
    super(props);
    this.handleDayClick = this.handleDayClick.bind(this);
  }
  componentWillMount() {
    // Fetch the list of my items data using the ownerId from the props
    const {user, dispatch} = this.props;
    dispatch(getMySchedule(user));
  }
  handleDayClick(date, e) {
    e.preventDefault();
  }
  render() {
    return (
      <div>
        {Schedule ?
          <FullCalendar onDayClick={this.handleDayClick}/> :
          <div style={styles.div}><Loading/></div>
        }
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
