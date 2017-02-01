import React, {Component} from 'react';
import {Link} from 'react-router';
import {
  Button, Container, Grid, Header, Image, Segment
} from 'semantic-ui-react';
import {intlShape, injectIntl, FormattedMessage} from 'react-intl';
import {PHOTO_PLACEHOLDER_URL} from '../../constants/constants';

const styles = {
  itemSegment: {
    padding: '2em 0'
  },
  altItemSegment: {
    padding: '2em 0',
    backgroundColor: '#F9F9F9'
  },
  paragraph: {
    fontSize: '1.5em'
  }
};

class Item extends Component {
  render() {
    const {intl, item, isAlternate, search} = this.props;
    const {formatMessage} = intl;

    return (
      <Segment style={isAlternate % 2 === 0 ? styles.itemSegment : styles.altItemSegment} vertical>
        <Container>
          <Grid stackable>
            <Grid.Row>
              <Grid.Column width={4}>
                <Image src={PHOTO_PLACEHOLDER_URL} shape="rounded" bordered fluid/>
              </Grid.Column>
              <Grid.Column width={12}>
                <Grid stackable>
                  <Grid.Row verticalAlign="middle">
                    <Grid.Column width={10}>
                      <Header as="h1">
                        {item.title}
                        <Header.Subheader>
                          <FormattedMessage id="item.subheader" values={{price: item.price, costPeriod: item.costPeriod, location: item.city}}/>
                        </Header.Subheader>
                      </Header>
                    </Grid.Column>
                    <Grid.Column width={6}>
                      <Button
                        as={Link}
                        to={{
                          pathname: `/listings/${item.itemId}`,
                          query: search
                        }}
                        content={formatMessage({id: 'item.viewItemButton'})}
                        floated="right"
                        labelPosition="right"
                        icon="right arrow"
                        size="huge"
                        color="blue"
                        />
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row>
                    <Grid.Column>
                      <p style={styles.paragraph}>
                        {item.description}
                        {item.description.length === 250 &&
                          <span>...</span>
                        }
                      </p>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      </Segment>
    );
  }
}

Item.propTypes = {
  intl: intlShape.isRequired,
  item: React.PropTypes.object.isRequired,
  isAlternate: React.PropTypes.bool.isRequired,
  search: React.PropTypes.object.isRequired
};

export default injectIntl(Item);
