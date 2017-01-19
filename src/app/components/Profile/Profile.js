import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {
  Container, Grid
} from 'semantic-ui-react';
import {intlShape, injectIntl} from 'react-intl';
import NavBar from '../General/NavBar';

class Profile extends Component {
  render() {
    const {user} = this.props;

    return (
      <div>
        <NavBar/>
        <Container>
          <Grid>
            <Grid.Row>
              <Grid.Column>
                {user.firstName}&nbsp;{user.lastName}
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      </div>
    );
  }
}

Profile.propTypes = {
  intl: intlShape.isRequired,
  isAuthenticated: React.PropTypes.bool,
  user: React.PropTypes.object,
  router: React.PropTypes.object,
  dispatch: React.PropTypes.func.isRequired
};

const mapStateToProps = state => {
  const {auth} = state;
  const {isAuthenticated, user, err} = auth;

  return {
    isAuthenticated,
    user,
    err
  };
};

export default connect(mapStateToProps)(withRouter(injectIntl(Profile)));
