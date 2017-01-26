import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {
  Grid, List
} from 'semantic-ui-react';
import {intlShape, injectIntl} from 'react-intl';
import {Conversation} from './Conversation';
import MessageArea from './MessageArea';

class Messages extends Component {
  state = {
    selectedConversation: null
  }
  handleConversationClick() {

  }
  render() {
    return (
      <div>
        <Grid divided>
          <Grid.Row className="conversation">
            <Grid.Column width={4}>
              <List selection verticalAlign="middle" size="large">
                <Conversation recipient={{userId: 1}}/>
              </List>
            </Grid.Column>
            <Grid.Column width={12}>
              <MessageArea {...this.props}/>
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
  dispatch: React.PropTypes.func.isRequired
};

const mapStateToProps = state => {
  const {reducers} = state;
  const {isAuthenticated, isFetching, user, err} = reducers;

  return {
    isAuthenticated,
    isFetching,
    user,
    err
  };
};

export default connect(mapStateToProps)(withRouter(injectIntl(Messages)));
