import { createWrapper, MakeStore } from 'next-redux-wrapper';
import { applyMiddleware, compose, createStore, Middleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import reducer from 'reducers';

const configureStore: MakeStore = () => {
  const middleware: Middleware[] = [];
  const enhancer =
    process.env.NODE_ENV === 'production'
      ? compose(applyMiddleware(...middleware))
      : composeWithDevTools(applyMiddleware(...middleware));
  const stroe = createStore(reducer, enhancer);
  return stroe;
};

const wrapper = createWrapper(configureStore, {
  debug: process.env.NODE_ENV === 'development',
});

export default wrapper;