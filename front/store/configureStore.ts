import { createWrapper, MakeStore } from 'next-redux-wrapper';
import {applyMiddleware, compose, createStore, Middleware, Store, StoreEnhancer} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware, {Task} from 'redux-saga';

import reducer, {RootState} from 'reducers';
import rootSaga from 'sagas';

export interface SagaStore extends Store {
  sagaTask?: Task;
}

const configureStore: MakeStore<RootState> = () => {
  const sagaMiddleware = createSagaMiddleware();
  const middleware: Middleware[] = [sagaMiddleware];
  const enhancer: StoreEnhancer =
    process.env.NODE_ENV === 'production'
      ? compose(applyMiddleware(...middleware))
      : composeWithDevTools(applyMiddleware(...middleware));
  const store = createStore(reducer, enhancer);
  (store as SagaStore).sagaTask = sagaMiddleware.run(rootSaga);
  return store;
};

const wrapper = createWrapper<RootState>(configureStore, {
  debug: process.env.NODE_ENV === 'development',
});

export default wrapper;