import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {
  Divider, Form, Grid, Header, Image, Segment
} from 'semantic-ui-react';
import {intlShape, injectIntl, FormattedMessage} from 'react-intl';
import {BASE_URL} from '../../../constants/constants';
import $ from 'jquery';
import moment from 'moment';
import io from 'socket.io-client';

const socket = io.connect(BASE_URL);

class MessageArea extends Component {
  state = {
    navBarHeight: 0,
    pageHeaderHeight: 0,
    verticalSegmentPadding: 0,
    contentColumnPadding: 0,
    contentSegmentBorderWidth: 0,
    conversationHeaderHeight: 0,
    messageInputHeight: 0
  }
  constructor(props) {
    super(props);
    this.handleSendMessage = this.handleSendMessage.bind(this);
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

    this.setState({navBarHeight});
    this.setState({pageHeaderHeight});
    this.setState({verticalSegmentPadding});
    this.setState({contentColumnPadding});
    this.setState({contentSegmentBorderWidth});
    this.setState({conversationHeaderHeight});
    this.setState({messageInputHeight});

    socket.emit('subscribe', this.props.conversationId);
    socket.on('receive:message', message => {
      console.log(message);
    });
  }
  componentDidUpdate() {
    // Scroll to the bottom of the div
    $('.message-area').scrollTop($('.message-area').prop('scrollHeight'));
  }
  handleSendMessage(e, {formData}) {
    e.preventDefault();

    const {conversationId} = this.props;
    const {message} = formData;

    socket.emit('send:message', {
      room: conversationId,
      message
    });
  }
  render() {
    const {
      navBarHeight, pageHeaderHeight, verticalSegmentPadding,
      contentColumnPadding, contentSegmentBorderWidth, conversationHeaderHeight,
      messageInputHeight
    } = this.state;
    const {intl, messages, recipient, item, rentRequest, user} = this.props;
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
          ${messageInputHeight}px)`,
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
        <Divider style={styles.divider}/>
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
                name="message"
                placeholder={formatMessage({id: 'messages.inputPlaceholder'})}
                type="text"
                required
                />
            </Form>
          </Grid.Column>
        </Grid.Row>
      </Grid>
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
