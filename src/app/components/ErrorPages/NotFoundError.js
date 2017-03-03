import React, {Component} from 'react';
import {connect} from 'react-redux';
import {intlShape, injectIntl} from 'react-intl';
import ErrorPage from './ErrorPage';

class NotFoundError extends Component {
  render() {
    const {formatMessage} = this.props.intl;

    return (
      <ErrorPage
        title={formatMessage({id: 'error.error'})}
        message={formatMessage({id: 'error.notFound'})}
        />
    );
  }
}

NotFoundError.propTypes = {
  intl: intlShape.isRequired
};

export default connect()(injectIntl(NotFoundError));
