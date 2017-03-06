import React, {Component} from 'react';
import {Button, Card, Image, Modal} from 'semantic-ui-react';

export class Thumbnail extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.handleDeleteButton = this.handleDeleteButton.bind(this);

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
  handleDeleteButton(e) {
    e.preventDefault();
    const {onRemovePhotoRequest, photoUrl} = this.props;
    if (onRemovePhotoRequest && photoUrl) {
      onRemovePhotoRequest(photoUrl);
    }
  }
  render() {
    const {src, height, removeEnable} = this.props;
    const {openModal} = this.state;
    const styles = {
      card: {
        margin: '0.5em'
      },
      thumbnail: {
        height: `${height}px`,
        background: `url('${src}') no-repeat`
      },
      image: {
        maxHeight: '75vh',
        margin: '0 auto'
      },
      center: {
        textAlign: 'center'
      }
    };

    return (
      <div>
        <Card style={styles.card}>
          <Card.Content className="ui thumbnail image" onClick={this.handleClick} style={styles.thumbnail}/>
          {removeEnable &&
            <Card.Content style={styles.center}>
              <Button basic content="Remove Image" icon="trash" labelPosition="left" onClick={this.handleDeleteButton}/>
            </Card.Content>
          }
        </Card>
        <Modal
          className="rent-request-modal"
          dimmer="blurring"
          open={openModal}
          onClose={this.handleCloseModal}
          closeIcon={<Button icon="remove" floated="right" inverted circular/>}
          basic
          >
          <Modal.Content>
            <Image src={src.replace('_thumbnail', '')} style={styles.image} shape="rounded"/>
          </Modal.Content>
        </Modal>
      </div>
    );
  }
}

Thumbnail.propTypes = {
  src: React.PropTypes.string.isRequired,
  height: React.PropTypes.number.isRequired,
  removeEnable: React.PropTypes.string,
  photoUrl: React.PropTypes.string,
  onRemovePhotoRequest: React.PropTypes.func
};
