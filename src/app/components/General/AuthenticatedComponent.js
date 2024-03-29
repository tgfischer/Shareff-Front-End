import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {getUser} from '../../actions/auth';
import {Loading} from './Loading';

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

        // If the user object doesn't exist (e.g. closed/reopened window), fetch it again
        if (!user) {
          dispatch(getUser(token)).then(() => {
            // If logged in users cannot see this page
            if (!required) {
              // Redirect them to the homepage
              router.push('/');
            }
          });
        } else if (!required) {
          // Redirect them to the home page
          router.push('/');
        }
      }
    }
    render() {
      const {isAuthenticated, user} = this.props;

      return (
        <div style={styles.container}>
          {!isAuthenticated && !required || isAuthenticated && user && required ?
            <Component {...this.props}/> :
            <Loading/>
          }
        </div>
      );
    }
  }

  AuthenticatedComponent.propTypes = {
    isAuthenticated: React.PropTypes.bool.isRequired,
    isFetching: React.PropTypes.bool.isRequired,
    user: React.PropTypes.object,
    router: React.PropTypes.object.isRequired,
    dispatch: React.PropTypes.func.isRequired
  };

  const mapStateToProps = state => {
    const {reducers} = state;
    const {isAuthenticated, isFetching, user} = reducers;

    return {
      isAuthenticated,
      isFetching,
      user
    };
  };

  return connect(mapStateToProps)(withRouter(AuthenticatedComponent));
}
