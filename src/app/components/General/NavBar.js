import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link, withRouter} from 'react-router';
import {Container, Button, Menu} from 'semantic-ui-react';
import {intlShape, injectIntl, FormattedMessage} from 'react-intl';
import {logOut} from '../../actions/auth';

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.handleLogOut = this.handleLogOut.bind(this);
  }
  handleLogOut() {
    this.props.dispatch(logOut());
    this.props.router.push('/login');
  }
  render() {
    return (
      <Menu size="huge" className="no-shadow">
        <Container>
          <Menu.Item className="bold" header>
            <FormattedMessage id="navBar.title"/>
          </Menu.Item>
          <Menu.Menu position="right">
            <Menu.Item as={Link} to="/" activeClassName="active">
              <FormattedMessage id="navBar.home"/>
            </Menu.Item>
            <Menu.Item as={Link} to="/listings" activeClassName="active">
              <FormattedMessage id="navBar.rentalListings"/>
            </Menu.Item>
            {!this.props.isAuthenticated &&
              <Menu.Item>
                <Button basic as={Link} to="/login">
                  <FormattedMessage id="navBar.login"/>
                </Button>
              </Menu.Item>
            }
            {!this.props.isAuthenticated &&
              <Menu.Item>
                <Button color="blue" as={Link} to="/signup">
                  <FormattedMessage id="navBar.signUp"/>
                </Button>
              </Menu.Item>
            }
            {this.props.isAuthenticated &&
              <Menu.Item as={Link} to="/profile" activeClassName="active">
                <FormattedMessage id="navBar.profile"/>
              </Menu.Item>
            }
            {this.props.isAuthenticated &&
              <Menu.Item>
                <Button basic onClick={this.handleLogOut}>
                  <FormattedMessage id="navBar.logOut"/>
                </Button>
              </Menu.Item>
            }
          </Menu.Menu>
        </Container>
      </Menu>
    );
  }
}

NavBar.propTypes = {
  intl: intlShape.isRequired,
  isAuthenticated: React.PropTypes.bool,
  user: React.PropTypes.object,
  router: React.PropTypes.object,
  dispatch: React.PropTypes.func.isRequired
};

const mapStateToProps = state => {
  const {auth} = state;
  const {isAuthenticated, isFetching, user, err} = auth;

  return {
    isAuthenticated,
    isFetching,
    user,
    err
  };
};

export default connect(mapStateToProps)(withRouter(injectIntl(NavBar)));
