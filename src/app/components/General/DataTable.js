import React, {Component} from 'react';
import $ from 'jquery';
import 'datatables.net';
import 'datatables.net-se/js/dataTables.semanticui';
import 'datatables.net-se/css/dataTables.semanticui.css';
import 'datatables.net-fixedheader';
import 'datatables.net-fixedheader-se/css/fixedHeader.semanticui.css';

export class DataTableSemantic extends Component {
  componentDidMount() {
    $(".ui.table").dataTable({fixedHeader: true});
  }

  render() {
    const {items, columns} = this.props;

    return (
      <div>
        <table className="ui celled table">
          <thead>
            <tr>
              {columns.map(column => <th key={column}>{column}</th>)}
            </tr>
          </thead>
          <tfoot>
            <tr>
              {columns.map(column => <th key={column}>{column}</th>)}
            </tr>
          </tfoot>
          <tbody>
            {items.map((item, index) => {
              return (<tr key={index}>{
                columns.map(column =>
                  <td key={column}>{item[column]}</td>
                )
              }
              </tr>);
            })
            }
          </tbody>
        </table>
      </div>
    );
  }
}

DataTableSemantic.propTypes = {
  items: React.PropTypes.array.isRequired,
  columns: React.PropTypes.array
};
