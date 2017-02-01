import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {intlShape, injectIntl} from 'react-intl';
import {DataTableSemantic} from '../General/DataTable';
import {getMyItems} from '../../actions/profile';

class MyItems extends Component {

  componentWillMount() {
    // Fetch the list of my items data using the ownerId from the props
    const {userId} = this.props.user;
    this.props.dispatch(getMyItems(userId));
  }

  render() {
    const column = [
      {data: 'title', title: "Title"},
      {data: 'category', title: "Category"},
      {data: 'description', title: "Description"},
      {data: 'price', title: "Price"},
      {data: 'termsOfUse', title: "Term of use"}
    ];
    const {myItems} = this.props;

    return (
      <div>
        <DataTableSemantic rows={myItems} columns={column}/>
      </div>
    );
  }
}

MyItems.propTypes = {
  intl: intlShape.isRequired,
  isAuthenticated: React.PropTypes.bool,
  isFetching: React.PropTypes.bool,
  err: React.PropTypes.object,
  user: React.PropTypes.object,
  myItems: React.PropTypes.array.isRequired,
  router: React.PropTypes.object,
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
