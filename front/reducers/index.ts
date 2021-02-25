import { AnyAction } from "redux";

export interface RootState {
  user: {
    isLoggedIn: boolean;
    user: object | null;
    signUpData: object;
    loginData: object;
  };
  post: {
    mainPosts: string[]
  };
}

const initialState = {
  user: {
    isLoggedIn: false,
    user: null,
    signUpData: {},
    loginData: {}
  },
  post: {
    mainPosts: [],
  }
}

export const loginAction = (data: { id: string; password: string }) => ({
  type: 'LOG_IN',
  data,
});

export const logoutAction = () => ({
  type: 'LOG_OUT',
});

const rootReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case 'LOG_IN':
      return {
        ...state,
        user: {
          ...state.user,
          isLoggedIn: true,
          user: action.data,
        },
      };
    case 'LOG_OUT':
      return {
        ...state,
        user: {
          ...state.user,
          isLoggedIn: false,
          user: null
        },
      };
    default:
      return state;
  }
};

export default rootReducer;