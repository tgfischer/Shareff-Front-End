import React, {Component} from 'react';
import moment from 'moment';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {intlShape, injectIntl, FormattedMessage} from 'react-intl';
import FullCalendar from '../General/FullCalendar';
import {getMySchedule} from '../../actions/profile/mySchedule';
import {Loading} from '../General/Loading';
import {Button, Grid, Header, Modal} from 'semantic-ui-react';

const styles = {
  div: {
    margin: '15%'
  },
  extpadding: {
    paddingTop: '2em',
    paddingBottom: '2em'
  },
  subHeader: {
    fontSize: '1em'
  }
};
class MySchedule extends Component {
  constructor(props) {
    super(props);

    this.state = {
      openModal: false,
      modalItemId: -1,
      modalBookingId: -1,
      modalRentalStatus: '',
      modalTitle: '',
      modalStart: '',
      modalEnd: ''
    };

    this.handleDayClick = this.handleDayClick.bind(this);
    this.handleEventClick = this.handleEventClick.bind(this);
    this.handleViewBooking = this.handleViewBooking.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.handleViewItem = this.handleViewItem.bind(this);
  }
  componentWillMount() {
    // Fetch the list of my booking data using the userId from the props
    const {user, dispatch} = this.props;
    dispatch(getMySchedule(user));
  }
  handleDayClick(date, e) {
    e.preventDefault();
  }
  handleEventClick(event, e) {
    e.preventDefault();

    // populate the modal with the booking information if it exists
    if (event && event.id) {
      this.setState({
        modalTitle: event.title,
        modalBookingId: event.id,
        modalItemId: event.itemId,
        modalStart: moment(event.start).format('MMM Do YYYY, h:mm a'),
        modalEnd: moment(event.end).format('MMM Do YYYY, h:mm a'),
        modalOpen: true
      });
    }
  }
  handleViewBooking(e) {
    e.preventDefault();

    this.props.router.push(`/booking/${this.state.modalBookingId}`);
  }
  handleViewItem(e) {
    e.preventDefault();

    this.props.router.push(`/listings/${this.state.modalItemId}`);
  }
  handleCloseModal() {
    this.setState({modalOpen: false});
  }
  render() {
    const {mySchedule, user, intl} = this.props;
    const {modalOpen, modalTitle, modalStart, modalEnd} = this.state;
    const {formatMessage} = intl;

    const rentedItems = [];
    const myItems = [];
    if (mySchedule) {
      mySchedule.forEach(booking => {
        booking.allDay = false;
        if (booking.userId === user.userId) {
          rentedItems.push(booking);
        } else {
          myItems.push(booking);
        }
      });
    }

    return (
      <div>
        {mySchedule ?
          <div>
            <FullCalendar
              onDayClick={this.handleDayClick}
              onEventClick={this.handleEventClick}
              rentedItems={rentedItems} myItems={myItems}
              {...this.props}
              />
            <Modal dimmer="blurring" open={modalOpen} onClose={this.handleCloseModal} size="small">
              <Modal.Header>
                <Header as="h1">
                  <FormattedMessage id="mySchedule.modal.title" values={{itemName: modalTitle}}/>
                </Header>
              </Modal.Header>
              <Modal.Content>
                <div style={styles.extpadding}>
                  <Grid stackable verticalAlign="middle">
                    <Grid.Row columns={2}>
                      <Grid.Column textAlign="center">
                        <Header as="h1" display="inline">
                          <FormattedMessage id="mySchedule.modal.startDate"/>
                          <Header.Subheader style={styles.subHeader}>
                            {modalStart}
                          </Header.Subheader>
                        </Header>
                      </Grid.Column>
                      <Grid.Column textAlign="center">
                        <Header as="h1" display="inline">
                          <FormattedMessage id="mySchedule.modal.endDate"/>
                          <Header.Subheader style={styles.subHeader}>
                            {modalEnd}
                          </Header.Subheader>
                        </Header>
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
                </div>
              </Modal.Content>
              <Modal.Actions>
                <Button
                  content={formatMessage({id: 'mySchedule.modal.viewBookingButton'})}
                  onClick={this.handleViewBooking}
                  size="huge"
                  type="submit"
                  primary
                  />
                <Button
                  content={formatMessage({id: 'mySchedule.modal.viewItemButton'})}
                  onClick={this.handleViewItem}
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
          </div> :
          <div style={styles.div}><Loading/></div>
        }
      </div>
    );
  }
}

MySchedule.propTypes = {
  intl: intlShape.isRequired,
  isAuthenticated: React.PropTypes.bool.isRequired,
  isFetching: React.PropTypes.bool.isRequired,
  err: React.PropTypes.object,
  user: React.PropTypes.object.isRequired,
  mySchedule: React.PropTypes.array,
  rentedItems: React.PropTypes.array,
  myItems: React.PropTypes.array,
  router: React.PropTypes.object.isRequired,
  dispatch: React.PropTypes.func.isRequired
};

const mapStateToProps = state => {
  const {reducers} = state;
  const {isAuthenticated, isFetching, user, mySchedule, err} = reducers;

  return {
    isAuthenticated,
    isFetching,
    user,
    mySchedule,
    err
  };
};

export default connect(mapStateToProps)(withRouter(injectIntl(MySchedule)));
