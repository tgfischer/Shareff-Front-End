import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {intlShape, injectIntl} from 'react-intl';
import {DataTableSemantic} from '../General/DataTable';
import {getMyItems} from '../../actions/profile';
import {Loading} from '../General/Loading';

const styles = {
  div: {
    margin: "15%"
  }
};

class MyItems extends Component {

  componentWillMount() {
    // Fetch the list of my items data using the ownerId from the props
    const {user} = this.props;
    this.props.dispatch(getMyItems(user));
  }
  render() {
    const column = [
      {data: 'title', title: "Title"},
      {data: 'category', title: "Category"},
      {data: 'description', title: "Description"},
      {data: 'price', title: "Price"},
      {data: 'termsOfUse', title: "Term of use"}
    ];
    const {isFetching, myItems} = this.props;

    return (
      <div>
        {isFetching || !myItems ?
          <div style={styles.div}><Loading/></div> :
          <DataTableSemantic rows={myItems} columns={column}/>
        }
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
  myItems: React.PropTypes.array,
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
