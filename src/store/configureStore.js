import {createStore, applyMiddleware, compose} from 'redux';
import thunkMiddleware from 'redux-thunk';
import promiseMiddleware from '../middleware/promiseMiddleware';
import rootReducer from '../reducers/index';

const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    
const log = () => next => action => {
  console.log('log', action);
  next(action);
}

export default function configureStore(initialState) {
  const store = createStore(
    rootReducer,
    // composeEnhancers(applyMiddleware((promiseMiddleware), log))
    composeEnhancers(applyMiddleware(thunkMiddleware, log))
  );
  return store;
}
