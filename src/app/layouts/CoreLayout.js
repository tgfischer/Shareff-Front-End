import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {intlShape, injectIntl, FormattedMessage} from 'react-intl';
import {Sidebar, Menu, Segment} from 'semantic-ui-react';
import NavBar from '../components/General/NavBar';

const styles = {
  pusher: {
    display: 'flex',
    flexDirection: 'column'
  }
};

class CoreLayout extends Component {
  constructor(props) {
    super(props);

    this.handleSidebarOpen = this.handleSidebarOpen.bind(this);
    this.handleSidebarClose = this.handleSidebarClose.bind(this);

    this.state = {
      sidebarVisible: false
    };
  }
  handleSidebarOpen(e) {
    e.preventDefault();

    this.setState({sidebarVisible: true});
  }
  handleSidebarClose(e) {
    e.preventDefault();

    this.setState({sidebarVisible: false});
  }
  render() {
    const {children, isAuthenticated} = this.props;
    const {sidebarVisible} = this.state;

    return (
      <Sidebar.Pushable as={Segment}>
        <Sidebar as={Menu} size="huge" animation="uncover" width="thin" visible={sidebarVisible} vertical inverted>
          <Menu.Item as={Link} to="/" activeClassName="active">
            <FormattedMessage id="navBar.title"/>
          </Menu.Item>
          {!isAuthenticated &&
            <Menu.Item as={Link} to="/login" activeClassName="active">
              <FormattedMessage id="navBar.login"/>
            </Menu.Item>
          }
          {!isAuthenticated &&
            <Menu.Item as={Link} to="/signup" activeClassName="active">
              <FormattedMessage id="navBar.signUp"/>
            </Menu.Item>
          }
          {isAuthenticated &&
            <Menu.Item as={Link} to="/profile/info" activeClassName="active">
              <FormattedMessage id="navBar.profile"/>
            </Menu.Item>
          }
          {isAuthenticated &&
            <Menu.Item as={Link} to="/login" activeClassName="active">
              <FormattedMessage id="navBar.logOut"/>
            </Menu.Item>
          }
        </Sidebar>
        <Sidebar.Pusher style={styles.pusher} onClick={sidebarVisible ? this.handleSidebarClose : null} dimmed={sidebarVisible}>
          <NavBar onSidebarOpen={this.handleSidebarOpen}/>
          {children}
        </Sidebar.Pusher>
      </Sidebar.Pushable>
    );
  }
}

CoreLayout.propTypes = {
  intl: intlShape.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  isFetching: PropTypes.bool.isRequired,
  err: PropTypes.object,
  user: PropTypes.object,
  children: PropTypes.node.isRequired
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

export default connect(mapStateToProps)(injectIntl(CoreLayout));
