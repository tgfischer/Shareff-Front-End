import React, {Component} from 'react';
import {
  Button, Container, Grid, Header, Segment
} from 'semantic-ui-react';
import {intlShape, injectIntl, FormattedMessage} from 'react-intl';

class Item extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {err, intl} = this.props;
    const {formatMessage} = intl;

    return (
      <Segment>

      </Segment>
    );
  }
}

Item.propTypes = {
  intl: intlShape.isRequired,
  item: React.PropTypes.object.isRequired,
};

export default injectIntl(Item);
