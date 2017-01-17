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
      if (!this.props.isAuthenticated && required) {
        this.props.router.push('/login');
      } else if (this.props.isAuthenticated && !required) {
        const token = localStorage.getItem('token');

        this.props.dispatch(getUser(token)).then(() => {
          this.props.router.push('/');
        });
      }
    }
    render() {
      return (
        <div style={styles.container}>
          {!this.props.isAuthenticated && !required || this.props.isAuthenticated && required ?
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

    if (user || !required) {
      return {
        isAuthenticated,
        user
      };
    }
  };

  return connect(mapStateToProps)(AuthenticatedComponent);
}
