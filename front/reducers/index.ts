import { AnyAction, combineReducers } from 'redux';
import { HYDRATE } from 'next-redux-wrapper';

import user, { UserState } from './user';
import post, { PostState } from './post';

export type State = {
  user: UserState;
  post: PostState;
};

const rootReducer = (state: State | undefined, action: AnyAction):State => {
  switch (action.type) {
    case HYDRATE:
      console.log('HYDRATE', state, action);
      return { ...state, ...action.payload };
    default: {
      const combineReducer = combineReducers({
        user,
        post,
      });
      return combineReducer(state, action);
    }
  }
};

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
