import { createWrapper, MakeStore } from 'next-redux-wrapper';
import { createStore } from 'redux';

const configureStore: MakeStore = () => {
  const stroe = createStore(reducer);
  return stroe;
}

const wrapper = createWrapper(configureStore, {
  debug: process.env.NODE_ENV === 'development',
});

export default wrapper;