import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link, withRouter} from 'react-router';
import {
  Breadcrumb, Container, Grid, Header, Menu, Segment
} from 'semantic-ui-react';
import {intlShape, injectIntl, FormattedMessage} from 'react-intl';
import NavBar from '../General/NavBar';
import PersonalInfo from './PersonalInfo';

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
      <div>
        <NavBar/>
        <Segment vertical>
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

                  <Header as="h1" size="huge" className="bold">
                    <FormattedMessage id="profile.title" values={{firstName, lastName}}/>
                  </Header>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Container>
        </Segment>
        <Segment vertical stacked>
          <Container>
            <Grid celled="internally">
              <Grid.Row>
                <Grid.Column width={4}>
                  <Menu fluid vertical tabular>
                    <Menu.Item name="personalInfo" active={activeTab === 'personalInfo'} onClick={this.handleTabClick}/>
                    <Menu.Item name="rentSchedule" active={activeTab === 'rentSchedule'} onClick={this.handleTabClick}/>
                  </Menu>
                </Grid.Column>
                <Grid.Column width={12} stretched>
                  <Segment>
                    {activeTab === 'personalInfo' &&
                      <PersonalInfo {...this.props}/>
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
  const {auth} = state;
  const {isAuthenticated, user} = auth;

  return {
    isAuthenticated,
    user
  };
};

export default connect(mapStateToProps)(withRouter(injectIntl(Profile)));
