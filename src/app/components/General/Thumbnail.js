import React, {Component} from 'react';
import {Card} from 'semantic-ui-react';

export class Thumbnail extends Component {
  render() {
    const {src, height} = this.props;
    const styles = {
      thumbnail: {
        height: `${height}px`,
        background: `url('${src}') no-repeat`
      }
    };

    return (
      <Card>
        <div className="ui thumbnail image" style={styles.thumbnail}/>
      </Card>
    );
  }
}

Thumbnail.propTypes = {
  src: React.PropTypes.string.isRequired,
  height: React.PropTypes.number.isRequired
};
