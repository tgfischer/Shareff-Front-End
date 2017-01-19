import React from 'react';
import {connect} from 'react-redux';
import {getUser} from '../../actions/auth';

const styles = {
  container: {
    height: '100%'
  }
};

export function requireAuthentication(Component, required) {
  class AuthenticatedComponent extends React.Component {
    componentWillMount() {
      this.checkAuth(required);
    }
    componentWillReceiveProps() {
      this.checkAuth(required);
    }
    checkAuth(required) {
      const {isAuthenticated, dispatch, router, user} = this.props;

      // If the user is not logged in, but they need to
      if (!isAuthenticated && required) {
        // Redirect them to the login page
        router.push('/login');
      } else if (isAuthenticated) {
        // Else if the user is authenticated
        const token = localStorage.getItem('token');

        // If the user object exists, but logged in users cannot see this page
        if (user && !required) {
          // Redirect them to the home page
          router.push('/');
        } else {
          // If the user object doesn't exist (e.g. closed/reopened window),
          // fetch it again
          dispatch(getUser(token)).then(() => {
            // If logged in users cannot see this page
            if (!required) {
              // Redirect them to the homepage
              router.push('/');
            }
          });
        }
      }
    }
    render() {
      const {isAuthenticated, user} = this.props;

      return (
        <div style={styles.container}>
          {!isAuthenticated && !required || isAuthenticated && user && required ?
            <Component {...this.props}/> :
            null}
        </div>
      );
    }
  }

  AuthenticatedComponent.propTypes = {
    isAuthenticated: React.PropTypes.bool,
    user: React.PropTypes.object,
    router: React.PropTypes.object,
    dispatch: React.PropTypes.func.isRequired
  };

  const mapStateToProps = state => {
    const {auth} = state;
    const {isAuthenticated, user} = auth;

    return {
      isAuthenticated,
      user
    };
  };

  return connect(mapStateToProps)(AuthenticatedComponent);
}
