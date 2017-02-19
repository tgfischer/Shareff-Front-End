import React, {Component} from 'react';
import {Link} from 'react-router';
import {intlShape, injectIntl} from 'react-intl';
import {
  Breadcrumb, Button, Container, Grid, Header, Segment
} from 'semantic-ui-react';

const styles = {
  breadcrumbWrapper: {
    display: 'inline-block'
  }
};

class PageHeaderSegment extends Component {
  render() {
    const {title, subTitle, colour, action, breadcrumbs} = this.props;

    return (
      <Segment className="page-header" color={colour} inverted vertical>
        <Container>
          <Grid stackable>
            <Grid.Row>
              <Grid.Column>
                <Breadcrumb>
                  {breadcrumbs.map((breadcrumb, i) => {
                    const {text, to} = breadcrumb;
                    const isLast = i === breadcrumbs.length - 1;

                    return (
                      <div style={styles.breadcrumbWrapper} key={i}>
                        {!isLast &&
                          <div style={styles.breadcrumbWrapper}>
                            <Breadcrumb.Section as={Link} to={to}>
                              {text}
                            </Breadcrumb.Section>
                            <Breadcrumb.Divider icon="right angle"/>
                          </div>
                        }
                        {isLast &&
                          <Breadcrumb.Section active>
                            {text}
                          </Breadcrumb.Section>
                        }
                      </div>
                    );
                  })}
                </Breadcrumb>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row verticalAlign="middle">
              <Grid.Column width={10}>
                <Header as="h1" size="huge" className="bold" inverted>
                  {title}
                  {subTitle &&
                    <Header.Subheader>
                      {subTitle}
                    </Header.Subheader>
                  }
                </Header>
              </Grid.Column>
              {action &&
                <Grid.Column width={6} floated="right">
                  <Button onClick={action.handleButtonClick} color={action.buttonColour} inverted={action.isButtonInverted} size="big" floated="right">
                    {action.buttonText}
                  </Button>
                </Grid.Column>
              }
            </Grid.Row>
          </Grid>
        </Container>
      </Segment>
    );
  }
}

PageHeaderSegment.propTypes = {
  intl: intlShape.isRequired,
  colour: React.PropTypes.string.isRequired,
  breadcrumbs: React.PropTypes.array.isRequired,
  title: React.PropTypes.string.isRequired,
  subTitle: React.PropTypes.node,
  action: React.PropTypes.object
};

export default injectIntl(PageHeaderSegment);
