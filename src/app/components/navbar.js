import React, {Component} from 'react';
import {Link} from 'react-router';
import {Container, Button, Menu} from 'semantic-ui-react';

export class NavBar extends Component {
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
            <Menu.Item>
              <Button basic as={Link} to="/login">Log In</Button>
            </Menu.Item>
            <Menu.Item>
              <Button color="blue" as={Link} to="/signup">Sign Up</Button>
            </Menu.Item>
          </Menu.Menu>
        </Container>
      </Menu>
    );
  }
}
