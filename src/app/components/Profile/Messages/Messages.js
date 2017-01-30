import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {
  Grid, Header, Icon, List, Segment
} from 'semantic-ui-react';
import {intlShape, injectIntl, FormattedMessage} from 'react-intl';
import {Recipient} from './Recipient';
import MessageArea from './MessageArea';

class Messages extends Component {
  state = {
    selectedRecipient: null
  }
  constructor(props) {
    super(props);
    this.handleRecipientClick = this.handleRecipientClick.bind(this);
  }
  handleRecipientClick = ({recipient}) => this.setState({selectedRecipient: recipient.userId})
  render() {
    const {selectedRecipient} = this.state;

    return (
      <div>
        <Grid divided>
          <Grid.Row className="conversation">
            <Grid.Column width={4}>
              <List selection verticalAlign="middle" size="large">
                <Recipient onClick={this.handleRecipientClick} recipient={{userId: 'a57ef477-6383-4797-b9b6-27dbe62d9010', firstName: 'Bill', lastName: 'Fischer', email: 'tfische5@uwo.ca', photoUrl: '/photos/uploads/profile/9ca9df5d-260a-4f62-9f74-ce8d22dded28.JPG'}}/>
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
