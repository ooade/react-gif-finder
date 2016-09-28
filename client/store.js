import { createStore, compose, applyMiddleware } from 'redux';
import { syncHistoryWithStore} from 'react-router-redux';
import { browserHistory } from 'react-router';
import reduxThunk from 'redux-thunk';

// import the root reducer
import rootReducer from './reducers/index';

const enhancers = compose (
  window.devToolsExtension ? window.devToolsExtension() : f => f
)

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);

const store = createStoreWithMiddleware(rootReducer, enhancers);

export const history = syncHistoryWithStore(browserHistory, store);

if (module.hot) {
  module.hot.accept('./reducers/', () => {
    const nextRootReducer = require('./reducers/index').default;
    store.replaceReducer(nextRootReducer);
  });
}

export default store;
