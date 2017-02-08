import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {
  Form, Grid, Header, Image, Segment
} from 'semantic-ui-react';
import {intlShape, injectIntl, FormattedMessage} from 'react-intl';
import {BASE_URL} from '../../../constants/constants';
import $ from 'jquery';

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
  }
  componentDidUpdate() {
    // Scroll to the bottom of the div
    $('.message-area').scrollTop($('.message-area').prop('scrollHeight'));
  }
  render() {
    const {
      navBarHeight, pageHeaderHeight, verticalSegmentPadding,
      contentColumnPadding, contentSegmentBorderWidth, conversationHeaderHeight,
      messageInputHeight
    } = this.state;
    const {intl, messages, recipient, user} = this.props;
    const {formatMessage} = intl;
    const {firstName, lastName, photoUrl, email} = recipient;

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
      }
    };

    return (
      <Grid>
        <Grid.Row className="conversation-header">
          <Grid.Column>
            <Header as="h1" dividing>
              <Image src={BASE_URL + photoUrl} shape="rounded" bordered/>
              <Header.Content>
                <FormattedMessage id="messages.title" values={{firstName, lastName}}/>
                <Header.Subheader>
                  <FormattedMessage id="messages.subTitle" values={{email}}/>
                </Header.Subheader>
              </Header.Content>
            </Header>
          </Grid.Column>
        </Grid.Row>
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
            <Form size="large">
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
  messages: React.PropTypes.array.isRequired,
  item: React.PropTypes.object.isRequired,
  recipient: React.PropTypes.object.isRequired,
  rentRequest: React.PropTypes.object.isRequired
};

const mapStateToProps = state => {
  const {reducers} = state;
  const {
    isAuthenticated, isFetching, messages, item, recipient, rentRequest, user,
    err
  } = reducers;

  return {
    isAuthenticated,
    isFetching,
    messages,
    item,
    recipient,
    rentRequest,
    user,
    err
  };
};

export default connect(mapStateToProps)(withRouter(injectIntl(MessageArea)));
