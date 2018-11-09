import React from 'react';
import ReactDOM from 'react-dom';
import FastClick from 'fastclick';
// import './styles/index.scss';
import App from './App';
// import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import { init } from '@rematch/core';
import * as models from './store';

import 'src/utils/flexible';

// 初始化 fastclick. 根据情况，需要的话就使用
FastClick.attach(document.body);

const store = init({
  models,
});

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
// serviceWorker.unregister();
