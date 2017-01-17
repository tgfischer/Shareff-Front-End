import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk';
import {Router, Route, browserHistory} from 'react-router';
import {combineReducers, createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import {routerReducer, syncHistoryWithStore} from 'react-router-redux';
import {IntlProvider, intlReducer} from 'react-intl-redux';
import {addLocaleData} from 'react-intl';
import en from 'react-intl/locale-data/en';

import {Home} from './app/components/Home/Home';
import Login from './app/components/Login/Login';
import SignUp from './app/components/Signup/Signup';
import {requireAuthentication} from './app/components/General/AuthenticatedComponent';
import {auth} from './app/reducers/reducers';
import {i18n} from './app/i18n/i18n';

import './index.scss';

addLocaleData([
  ...en
]);

// Create the store from the reducers
const store = createStore(combineReducers({
  auth,
  routing: routerReducer,
  intl: intlReducer
}), i18n, applyMiddleware(thunk));

// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
  <Provider store={store}>
    <IntlProvider>
      <Router history={history}>
        <Route path="/" component={Home}/>
        <Route path="/login" component={requireAuthentication(Login, false)}/>
        <Route path="/signup" component={requireAuthentication(SignUp, false)}/>
      </Router>
    </IntlProvider>
  </Provider>,
  document.getElementById('root')
);
