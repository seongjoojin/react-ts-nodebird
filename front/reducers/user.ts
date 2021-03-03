import { IMainPost } from './post';

export const LOG_IN_REQUEST = 'LOG_IN_REQUEST';
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';
export const LOG_IN_FAILURE = 'LOG_IN_FAILURE';

export const LOG_OUT_REQUEST = 'LOG_OUT_REQUEST';
export const LOG_OUT_SUCCESS = 'LOG_OUT_SUCCESS';
export const LOG_OUT_FAILURE = 'LOG_OUT_FAILURE';

export const SIGN_UP_REQUEST = 'SIGN_UP_REQUEST';
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';
export const SIGN_UP_FAILURE = 'SIGN_UP_FAILURE';

export const FOLLOW_REQUEST = 'FOLLOW_REQUEST';
export const FOLLOW_SUCCESS = 'FOLLOW_SUCCESS';
export const FOLLOW_FAILURE = 'FOLLOW_FAILURE';

export const UNFOLLOW_REQUEST = 'UNFOLLOW_REQUEST';
export const UNFOLLOW_SUCCESS = 'UNFOLLOW_SUCCESS';
export const UNFOLLOW_FAILURE = 'UNFOLLOW_FAILURE';

interface IMe {
  email: string;
  password: string;
  id: number;
  nickname: string;
  Posts: IMainPost[];
  Followings: Array<{ nickname: string }>
  Followers: Array<{ nickname: string }>
}

export interface LoginRequestAction {
  type: typeof LOG_IN_REQUEST
  data: { email: string; password: string }
}

interface LoginSuccessAction {
  type: typeof LOG_IN_SUCCESS
  data: { email: string; password: string }
}

interface LoginFailureAction {
  type: typeof LOG_IN_FAILURE
  error: object
}

interface LogoutRequestAction {
  type: typeof LOG_OUT_REQUEST
}

interface LogoutSuccessAction {
  type: typeof LOG_OUT_SUCCESS
}

interface LogoutFailureAction {
  type: typeof LOG_OUT_FAILURE
  error: object
}

interface SignUpRequestAction {
  type: typeof SIGN_UP_REQUEST
  data: { email: string; password: string; nickname: string; }
}

interface SignUpSuccessAction {
  type: typeof SIGN_UP_SUCCESS
  data: { email: string; password: string; nickname: string; }
}

interface SignUpFailureAction {
  type: typeof SIGN_UP_FAILURE
  error: object
}

export type UserActionTypes =
  | LoginSuccessAction
  | LoginFailureAction
  | LoginRequestAction
  | LogoutRequestAction
  | LogoutSuccessAction
  | LogoutFailureAction
  | SignUpRequestAction
  | SignUpSuccessAction
  | SignUpFailureAction;

interface UserState {
  logInLoading: boolean; // 로그인 시도중
  logInDone: boolean;
  logInError: object | null;
  logOutLoading: boolean; // 로그아웃 시도중
  logOutDone: boolean;
  logOutError: object | null;
  signUpLoading: boolean; // 회원가입 시도중
  signUpDone: boolean;
  signUpError: object | null;
  me: IMe | null;
  signUpData: object;
  loginData: object;
}

const initialState: UserState = {
  logInLoading: false,
  logInDone: false,
  logInError: null,
  logOutLoading: false,
  logOutDone: false,
  logOutError: null,
  signUpLoading: false,
  signUpDone: false,
  signUpError: null,
  me: null,
  signUpData: {},
  loginData: {},
};

const dummyUser = (data: { email: string; password: string }) => ({
  ...data,
  nickname: '에반진',
  id: 1,
  Posts: [],
  Followings: [],
  Followers: [],
});

export const loginRequestAction = (data: { email: string; password: string }): UserActionTypes => ({
  type: LOG_IN_REQUEST,
  data,
});

export const logoutRequestAction = (): UserActionTypes => ({
  type: LOG_OUT_REQUEST,
});

const reducer = (state: UserState = initialState, action: UserActionTypes): UserState => {
  switch (action.type) {
    case LOG_IN_REQUEST:
      return {
        ...state,
        logInLoading: true,
        logInError: null,
        logInDone: false,
      };
    case LOG_IN_SUCCESS:
      return {
        ...state,
        logInLoading: false,
        logInDone: true,
        me: dummyUser(action.data),
      };
    case LOG_IN_FAILURE:
      return {
        ...state,
        logInLoading: false,
        logInError: action.error,
      };
    case LOG_OUT_REQUEST:
      return {
        ...state,
        logOutLoading: true,
        logOutDone: false,
        logOutError: null,
      };
    case LOG_OUT_SUCCESS:
      return {
        ...state,
        logOutLoading: false,
        logOutDone: true,
        me: null,
      };
    case LOG_OUT_FAILURE:
      return {
        ...state,
        logOutLoading: false,
        logOutError: action.error,
      };
    case SIGN_UP_REQUEST:
      return {
        ...state,
        signUpLoading: true,
        signUpDone: false,
        signUpError: null,
      };
    case SIGN_UP_SUCCESS:
      return {
        ...state,
        signUpLoading: false,
        signUpDone: true,
      };
    case SIGN_UP_FAILURE:
      return {
        ...state,
        signUpLoading: false,
        signUpError: action.error,
      };
    default:
      return state;
  }
};

export default reducer;
