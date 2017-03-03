import React, {Component} from 'react';
import {Link} from 'react-router';
import {
  Button, Container, Grid, Header, Image, Label, Segment
} from 'semantic-ui-react';
import {intlShape, injectIntl, FormattedMessage} from 'react-intl';
import {convertFromHTML} from 'draft-convert';
import {BASE_URL} from '../../constants/constants';

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

    // This is horrifying, but I tried for half a day to get it to work using
    // better methods...
    let description = convertFromHTML(unescape(item.description).replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&#x2F;/, '/')).getPlainText();

    if (description.length >= 250) {
      description = `${description.substring(0, 250)}...`;
    }

    return (
      <Segment style={isAlternate % 2 === 0 ? styles.itemSegment : styles.altItemSegment} vertical>
        <Container>
          <Grid stackable>
            <Grid.Row verticalAlign="middle">
              <Grid.Column width={4}>
                <Image src={BASE_URL + item.photos[0]} shape="rounded" bordered fluid/>
              </Grid.Column>
              <Grid.Column width={12}>
                <Grid stackable>
                  <Grid.Row verticalAlign="middle">
                    <Grid.Column width={10}>
                      <Header as="h1">
                        {item.title}
                        <Header.Subheader>
                          <FormattedMessage
                            id="item.subheader"
                            values={{
                              price: item.price,
                              costPeriod: formatMessage({id: item.costPeriod}),
                              ownerFirstName: item.ownerFirstName,
                              ownerLastName: item.ownerLastName,
                              location: item.city
                            }}
                            />
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
                        {description}
                      </p>
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row>
                    <Grid.Column>
                      <Label.Group size="large">
                        {item.category.map((category, i) => {
                          return (
                            <Label key={i} basic>
                              {formatMessage({id: category})}
                            </Label>
                          );
                        })}
                      </Label.Group>
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
