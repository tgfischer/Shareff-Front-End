import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {intlShape, injectIntl} from 'react-intl';
import moment from 'moment';
import $ from 'jquery';
import {DataTableSemantic} from '../General/DataTableSemantic';
import {getIncomingRequests} from '../../actions/profile/incomingRequests';
import {Loading} from '../General/Loading';
import '../../../assets/datatables/datetime-moment.js';

const styles = {
  div: {
    margin: "15%"
  }
};

class IncomingRequests extends Component {
  constructor(props) {
    super(props);
    this.handleRowClick = this.handleRowClick.bind(this);
  }
  componentWillMount() {
    // Fetch the list of my items data using the ownerId from the props
    const {user, dispatch} = this.props;
    dispatch(getIncomingRequests(user));

    // Tell datatables that we want to use this format for our dates so they
    // can be ordered properly
    $.fn.dataTable.moment('MMM Do YYYY, h:mm a');
  }
  handleRowClick(e, row) {
    e.preventDefault();
    console.log(row);
  }
  render() {
    const {intl, requests} = this.props;
    const {formatMessage} = intl;
    const columns = [
      {data: 'requestId', visible: false, searchable: false},
      {data: 'itemId', visible: false, searchable: false},
      {data: 'itemTitle', title: formatMessage({id: 'incomingRequests.columns.itemTitle'})},
      {data: 'rentersName', title: formatMessage({id: 'incomingRequests.columns.rentersName'})},
      {
        data: 'startDate',
        title: formatMessage({id: 'incomingRequests.columns.startDate'}),
        render: data => {
          return moment(data).format('MMM Do YYYY, h:mm a');
        }
      },
      {
        data: 'endDate',
        title: formatMessage({id: 'incomingRequests.columns.endDate'}),
        render: data => {
          return moment(data).format('MMM Do YYYY, h:mm a');
        }
      }
    ];

    return (
      <div>
        {requests ?
          <DataTableSemantic
            rows={requests}
            columns={columns}
            order={[[4, 'asc'], [5, 'asc'], [3, 'asc']]}
            onRowClick={this.handleRowClick}
            {...this.props}
            /> :
          <div style={styles.div}><Loading/></div>
        }
      </div>
    );
  }
}

IncomingRequests.propTypes = {
  intl: intlShape.isRequired,
  isAuthenticated: React.PropTypes.bool.isRequired,
  isFetching: React.PropTypes.bool.isRequired,
  err: React.PropTypes.object,
  user: React.PropTypes.object.isRequired,
  requests: React.PropTypes.array,
  router: React.PropTypes.object.isRequired,
  dispatch: React.PropTypes.func.isRequired
};

const mapStateToProps = state => {
  const {reducers} = state;
  const {isAuthenticated, isFetching, user, requests, err} = reducers;

  return {
    isAuthenticated,
    isFetching,
    user,
    requests,
    err
  };
};

export default connect(mapStateToProps)(withRouter(injectIntl(IncomingRequests)));
