import React, {Component} from 'react';
import {GOOGLE_MAPS_MARKER_URL} from '../../constants/constants';

const styles = {
  marker: {
    width: '25px',
    height: '40.5px',
    position: 'absolute',
    left: '-12.5px',
    top: '-40.5px'
  }
};

export class Marker extends Component {
  render() {
    return (
      <div>
        <img src={GOOGLE_MAPS_MARKER_URL} className="maps-marker" style={styles.marker}/>
      </div>
    );
  }
}
