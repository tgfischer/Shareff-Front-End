import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk';
import {Router, Route, browserHistory} from 'react-router';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import {syncHistoryWithStore} from 'react-router-redux';

import {Home} from './app/components/home/home';
import Login from './app/components/login/login';
import SignUp from './app/components/signup/signup';
import {requireAuthentication} from './app/components/authenticatedComponent';
import reducers from './app/reducers/reducers';

import './index.scss';

// Create the store from the reducers
const store = createStore(reducers, applyMiddleware(thunk));

// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={Home}/>
      <Route path="/login" component={requireAuthentication(Login, false)}/>
      <Route path="/signup" component={requireAuthentication(SignUp, false)}/>
    </Router>
  </Provider>,
  document.getElementById('root')
);
