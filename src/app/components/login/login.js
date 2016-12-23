import React, {Component} from 'react';
import {NavBar} from '../navbar';

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100%'
  },
  main: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column'
  }
};

export class Login extends Component {
  render() {
    return (
      <div style={styles.container}>
        <NavBar/>
      </div>
    );
  }
}
