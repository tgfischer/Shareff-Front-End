import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {Container, Grid, Header, Icon} from 'semantic-ui-react';
import {intlShape, injectIntl} from 'react-intl';
import NavBar from '../General/NavBar';

const styles = {
  container: {
    height: 'calc(100% - 2.85714286em)'
  },
  grid: {
    minHeight: '100%'
  },
  column: {
    fontSize: '32px'
  },
  subHeader: {
    fontSize: '0.5em'
  }
};

class ErrorPage extends Component {
  render() {
    const {title, message} = this.props;

    return (
      <div style={styles.container}>
        <NavBar/>
        <Container style={styles.container}>
          <Grid verticalAlign="middle" style={styles.grid} stackable>
            <Grid.Column width={2}/>
            <Grid.Column width={12} style={styles.column}>
              <Header as="h1" size="huge">
                <Icon name="remove"/>
                <Header.Content>
                  {title}
                  <Header.Subheader style={styles.subHeader}>
                    {message}
                  </Header.Subheader>
                </Header.Content>
              </Header>
            </Grid.Column>
          </Grid>
        </Container>
      </div>
    );
  }
}

ErrorPage.propTypes = {
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  intl: intlShape.isRequired
};

export default connect()(injectIntl(ErrorPage));
