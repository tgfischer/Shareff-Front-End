import React, {Component} from 'react';
import {Container, Button, Menu} from 'semantic-ui-react';

export class NavBar extends Component {
  state = {
    activeItem: "home"
  }
  handleItemClick = (e, {name}) => this.setState({activeItem: name})
  render() {
    const {activeItem} = this.state;

    return (
      <Menu size="huge" className="no-shadow">
        <Container>
          <Menu.Item className="bold" header>Shareff</Menu.Item>
          <Menu.Menu position="right">
            <Menu.Item name="home" active={activeItem === "home"} onClick={this.handleItemClick}>
              Home
            </Menu.Item>
            <Menu.Item name="listings" active={activeItem === "listings"} onClick={this.handleItemClick}>
              Rental Listings
            </Menu.Item>
            <Menu.Item>
              <Button basic>Log In</Button>
            </Menu.Item>
            <Menu.Item>
              <Button color="blue">Sign Up</Button>
            </Menu.Item>
          </Menu.Menu>
        </Container>
      </Menu>
    );
  }
}
