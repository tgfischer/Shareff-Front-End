import React, {Component} from 'react';
import Masthead from './Masthead';
import CoreLayout from '../../layouts/CoreLayout';

export class Home extends Component {
  render() {
    return (
      <CoreLayout>
        <Masthead/>
      </CoreLayout>
    );
  }
}
