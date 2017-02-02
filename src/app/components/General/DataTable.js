import React, {Component} from 'react';
import $ from 'jquery';
import 'datatables.net';
import 'datatables.net-se/js/dataTables.semanticui';
import 'datatables.net-se/css/dataTables.semanticui.css';
import 'datatables.net-fixedheader';
import 'datatables.net-fixedheader-se/css/fixedHeader.semanticui.css';
import {Segment} from 'semantic-ui-react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {injectIntl} from 'react-intl';

export class DataTableSemantic extends Component {
  state = {
    isTableInitialized: false
  }

  componentDidMount() {
    const {rows, columns} = this.props;
    $(".ui.table").dataTable({
      data: rows,
      columns,
      initComplete: this.setState({isTableInitialized: true})
    });
  }

  render() {
    const {isFetching, columns} = this.props;
    const {isTableInitialized} = this.state;

    return (
      <div>
        <Segment loading={isFetching && !isTableInitialized} basic>
          <table className="ui celled table">
            <thead>
              <tr>
                {columns.forEach(column => <th key={column}></th>)}
              </tr>
            </thead>
            <tfoot>
              <tr>
                {columns.forEach(column => <th key={column}></th>)}
              </tr>
            </tfoot>
            <tbody>
            </tbody>
          </table>
        </Segment>
      </div>
    );
  }
}

DataTableSemantic.propTypes = {
  rows: React.PropTypes.array.isRequired,
  columns: React.PropTypes.array,
  isFetching: React.PropTypes.bool
};

const mapStateToProps = state => {
  const {reducers} = state;
  const {isAuthenticated, isFetching, err} = reducers;

  return {
    isAuthenticated,
    isFetching,
    err
  };
};

export default connect(mapStateToProps)(withRouter(injectIntl(DataTableSemantic)));
