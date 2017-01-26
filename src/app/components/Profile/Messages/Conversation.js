import React, {Component} from 'react';
import {
  Image, List
} from 'semantic-ui-react';

export class Conversation extends Component {
  render() {
    return (
      <List.Item>
        <Image avatar src="http://semantic-ui.com/images/avatar/small/helen.jpg"/>
        <List.Content>
          <List.Header>Emily</List.Header>
        </List.Content>
      </List.Item>
    );
  }
}

Conversation.propTypes = {
  isAuthenticated: React.PropTypes.bool,
  isFetching: React.PropTypes.bool,
  err: React.PropTypes.object,
  user: React.PropTypes.object,
  router: React.PropTypes.object,
  dispatch: React.PropTypes.func.isRequired,
  recipient: React.PropTypes.object.isRequired
};
