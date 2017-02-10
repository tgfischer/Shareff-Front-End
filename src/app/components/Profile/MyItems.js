import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {intlShape, injectIntl} from 'react-intl';
import {DataTableSemantic} from '../General/DataTableSemantic';
import {getMyItems} from '../../actions/profile/myItems';
import {Loading} from '../General/Loading';

const styles = {
  div: {
    margin: "15%"
  }
};

class MyItems extends Component {
  componentWillMount() {
    // Fetch the list of my items data using the ownerId from the props
    const {user, dispatch} = this.props;
    dispatch(getMyItems(user));
  }
  render() {
    const {myItems, intl} = this.props;
    const {formatMessage} = intl;
    const columns = [
      {data: 'itemId', visible: false, searchable: false},
      {data: 'costPeriod', visible: false, searchable: false},
      {data: 'title', title: formatMessage({id: 'myItems.columns.title'})},
      {data: 'category', title: formatMessage({id: 'myItems.columns.category'})},
      {
        data: 'price',
        title: formatMessage({id: 'myItems.columns.price'}),
        render: (data, type, {costPeriod}) => {
          return `$${data} per ${costPeriod}`;
        }
      }
    ];

    return (
      <div>
        {myItems ?
          <DataTableSemantic rows={myItems} columns={columns} {...this.props}/> :
          <div style={styles.div}><Loading/></div>
        }
      </div>
    );
  }
}

MyItems.propTypes = {
  intl: intlShape.isRequired,
  isAuthenticated: React.PropTypes.bool.isRequired,
  isFetching: React.PropTypes.bool.isRequired,
  err: React.PropTypes.object,
  user: React.PropTypes.object.isRequired,
  myItems: React.PropTypes.array,
  router: React.PropTypes.object.isRequired,
  dispatch: React.PropTypes.func.isRequired
};

const mapStateToProps = state => {
  const {reducers} = state;
  const {isAuthenticated, isFetching, user, myItems, err} = reducers;

  return {
    isAuthenticated,
    isFetching,
    user,
    myItems,
    err
  };
};

export default connect(mapStateToProps)(withRouter(injectIntl(MyItems)));
