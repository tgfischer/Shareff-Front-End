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
    const {rows, columns, order, onRowClick} = this.props;

    // Initialize the table
    const table = $(".ui.table").dataTable({
      data: rows,
      order: order ? order : [[1, 'asc']],
      columns,
      initComplete: this.setState({isTableInitialized: true})
    });

    // Set up the event when the user clicks a row, if they passed in the prop
    if (onRowClick) {
      table.on('click', 'tbody tr', e => {
        // Get the row data
        const row = table.row(this).data();

        // Fire the event handler that was passed in
        onRowClick(e, row);
      });
    }
  }
  render() {
    const {columns, onRowClick} = this.props;
    const {isTableInitialized} = this.state;

    return (
      <div>
        <Segment loading={!isTableInitialized} basic>
          <table className={onRowClick ? "ui celled large hover table" : "ui celled large table"}>
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
  columns: React.PropTypes.array.isRequired,
  order: React.PropTypes.array,
  isFetching: React.PropTypes.bool.isRequired,
  onRowClick: React.PropTypes.func
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
