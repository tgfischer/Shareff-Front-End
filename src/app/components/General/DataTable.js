import React, {Component} from 'react';
import $ from 'jquery';
import 'datatables.net';
import 'datatables.net-se/js/dataTables.semanticui';
import 'datatables.net-se/css/dataTables.semanticui.css';
import 'datatables.net-fixedheader';
import 'datatables.net-fixedheader-se/css/fixedHeader.semanticui.css';

export class DataTableSemantic extends Component {
  componentDidMount() {
    const {rows, columns} = this.props;
    $(".ui.table").dataTable({
      data: rows,
      columns,
      fixedHeader: true
    });
  }

  render() {
    const {columns} = this.props;

    return (
      <div>
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
      </div>
    );
  }
}

DataTableSemantic.propTypes = {
  rows: React.PropTypes.array.isRequired,
  columns: React.PropTypes.array
};
