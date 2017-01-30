import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link, withRouter} from 'react-router';
import {
  Breadcrumb, Container, Grid, Header, Menu, Segment
} from 'semantic-ui-react';
import {intlShape, injectIntl, FormattedMessage} from 'react-intl';
import NavBar from '../General/NavBar';
import PersonalInfo from './PersonalInfo';
import MyItem from './YourItem';
import UploadItem from './UploadItem';
import Messages from './Messages/Messages';

const styles = {
  wrapper: {
    height: '100%'
  }
};

class Profile extends Component {
  state = {
    activeTab: 'personalInfo'
  }
  constructor(props) {
    super(props);
    this.handleTabClick = this.handleTabClick.bind(this);
  }
  handleTabClick(e, {name}) {
    // Prevent the default action
    e.preventDefault();

    this.setState({activeTab: name});
  }
  render() {
    const {activeTab} = this.state;
    const {user} = this.props;
    const {firstName, lastName} = user;

    return (
      <div style={styles.wrapper}>
        <NavBar/>
        <Segment className="page-header" color="blue" inverted vertical>
          <Container>
            <Grid stackable>
              <Grid.Row>
                <Grid.Column>
                  <Breadcrumb>
                    <Breadcrumb.Section as={Link} to="/">
                      <FormattedMessage id="breadcrumb.home"/>
                    </Breadcrumb.Section>
                    <Breadcrumb.Divider icon="right angle"/>
                    <Breadcrumb.Section active>
                      <FormattedMessage id="breadcrumb.profile"/>
                    </Breadcrumb.Section>
                  </Breadcrumb>

                  <Header as="h1" size="huge" className="bold" inverted>
                    <FormattedMessage id="profile.title" values={{firstName, lastName}}/>
                  </Header>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Container>
        </Segment>
        <Segment className="vertical-segment" vertical>
          <Container>
            <Grid stackable>
              <Grid.Row>
                <Grid.Column width={4}>
                  <Menu size={'huge'} fluid vertical tabular>
                    <Menu.Item name="personalInfo" active={activeTab === 'personalInfo'} onClick={this.handleTabClick}>
                      <FormattedMessage id="profile.personalInfo"/>
                    </Menu.Item>
                    <Menu.Item name="messages" active={activeTab === 'messages'} onClick={this.handleTabClick}>
                      <FormattedMessage id="profile.messages"/>
                    </Menu.Item>
                    <Menu.Item name="billing" active={activeTab === 'billing'} onClick={this.handleTabClick}>
                      <FormattedMessage id="profile.billing"/>
                    </Menu.Item>
                    <Menu.Item name="rentSchedule" active={activeTab === 'rentSchedule'} onClick={this.handleTabClick}>
                      <FormattedMessage id="profile.rentSchedule"/>
                    </Menu.Item>
                    <Menu.Item name="rentItem" active={activeTab === 'myItem'} onClick={this.handleTabClick}>
                      <FormattedMessage id="profile.myItem"/>
                    </Menu.Item>
                    <Menu.Item name="uploadItem" active={activeTab === 'uploadItem'} onClick={this.handleTabClick}>
                      <FormattedMessage id="profile.uploadItem"/>
                    </Menu.Item>
                  </Menu>
                </Grid.Column>
                <Grid.Column className="content-column" width={12}>
                  <Segment className="content-segment">
                    {activeTab === 'personalInfo' &&
                      <PersonalInfo {...this.props}/>
                    }
                    {activeTab === 'myItem' &&
                      <MyItem {...this.props}/>
                    }
                    {activeTab === 'messages' &&
                      <Messages {...this.props}/>
                    }
                    {activeTab === 'uploadItem' &&
                      <UploadItem {...this.props}/>
                    }
                  </Segment>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Container>
        </Segment>
      </div>
    );
  }
}

Profile.propTypes = {
  intl: intlShape.isRequired,
  isAuthenticated: React.PropTypes.bool,
  user: React.PropTypes.object,
  router: React.PropTypes.object,
  dispatch: React.PropTypes.func.isRequired
};

const mapStateToProps = state => {
  const {reducers} = state;
  const {isAuthenticated, user} = reducers;

  return {
    isAuthenticated,
    user
  };
};

export default connect(mapStateToProps)(withRouter(injectIntl(Profile)));
