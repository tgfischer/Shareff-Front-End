import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link, withRouter} from 'react-router';
import {Container, Button, Menu} from 'semantic-ui-react';
import {logOut} from '../actions/auth';

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
          <Menu.Item className="bold" header>Shareff</Menu.Item>
          <Menu.Menu position="right">
            <Menu.Item as={Link} to="/" activeClassName="active">
              Home
            </Menu.Item>
            <Menu.Item as={Link} to="/listings" activeClassName="active">
              Rental Listings
            </Menu.Item>
            {!this.props.isAuthenticated &&
              <Menu.Item>
                <Button basic as={Link} to="/login">Log In</Button>
              </Menu.Item>
            }
            {!this.props.isAuthenticated &&
              <Menu.Item>
                <Button color="blue" as={Link} to="/signup">Sign Up</Button>
              </Menu.Item>
            }
            {this.props.isAuthenticated &&
              <Menu.Item>
                <Button basic onClick={this.handleLogOut}>Log Out</Button>
              </Menu.Item>
            }
          </Menu.Menu>
        </Container>
      </Menu>
    );
  }
}

NavBar.propTypes = {
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

export default connect(mapStateToProps)(withRouter(NavBar));
