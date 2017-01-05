import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, browserHistory} from 'react-router';

import {Home} from './app/components/home/home';
import {Login} from './app/components/login/login';
import {SignUp} from './app/components/signup/signup';
import {Payment} from './app/components/payment/payment';

import './index.scss';

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={Home}/>
    <Route path="/login" component={Login}/>
    <Route path="/signup" component={SignUp}/>
    <Route path="/payment" component={Payment}/>
  </Router>,
  document.getElementById('root')
);
