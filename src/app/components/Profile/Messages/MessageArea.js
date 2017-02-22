import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {
  Button, Divider, Form, Grid, Header, Image, Modal, Segment
} from 'semantic-ui-react';
import {intlShape, injectIntl, FormattedMessage} from 'react-intl';
import {BASE_URL} from '../../../constants/constants';
import $ from 'jquery';
import moment from 'moment';
import io from 'socket.io-client';

const socket = io.connect(BASE_URL);

class MessageArea extends Component {
  constructor(props) {
    super(props);
    this.handleSendMessage = this.handleSendMessage.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);

    this.state = {
      navBarHeight: 0,
      pageHeaderHeight: 0,
      verticalSegmentPadding: 0,
      contentColumnPadding: 0,
      contentSegmentBorderWidth: 0,
      conversationHeaderHeight: 0,
      messageInputHeight: 0,
      dividerBorderWidth: 0,
      messages: props.messages,
      err: null
    };
  }
  componentDidMount() {
    // Get the height of all of the elements that are above and below the message
    // area, so we can subtract them from the viewport height. This forces the
    // max height of the message area to fit on the screen
    const navBarHeight = $('.nav-bar').outerHeight();
    const pageHeaderHeight = $('.page-header').outerHeight();
    const verticalSegmentPadding = Number.parseInt($('.content-column').css('padding-top').replace('px', ''), 10) +
      Number.parseInt($('.content-column').css('padding-bottom').replace('px', ''), 10);
    const contentColumnPadding = Number.parseInt($('.vertical-segment').css('padding-top').replace('px', ''), 10) +
      Number.parseInt($('.vertical-segment').css('padding-bottom').replace('px', ''), 10);
    const contentSegmentBorderWidth = Number.parseInt($('.content-segment').css('border-width').replace('px', ''), 10) * 2;
    const conversationHeaderHeight = $('.conversation-header').outerHeight();
    const messageInputHeight = $('.message-input').outerHeight();
    const dividerBorderWidth = Number.parseInt($('.separator').css('border-width').replace('px', ''), 10) * 2;

    this.setState({navBarHeight});
    this.setState({pageHeaderHeight});
    this.setState({verticalSegmentPadding});
    this.setState({contentColumnPadding});
    this.setState({contentSegmentBorderWidth});
    this.setState({conversationHeaderHeight});
    this.setState({messageInputHeight});
    this.setState({dividerBorderWidth});

    const {conversationId, user} = this.props;
    const {userId} = user;
    const token = localStorage.getItem('token');

    // Connect to the chatroom
    socket.emit('subscribe', {
      conversationId,
      userId,
      token
    });

    // Receive the messages from the server
    socket.on('receive:messages', messages => {
      // Update the messages in the chatbox
      this.setState({messages});
    });

    // Receive the messages from the server
    socket.on('error', err => {
      // Update the messages in the chatbox
      this.setState({err});
    });
  }
  componentDidUpdate() {
    // Scroll to the bottom of the div
    $('.message-area').scrollTop($('.message-area').prop('scrollHeight'));
  }
  handleSendMessage(e, {formData}) {
    e.preventDefault();

    const {conversationId, user} = this.props;
    const {userId} = user;
    const {content} = formData;
    const token = localStorage.getItem('token');

    // Send the message to the server
    socket.emit('send:message', {
      senderId: userId,
      conversationId,
      content,
      token
    });

    // Clear the input
    e.target[0].value = "";
  }
  handleCloseModal() {
    this.setState({err: null});
  }
  render() {
    const {
      navBarHeight, pageHeaderHeight, verticalSegmentPadding,
      contentColumnPadding, contentSegmentBorderWidth, conversationHeaderHeight,
      messageInputHeight, dividerBorderWidth, messages, err
    } = this.state;
    const {intl, recipient, item, rentRequest, user} = this.props;
    const {firstName, lastName, photoUrl} = recipient;
    const {startDate, endDate} = rentRequest;
    const {formatMessage} = intl;

    // Resize the message area so it doesn't add a scrollbar to the viewport,
    // but instead add a scrollbar to the message area
    const styles = {
      messageArea: {
        maxHeight: `calc(100vh - ${navBarHeight}px - ${pageHeaderHeight}px - \
          ${verticalSegmentPadding}px - ${contentColumnPadding}px - \
          ${contentSegmentBorderWidth}px - ${conversationHeaderHeight}px - \
          ${messageInputHeight}px - ${dividerBorderWidth}px)`,
        overflow: 'auto'
      },
      messageGrid: {
        margin: '0',
        width: '100%'
      },
      divider: {
        margin: '0 1em'
      }
    };

    return (
      <div>
        <Grid>
          <Grid.Row className="conversation-header" verticalAlign="middle">
            <Grid.Column>
              <Header as="h1">
                <Image src={BASE_URL + photoUrl} shape="rounded"/>
                <Header.Content>
                  <FormattedMessage id="messages.title" values={{firstName, lastName}}/>
                  <Header.Subheader>
                    <FormattedMessage id="messages.requestedItem" values={{item: item.title}}/>
                  </Header.Subheader>
                  <Header.Subheader>
                    {moment(startDate).format('MMM Do YYYY, h:mm a')} &#8594; {moment(endDate).format('MMM Do YYYY, h:mm a')}
                  </Header.Subheader>
                </Header.Content>
              </Header>
            </Grid.Column>
          </Grid.Row>
          <Divider style={styles.divider} className="separator"/>
          <Grid.Row style={styles.messageArea} className="message-area">
            <Grid style={styles.messageGrid}>
              {messages.map(({senderId, timeSent, content}, i) => {
                // Check if this message was sent by the logged in user, or the
                // recipient
                const floated = user.userId === senderId ? 'right' : undefined;
                const colour = user.userId === senderId ? 'blue' : undefined;

                // Render the message in the message area
                return (
                  <Grid.Row key={i}>
                    <Grid.Column floated={floated} width={10}>
                      <Segment size="large" floated={floated} color={colour} compact>
                        {content}
                      </Segment>
                    </Grid.Column>
                  </Grid.Row>
                );
              })}
            </Grid>
          </Grid.Row>
          <Grid.Row className="message-input" verticalAlign="bottom">
            <Grid.Column>
              <Form onSubmit={this.handleSendMessage} size="large">
                <Form.Input
                  label={formatMessage({id: 'messages.inputLabel'})}
                  action={{color: 'blue', labelPosition: 'right', icon: 'send', content: formatMessage({id: 'messages.sendButton'}), size: 'large'}}
                  name="content"
                  placeholder={formatMessage({id: 'messages.inputPlaceholder'})}
                  autoComplete="off"
                  type="text"
                  required
                  />
              </Form>
            </Grid.Column>
          </Grid.Row>
        </Grid>
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
      </div>
    );
  }
}

MessageArea.propTypes = {
  intl: intlShape.isRequired,
  isAuthenticated: React.PropTypes.bool,
  isFetching: React.PropTypes.bool,
  err: React.PropTypes.object,
  user: React.PropTypes.object,
  router: React.PropTypes.object,
  dispatch: React.PropTypes.func.isRequired,
  conversationId: React.PropTypes.string.isRequired,
  messages: React.PropTypes.array.isRequired,
  item: React.PropTypes.object.isRequired,
  recipient: React.PropTypes.object.isRequired,
  rentRequest: React.PropTypes.object.isRequired
};

const mapStateToProps = state => {
  const {reducers} = state;
  const {
    isAuthenticated, isFetching, user, err
  } = reducers;

  return {
    isAuthenticated,
    isFetching,
    user,
    err
  };
};

export default connect(mapStateToProps)(withRouter(injectIntl(MessageArea)));
