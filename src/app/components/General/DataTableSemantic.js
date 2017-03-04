import React, {Component} from 'react';
import $ from 'jquery';
import 'datatables.net';
import 'datatables.net-se/js/dataTables.semanticui.js';
import 'datatables.net-se/css/dataTables.semanticui.css';
import {Segment} from 'semantic-ui-react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {injectIntl} from 'react-intl';

export class DataTableSemantic extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isTableInitialized: false
    };

    this.initTable = this.initTable.bind(this);
  }
  componentDidMount() {
    this.initTable(this.props);
  }
  componentDidUpdate(prevProps) {
    const {rows} = this.props;

    if (rows !== prevProps.rows) {
      this.initTable(this.props);
    }
  }
  initTable({rows, columns, order, onRowClick}) {
    // Initialize the table. We have to disable eslint for the next line because
    // it complains that Datatables names their function 'DataTable'
    // eslint-disable-next-line babel/new-cap
    const table = $(".ui.table").DataTable({
      data: rows,
      order: order ? order : [[1, 'asc']],
      destroy: true,
      columns,
      initComplete: this.setState({isTableInitialized: true})
    });

    // Set up the event when the user clicks a row, if they passed in the prop
    // Note, we cannot use arrow functions here because arrow functions rebind
    // 'this' with the context outside the function
    if (onRowClick) {
      table.on('click', 'tbody tr', function (e) {
        // Get the row data
        const row = table.row(this).data();

        // Fire the event handler that was passed in
        onRowClick(e, row);
      });
    }
  }
  render() {
    const {onRowClick, rows} = this.props;
    const {isTableInitialized} = this.state;

    return (
      <div>
        <Segment loading={!isTableInitialized} basic>
          <table className={onRowClick && rows.length > 0 ? "ui celled large selectable striped hover table" : "ui celled striped large table"}>
            <thead></thead>
            <tbody></tbody>
            <tfoot></tfoot>
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
