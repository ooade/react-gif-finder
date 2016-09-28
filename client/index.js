import React from 'react';

import { render } from 'react-dom';

// Import Components
import App from './components/App';
import Index from './components/Index';

import './index.css';

// import react router deps
import { Router, Route, IndexRoute } from 'react-router';
import { Provider } from 'react-redux';
import store, { history } from './store';

const router = (
  <Provider store={store}>
    <Router history={history}>
      <Route path='/' component={App}>
        <IndexRoute component={Index}></IndexRoute>
        {/* <Route path='/view/:postId' component={Single}></Route> */}
      </Route>
    </Router>
  </Provider>
)

render(router, document.getElementById('root'));
