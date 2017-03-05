import React, {Component} from 'react';
import moment from 'moment';
import $ from 'jquery';
import {connect} from 'react-redux';
import {withRouter, Link} from 'react-router';
import {intlShape, injectIntl, FormattedMessage} from 'react-intl';
import {Button, Header, Modal} from 'semantic-ui-react';
import {DataTableSemantic} from '../General/DataTableSemantic';
import {getMyRequests, cancelRequest} from '../../actions/profile/myRequests';
import {Loading} from '../General/Loading';

const styles = {
  div: {
    margin: '15%'
  },
  noBorder: {
    border: 'none'
  }
};

class MyRequests extends Component {
  constructor(props) {
    super(props);
    this.handleRowClick = this.handleRowClick.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.handleCancelRequest = this.handleCancelRequest.bind(this);

    this.state = {
      selectedRow: null,
      err: null
    };
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

    this.setState({selectedRow: row, err: null});
  }
  handleCloseModal() {
    this.setState({err: null, selectedRow: null});
  }
  handleCancelRequest(e) {
    e.preventDefault();

    const {dispatch, user} = this.props;
    const {selectedRow} = this.state;
    const {userId} = user;
    const {requestId} = selectedRow;

    dispatch(cancelRequest({userId, requestId})).then(({err}) => {
      if (err) {
        return this.setState({err, selectedRow: null});
      }

      this.setState({err: null, selectedRow: null});
    });
  }
  render() {
    const {myRequests, intl} = this.props;
    const {selectedRow, err} = this.state;
    const {formatMessage} = intl;
    const columns = [
      {data: 'requestId', visible: false, searchable: false},
      {data: 'itemId', visible: false, searchable: false},
      {data: 'ownerId', visible: false, searchable: false},
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
      {
        data: 'status',
        title: formatMessage({id: 'myRequests.columns.status'}),
        render: id => {
          return formatMessage({id});
        }
      }
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
              order={[[3, 'asc'], [4, 'asc'], [5, 'asc'], [6, 'asc']]}
              onRowClick={this.handleRowClick}
              {...this.props}
              />
          </div> :
          <div style={styles.div}><Loading/></div>
        }
        {selectedRow &&
          <Modal dimmer="blurring" open={Boolean(selectedRow)} onClose={this.handleCloseModal} basic>
            <Header style={styles.noBorder} as="h1">
              <FormattedMessage id="myRequests.modal.title"/>
            </Header>
            <Modal.Content>
              <p>
                <FormattedMessage id="myRequests.modal.content"/>
              </p>
            </Modal.Content>
            <Modal.Actions style={styles.noBorder}>
              <Button
                disabled={selectedRow.status === 'request.status.accepted' || selectedRow.status === 'request.status.cancelled' || selectedRow.status === 'request.status.rejected'}
                content={formatMessage({id: 'myRequests.modal.cancelRequestButton'})}
                onClick={this.handleCancelRequest}
                size="huge"
                color="red"
                />
              <Button
                content={formatMessage({id: 'myRequests.modal.viewItemButton'})}
                as={Link}
                to={`/listings/${selectedRow.itemId}`}
                size="huge"
                inverted
                />
              <Button
                content={formatMessage({id: 'myRequests.modal.viewOwnersProfileButton'})}
                as={Link}
                to={`/user/${selectedRow.ownerId}`}
                size="huge"
                inverted
                />
              <Button
                content={formatMessage({id: 'modal.close'})}
                onClick={this.handleCloseModal}
                size="huge"
                inverted
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
