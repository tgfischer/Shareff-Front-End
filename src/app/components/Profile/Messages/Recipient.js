import React, {Component} from 'react';
import {Image, List, Popup} from 'semantic-ui-react';
import {BASE_URL} from '../../../constants/constants';

export class Recipient extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    const {conversationId, requestId, userId} = this.props;

    this.props.onClick({
      recipientId: userId,
      conversationId,
      requestId
    });
  }
  render() {
    const {photoUrl, firstName, lastName, tooltip} = this.props;

    return (
      <Popup
        trigger={
          <List.Item onClick={this.handleClick}>
            <Image src={BASE_URL + photoUrl} size="mini" shape="rounded" bordered/>
            <List.Content>
              <List.Header>{firstName} {lastName}</List.Header>
            </List.Content>
          </List.Item>
        }
        content={tooltip}
        inverted
        />
    );
  }
}

Recipient.propTypes = {
  userId: React.PropTypes.string.isRequired,
  conversationId: React.PropTypes.string.isRequired,
  requestId: React.PropTypes.string.isRequired,
  firstName: React.PropTypes.string.isRequired,
  lastName: React.PropTypes.string.isRequired,
  photoUrl: React.PropTypes.string.isRequired,
  tooltip: React.PropTypes.string.isRequired,
  onClick: React.PropTypes.func.isRequired
};
