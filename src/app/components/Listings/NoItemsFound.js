import React, {Component} from 'react';
import {
  Container, Grid, Message, Segment
} from 'semantic-ui-react';
import {intlShape, injectIntl} from 'react-intl';

const styles = {
  segment: {
    paddingTop: '3em'
  }
};

class NoItemsFound extends Component {
  render() {
    const {intl} = this.props;
    const {formatMessage} = intl;

    return (
      <Segment style={styles.segment} vertical>
        <Container>
          <Grid stackable>
            <Grid.Row>
              <Grid.Column>
                <Message
                  icon="frown"
                  size="huge"
                  header={formatMessage({id: 'noItemsFound.title'})}
                  content={formatMessage({id: 'noItemsFound.content'})}
                  />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      </Segment>
    );
  }
}

NoItemsFound.propTypes = {
  intl: intlShape.isRequired
};

export default injectIntl(NoItemsFound);
