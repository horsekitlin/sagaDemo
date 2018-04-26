import {createStore, applyMiddleware, compose} from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from '../reducers/index';
const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function configureStore(initialState) {
    const store = createStore(
      rootReducer,
      composeEnhancers(applyMiddleware(thunkMiddleware))
    );
    return store;
}