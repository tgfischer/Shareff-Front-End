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
          {this.props.isAuthenticated ?
            <Component {...this.props}/> :
            null}
        </div>
      );
    }
  }

  AuthenticatedComponent.propTypes = {
    isAuthenticated: React.PropTypes.bool,
    router: React.PropTypes.object
  };

  const mapStateToProps = state => {
    return {
      token: state.auth.token,
      user: state.auth.user,
      isAuthenticated: state.auth.isAuthenticated
    };
  };

  return connect(mapStateToProps)(AuthenticatedComponent);
}
