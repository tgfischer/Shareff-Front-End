import React, {Component} from 'react';
import {Button, Card, Image, Modal} from 'semantic-ui-react';

export class Thumbnail extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);

    this.state = {
      openModal: false
    };
  }
  handleClick() {
    this.setState({openModal: true});
  }
  handleCloseModal() {
    this.setState({openModal: false});
  }
  render() {
    const {src, height} = this.props;
    const styles = {
      thumbnail: {
        height: `${height}px`,
        background: `url('${src}') no-repeat`
      },
      image: {
        maxHeight: '75vh',
        margin: '0 auto'
      }
    };

    return (
      <Modal
        trigger={
          <Card onClick={this.handleClick}>
            <div className="ui thumbnail image" style={styles.thumbnail}/>
          </Card>
        }
        closeIcon={<Button icon="remove" floated="right" inverted circular/>}
        basic
        >
        <Modal.Content>
          <Image src={src.replace('_thumbnail', '')} style={styles.image} shape="rounded"/>
        </Modal.Content>
      </Modal>
    );
  }
}

Thumbnail.propTypes = {
  src: React.PropTypes.string.isRequired,
  height: React.PropTypes.number.isRequired
};
