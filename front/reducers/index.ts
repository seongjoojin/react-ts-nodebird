import { AnyAction, combineReducers } from 'redux';
import { HYDRATE } from 'next-redux-wrapper';

import user from './user';
import post from './post';


const rootReducer = combineReducers({
  index: (state: any = {}, action: AnyAction) => {
    switch (action.type) {
      case HYDRATE:
        return { ...state, ...action.payload };
      default:
        return state;
    }
  },
  user,
  post,
});


export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;