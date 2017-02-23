import React from 'react';
import ReactDOM from 'react-dom';
import Task from './containers/Task';
import '../styles/index.sass';
import store from './store'
import { Provider } from 'react-redux'
import{ Router, Route, browserHistory, IndexRedirect } from 'react-router'


console.log(store.getState())


ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route component={Task} path="/">
      </Route>
    </Router>
  </Provider>,
  document.getElementById('main'))
