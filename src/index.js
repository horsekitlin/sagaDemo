import React from 'react';
import ReactDOM from 'react-dom';
import Main from './containers/MainContainer';
import configureStore from './store/configureStore';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <Main />
  </Provider>, document.getElementById('root'));
registerServiceWorker();
