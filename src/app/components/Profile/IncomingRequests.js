import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter, Link} from 'react-router';
import {intlShape, injectIntl, FormattedMessage} from 'react-intl';
import {Button, Form, Header, Modal} from 'semantic-ui-react';
import moment from 'moment';
import validator from 'validator';
import $ from 'jquery';
import {DataTableSemantic} from '../General/DataTableSemantic';
import {getIncomingRequests, updateStatus} from '../../actions/profile/incomingRequests';
import {ACCEPT_RENT_REQUEST, UPDATE_REQUEST_STATUS_OPTIONS} from '../../constants/constants';
import {Loading} from '../General/Loading';
import '../../../assets/datatables/datetime-moment.js';

const styles = {
  div: {
    margin: "15%"
  }
};

class IncomingRequests extends Component {
  state = {
    selectedRow: null,
    err: null
  }
  constructor(props) {
    super(props);
    this.handleRowClick = this.handleRowClick.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.handleUpdateStatus = this.handleUpdateStatus.bind(this);
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

    this.setState({selectedRow: row, err: null});
  }
  handleCloseModal = () => this.setState({err: null, selectedRow: null})
  handleUpdateStatus(e, {formData}) {
    e.preventDefault();

    const {dispatch, requests, user} = this.props;
    const {selectedRow} = this.state;
    const {status} = formData;
    const {userId} = user;
    const approved = status === ACCEPT_RENT_REQUEST;

    dispatch(updateStatus({oldRequests: requests, request: selectedRow, userId, approved, status})).then(({err}) => {
      if (err) {
        return this.setState({err, selectedRow: null});
      }

      this.setState({err: null, selectedRow: null});
    });
  }
  render() {
    const {selectedRow, err} = this.state;
    const {intl, requests} = this.props;
    const {formatMessage} = intl;
    const {unescape} = validator;
    const columns = [
      {data: 'requestId', visible: false, searchable: false},
      {data: 'itemId', visible: false, searchable: false},
      {data: 'renterId', visible: false, searchable: false},
      {data: 'status', visible: false, searchable: false},
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

    // Translate the options, and add them to a list to be rendered
    const options = [];
    UPDATE_REQUEST_STATUS_OPTIONS.forEach(({key, value}) => {
      options.push({value, text: formatMessage({id: key})});
    });

    return (
      <div>
        {requests ?
          <div>
            <Header as="h1" dividing>
              <FormattedMessage id="incomingRequests.title"/>
              <Header.Subheader>
                <FormattedMessage id="incomingRequests.subTitle"/>
              </Header.Subheader>
            </Header>

            <DataTableSemantic
              rows={requests}
              columns={columns}
              order={[[4, 'asc'], [6, 'asc'], [7, 'asc'], [5, 'asc']]}
              onRowClick={this.handleRowClick}
              {...this.props}
              />
          </div> :
          <div style={styles.div}><Loading/></div>
        }
        {selectedRow &&
          <Modal size="small" dimmer="blurring" open={Boolean(selectedRow)} onClose={this.handleCloseModal}>
            <Modal.Header>
              <Header as="h1">
                <FormattedMessage id="incomingRequests.modal.title" values={{itemTitle: selectedRow.itemTitle}}/>
              </Header>
            </Modal.Header>
            <Modal.Content>
              <Form size="huge" onSubmit={this.handleUpdateStatus}>
                <Form.Select
                  label={formatMessage({id: 'incomingRequests.modal.updateStatusLabel'})}
                  options={options}
                  placeholder={unescape(selectedRow.status) || ''}
                  name="status"
                  required
                  />
                <Button
                  content={formatMessage({id: 'incomingRequests.modal.updateStatusButton'})}
                  size="huge"
                  type="submit"
                  primary
                  />
              </Form>
            </Modal.Content>
            <Modal.Actions>
              <Button
                content={formatMessage({id: 'incomingRequests.modal.viewItemButton'})}
                as={Link}
                to={`/listings/${selectedRow.itemId}`}
                size="huge"
                basic
                />
              <Button
                content={formatMessage({id: 'incomingRequests.modal.viewRentersProfileButton'})}
                as={Link}
                to={`/user/${selectedRow.renterId}`}
                size="huge"
                basic
                />
              <Button
                content={formatMessage({id: 'modal.close'})}
                onClick={this.handleCloseModal}
                size="huge"
                basic
                />
            </Modal.Actions>
          </Modal>
        }
        {err &&
          <Modal size="small" dimmer="blurring" open={Boolean(err)} onClose={this.handleCloseModal}>
            <Modal.Header>
              <Header as="h1">
                <FormattedMessage id="modal.error"/>
              </Header>
            </Modal.Header>
            <Modal.Content>
              <Header as="h3">
                <FormattedMessage id="error.general"/>
              </Header>
            </Modal.Content>
            <Modal.Actions>
              <Button
                content={formatMessage({id: 'modal.okay'})}
                onClick={this.handleCloseModal}
                size="huge"
                primary
                />
            </Modal.Actions>
          </Modal>
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
