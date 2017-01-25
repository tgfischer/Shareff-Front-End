import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {
  Form, Grid, Header, Image, List, Segment
} from 'semantic-ui-react';
import {intlShape, injectIntl, FormattedMessage} from 'react-intl';

const styles = {
  messageArea: {
    margin: '0'
  }
};

class Messages extends Component {
  render() {
    const {intl} = this.props;
    const {formatMessage} = intl;

    return (
      <div>
        <Grid divided>
          <Grid.Row>
            <Grid.Column width={4}>
              <List selection verticalAlign="middle" size="large">
                <List.Item>
                  <Image avatar src="http://semantic-ui.com/images/avatar/small/helen.jpg"/>
                  <List.Content>
                    <List.Header>Emily</List.Header>
                  </List.Content>
                </List.Item>
                <List.Item>
                  <Image avatar src="http://semantic-ui.com/images/avatar/small/christian.jpg"/>
                  <List.Content>
                    <List.Header>Adam</List.Header>
                  </List.Content>
                </List.Item>
                <List.Item>
                  <Image avatar src="http://semantic-ui.com/images/avatar/small/daniel.jpg"/>
                  <List.Content>
                    <List.Header>David</List.Header>
                  </List.Content>
                </List.Item>
              </List>
            </Grid.Column>
            <Grid.Column width={12}>
              <Grid>
                <Grid.Row>
                  <Grid.Column>
                    <Header as="h1" dividing>
                      <FormattedMessage id="messages.title" values={{firstName: 'Emily', lastName: 'Guglielmi'}}/>
                      <Header.Subheader>
                        <FormattedMessage id="messages.subTitle" values={{email: 'emily.guglielmi@gmail.com'}}/>
                      </Header.Subheader>
                    </Header>
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                  <Grid style={styles.messageArea}>
                    <Grid.Row>
                      <Grid.Column width={10}>
                        <Segment size="large" compact>
                          Hello World!
                        </Segment>
                      </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                      <Grid.Column width={10} floated="right">
                        <Segment size="large" floated="right" color="blue" compact>
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ac lectus et orci vehicula lacinia. Pellentesque ultrices neque sed sem imperdiet maximus. Donec condimentum nulla felis. Aenean consequat finibus dignissim. Nulla facilisi. Nam iaculis id lectus ut placerat. Ut venenatis quam id mi rhoncus commodo. Vestibulum cursus elit eu vulputate porttitor.
                        </Segment>
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
                </Grid.Row>
                <Grid.Row verticalAlign="bottom">
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
