import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link, withRouter} from 'react-router';
import {
  Container, Grid, Menu, Segment
} from 'semantic-ui-react';
import {intlShape, injectIntl, FormattedMessage} from 'react-intl';
import NavBar from '../General/NavBar';
import PageHeaderSegment from '../General/PageHeaderSegment';
import PersonalInfo from './PersonalInfo';
import MyItems from './MyItems';
import UploadItem from './UploadItem';
import Messages from './Messages/Messages';

const styles = {
  wrapper: {
    height: '100%'
  }
};

const tabs = [
  'info',
  'messages',
  'billing',
  'schedule',
  'add-item',
  'my-items'
];

class Profile extends Component {
  componentWillMount() {
    const {router, params} = this.props;
    const {activeTab} = params;

    if (!activeTab || !tabs.includes(activeTab)) {
      router.replace('/profile/info');
    }
  }
  render() {
    const {intl, user, params, isFetching} = this.props;
    const {formatMessage} = intl;
    const {firstName, lastName} = user;
    const {activeTab} = params;

    const breadcrumbs = [{
      text: formatMessage({id: 'breadcrumb.home'}),
      to: '/'
    }, {
      text: formatMessage({id: 'profile.title'}, {firstName: unescape(firstName), lastName: unescape(lastName)})
    }];

    return (
      <div style={styles.wrapper}>
        <NavBar/>
        <PageHeaderSegment
          breadcrumbs={breadcrumbs}
          title={formatMessage({id: 'profile.title'}, {firstName: unescape(firstName), lastName: unescape(lastName)})}
          colour="blue"
          />
        <Segment className="vertical-segment" vertical>
          <Container>
            <Grid stackable>
              <Grid.Row>
                <Grid.Column width={4}>
                  <Menu size={'huge'} fluid vertical tabular>
                    <Menu.Item as={Link} to="/profile/info" name="info" active={activeTab === 'info'}>
                      <FormattedMessage id="profile.info"/>
                    </Menu.Item>
                    <Menu.Item as={Link} to="/profile/messages" name="messages" active={activeTab === 'messages'}>
                      <FormattedMessage id="profile.messages"/>
                    </Menu.Item>
                    <Menu.Item as={Link} to="/profile/billing" name="billing" active={activeTab === 'billing'}>
                      <FormattedMessage id="profile.billing"/>
                    </Menu.Item>
                    <Menu.Item as={Link} to="/profile/schedule" name="schedule" active={activeTab === 'schedule'}>
                      <FormattedMessage id="profile.schedule"/>
                    </Menu.Item>
                    <Menu.Item as={Link} to="/profile/my-items" name="my-items" active={activeTab === 'my-items'}>
                      <FormattedMessage id="profile.myItems"/>
                    </Menu.Item>
                    <Menu.Item as={Link} to="/profile/add-item" name="add-item" active={activeTab === 'add-item'}>
                      <FormattedMessage id="profile.addItem"/>
                    </Menu.Item>
                  </Menu>
                </Grid.Column>
                <Grid.Column className="content-column" width={12}>
                  <Segment className="content-segment" loading={isFetching}>
                    {activeTab === 'info' &&
                      <PersonalInfo {...this.props}/>
                    }
                    {activeTab === 'my-items' &&
                      <MyItems {...this.props}/>
                    }
                    {activeTab === 'messages' &&
                      <Messages {...this.props}/>
                    }
                    {activeTab === 'add-item' &&
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
  isFetching: React.PropTypes.bool.isRequired,
  user: React.PropTypes.object,
  router: React.PropTypes.object,
  dispatch: React.PropTypes.func.isRequired,
  params: React.PropTypes.object
};

const mapStateToProps = state => {
  const {reducers} = state;
  const {isAuthenticated, isFetching, user} = reducers;

  return {
    isAuthenticated,
    isFetching,
    user
  };
};

export default connect(mapStateToProps)(withRouter(injectIntl(Profile)));
