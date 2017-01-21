import React, {Component} from 'react';
import {Dimmer, Loader, Segment} from 'semantic-ui-react';

const styles = {
  segment: {
    height: "100%"
  }
};

export class Loading extends Component {
  render() {
    return (
      <Segment style={styles.segment} basic>
        <Dimmer inverted active>
          <Loader size="massive"/>
        </Dimmer>
      </Segment>
    );
  }
}
