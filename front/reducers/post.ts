// const LOG_IN = 'LOG_IN' as const;

import { AnyAction } from "redux";

interface PostState {
  mainPosts: string[];
}

const initialState: PostState = {
  mainPosts: [],
};

// type PostAction = ;

const reducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default reducer;
