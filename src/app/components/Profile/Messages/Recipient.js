import React, {Component} from 'react';
import {Image, List} from 'semantic-ui-react';
import {BASE_URL} from '../../../constants/constants';

export class Recipient extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    this.props.onClick(this.props);
  }
  render() {
    const {recipient} = this.props;
    const {photoUrl, firstName} = recipient;

    return (
      <List.Item onClick={this.handleClick}>
        <Image avatar src={BASE_URL + photoUrl}/>
        <List.Content>
          <List.Header>{firstName}</List.Header>
        </List.Content>
      </List.Item>
    );
  }
}

Recipient.propTypes = {
  recipient: React.PropTypes.object.isRequired,
  onClick: React.PropTypes.func.isRequired
};
