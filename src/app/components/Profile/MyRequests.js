import React, {Component} from 'react';
import moment from 'moment';
import $ from 'jquery';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {intlShape, injectIntl, FormattedMessage} from 'react-intl';
import {Header} from 'semantic-ui-react';
import {DataTableSemantic} from '../General/DataTableSemantic';
import {getMyRequests} from '../../actions/profile/myRequests';
import {Loading} from '../General/Loading';

const styles = {
  div: {
    margin: "15%"
  }
};

class MyRequests extends Component {
  constructor(props) {
    super(props);
    this.handleRowClick = this.handleRowClick.bind(this);
  }
  componentWillMount() {
    const {user, dispatch} = this.props;
    dispatch(getMyRequests(user));

    // Tell datatables that we want to use this format for our dates so they
    // can be ordered properly
    $.fn.dataTable.moment('MMM Do YYYY, h:mm a');
  }
  handleRowClick(e, row) {
    e.preventDefault();

    this.props.router.push(`/listings/${row.itemId}`);
  }
  render() {
    const {myRequests, intl} = this.props;
    const {formatMessage} = intl;
    const columns = [
      {data: 'requestId', visible: false, searchable: false},
      {data: 'itemId', visible: false, searchable: false},
      {data: 'itemTitle', title: formatMessage({id: 'myRequests.columns.itemTitle'})},
      {
        data: 'startDate',
        title: formatMessage({id: 'myRequests.columns.startDate'}),
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
      },
      {data: 'status', title: formatMessage({id: 'myRequests.columns.status'})}
    ];

    return (
      <div>
        {myRequests ?
          <div>
            <Header as="h1" dividing>
              <FormattedMessage id="myRequests.title"/>
              <Header.Subheader>
                <FormattedMessage id="myRequests.subTitle"/>
              </Header.Subheader>
            </Header>

            <DataTableSemantic
              rows={myRequests}
              columns={columns}
              order={[[2, 'asc'], [3, 'asc'], [4, 'asc']]}
              onRowClick={this.handleRowClick}
              {...this.props}
              />
          </div> :
          <div style={styles.div}><Loading/></div>
        }
      </div>
    );
  }
}

MyRequests.propTypes = {
  intl: intlShape.isRequired,
  isAuthenticated: React.PropTypes.bool.isRequired,
  isFetching: React.PropTypes.bool.isRequired,
  err: React.PropTypes.object,
  user: React.PropTypes.object.isRequired,
  myRequests: React.PropTypes.array,
  router: React.PropTypes.object.isRequired,
  dispatch: React.PropTypes.func.isRequired
};

const mapStateToProps = state => {
  const {reducers} = state;
  const {isAuthenticated, isFetching, user, myRequests, err} = reducers;

  return {
    isAuthenticated,
    isFetching,
    user,
    myRequests,
    err
  };
};

export default connect(mapStateToProps)(withRouter(injectIntl(MyRequests)));
