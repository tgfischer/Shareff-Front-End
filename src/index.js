import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, browserHistory} from 'react-router';
import {createStore, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {Provider} from 'react-redux';

import {Home} from './app/components/home/home';
import Login from './app/components/login/login';
import SignUp from './app/components/signup/signup';
import reducers from './app/reducers/reducers';
import api from './app/middleware/api';

import './index.scss';

const createStoreWithMiddleware = applyMiddleware(thunkMiddleware, api)(createStore);
const store = createStoreWithMiddleware(reducers);

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={Home}/>
      <Route path="/login" component={Login}/>
      <Route path="/signup" component={SignUp}/>
    </Router>
  </Provider>,
  document.getElementById('root')
);
