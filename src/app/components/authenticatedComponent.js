import React from 'react';
import {connect} from 'react-redux';

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
        this.props.router.push('/');
      }
    }
    render() {
      return (
        <div>
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
    router: React.PropTypes.object
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
