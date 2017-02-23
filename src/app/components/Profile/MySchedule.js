import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {intlShape, injectIntl} from 'react-intl';
import FullCalendar from '../General/FullCalendar';
import {getMySchedule} from '../../actions/profile/mySchedule';
import {Loading} from '../General/Loading';

const styles = {
  div: {
    margin: '15%'
  }
};

class MySchedule extends Component {
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
    const {mySchedule} = this.props;

    return (
      <div>
        {mySchedule ?
          <FullCalendar onDayClick={this.handleDayClick}/> :
          <div style={styles.div}><Loading/></div>
        }
      </div>
    );
  }
}

MySchedule.propTypes = {
  intl: intlShape.isRequired,
  isAuthenticated: React.PropTypes.bool.isRequired,
  isFetching: React.PropTypes.bool.isRequired,
  err: React.PropTypes.object,
  user: React.PropTypes.object.isRequired,
  mySchedule: React.PropTypes.array,
  router: React.PropTypes.object.isRequired,
  dispatch: React.PropTypes.func.isRequired
};

const mapStateToProps = state => {
  const {reducers} = state;
  const {isAuthenticated, isFetching, user, mySchedule, err} = reducers;

  return {
    isAuthenticated,
    isFetching,
    user,
    mySchedule,
    err
  };
};

export default connect(mapStateToProps)(withRouter(injectIntl(MySchedule)));
