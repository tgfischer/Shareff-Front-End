import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {
  Grid, Header, Icon, List, Segment
} from 'semantic-ui-react';
import {intlShape, injectIntl, FormattedMessage} from 'react-intl';
import {Recipient} from './Recipient';
import MessageArea from './MessageArea';
import {getConversations} from '../../../actions/profile';

class Messages extends Component {
  state = {
    selectedRecipient: null
  }
  constructor(props) {
    super(props);
    this.handleRecipientClick = this.handleRecipientClick.bind(this);
  }
  componentWillMount() {
    const {user, dispatch} = this.props;

    dispatch(getConversations(user));
  }
  handleRecipientClick = ({userId}) => this.setState({selectedRecipient: userId})
  render() {
    const {conversations} = this.props;
    const {selectedRecipient} = this.state;

    return (
      <div>
        <Grid divided>
          <Grid.Row className="conversation">
            <Grid.Column width={4}>
              <List selection verticalAlign="middle" size="large">
                {conversations && conversations.map(({userId, firstName, lastName, itemTitle, photoUrl}, i) => {
                  return (
                    <Recipient
                      key={i}
                      onClick={this.handleRecipientClick}
                      userId={userId}
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
              {selectedRecipient &&
                <MessageArea recipient={selectedRecipient} {...this.props}/>
              }
              {!selectedRecipient &&
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
  conversations: React.PropTypes.array
};

const mapStateToProps = state => {
  const {reducers} = state;
  const {isAuthenticated, isFetching, conversations, user, err} = reducers;

  return {
    isAuthenticated,
    isFetching,
    conversations,
    user,
    err
  };
};

export default connect(mapStateToProps)(withRouter(injectIntl(Messages)));
