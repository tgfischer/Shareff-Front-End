import React, {Component} from 'react';
import {Masthead} from './masthead';
import NavBar from '../navbar';

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

export class Home extends Component {
  render() {
    return (
      <div style={styles.container}>
        <NavBar/>
        <Masthead/>
      </div>
    );
  }
}
