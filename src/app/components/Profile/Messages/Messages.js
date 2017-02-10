import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {
  Grid, Header, Icon, List, Segment
} from 'semantic-ui-react';
import {intlShape, injectIntl, FormattedMessage} from 'react-intl';
import {Recipient} from './Recipient';
import MessageArea from './MessageArea';
import {getConversations, getMessages} from '../../../actions/profile/profile';

class Messages extends Component {
  state = {
    conversationId: null
  }
  constructor(props) {
    super(props);
    this.handleRecipientClick = this.handleRecipientClick.bind(this);
  }
  componentWillMount() {
    const {user, dispatch} = this.props;
    dispatch(getConversations(user));
  }
  handleRecipientClick = ({conversationId, requestId, recipientId}) => {
    const {userId} = this.props.user;

    // Get the messages
    this.props.dispatch(getMessages({conversationId, requestId, recipientId, userId})).then(({err}) => {
      if (!err) {
        // Set the selected recipient with the user id and the conversation id
        this.setState({conversationId});
      }
    });
  }
  render() {
    const {conversations, messages, item, recipient, rentRequest} = this.props;
    const {conversationId} = this.state;

    return (
      <div>
        <Grid divided>
          <Grid.Row className="conversation">
            <Grid.Column width={4}>
              <List selection verticalAlign="middle" size="large">
                {conversations && conversations.map(({userId, conversationId, requestId, firstName, lastName, itemTitle, photoUrl}, i) => {
                  return (
                    <Recipient
                      key={i}
                      onClick={this.handleRecipientClick}
                      userId={userId}
                      requestId={requestId}
                      conversationId={conversationId}
                      firstName={firstName}
                      lastName={lastName}
                      tooltip={itemTitle}
                      photoUrl={photoUrl}
                      />
                  );
                })}
              </List>
            </Grid.Column>
            <Grid.Column width={12}>
              {conversationId && conversationId && messages && item && recipient && rentRequest &&
                <MessageArea conversationId={conversationId} messages={messages} item={item} recipient={recipient} rentRequest={rentRequest} {...this.props}/>
              }
              {!conversationId &&
                <Segment textAlign="center" basic>
                  <Header as="h2" icon>
                    <Icon name="warning"/>
                    <FormattedMessage id="messages.selectRecipientHeader"/>
                    <Header.Subheader>
                      <FormattedMessage id="messages.selectRecipientSubHeader"/>
                    </Header.Subheader>
                  </Header>
                </Segment>
              }
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

Messages.propTypes = {
  intl: intlShape.isRequired,
  isAuthenticated: React.PropTypes.bool,
  isFetching: React.PropTypes.bool,
  err: React.PropTypes.object,
  user: React.PropTypes.object,
  router: React.PropTypes.object,
  dispatch: React.PropTypes.func.isRequired,
  conversations: React.PropTypes.array,
  messages: React.PropTypes.array,
  item: React.PropTypes.object,
  recipient: React.PropTypes.object,
  rentRequest: React.PropTypes.object
};

const mapStateToProps = state => {
  const {reducers} = state;
  const {
    isAuthenticated, isFetching, conversations, messages, item, recipient,
    rentRequest, user, err
  } = reducers;

  return {
    isAuthenticated,
    isFetching,
    conversations,
    messages,
    item,
    recipient,
    rentRequest,
    user,
    err
  };
};

export default connect(mapStateToProps)(withRouter(injectIntl(Messages)));
