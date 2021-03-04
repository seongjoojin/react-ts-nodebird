import produce from 'immer';
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

export const CHANGE_NICKNAME_REQUEST = 'CHANGE_NICKNAME_REQUEST';
export const CHANGE_NICKNAME_SUCCESS = 'CHANGE_NICKNAME_SUCCESS';
export const CHANGE_NICKNAME_FAILURE = 'CHANGE_NICKNAME_FAILURE';

export const FOLLOW_REQUEST = 'FOLLOW_REQUEST';
export const FOLLOW_SUCCESS = 'FOLLOW_SUCCESS';
export const FOLLOW_FAILURE = 'FOLLOW_FAILURE';

export const UNFOLLOW_REQUEST = 'UNFOLLOW_REQUEST';
export const UNFOLLOW_SUCCESS = 'UNFOLLOW_SUCCESS';
export const UNFOLLOW_FAILURE = 'UNFOLLOW_FAILURE';

export const ADD_POST_TO_ME = 'ADD_POST_TO_ME';
export const REMOVE_POST_OF_ME = 'REMOVE_POST_OF_ME';

interface IMe {
  email: string;
  password: string;
  id: string;
  nickname: string;
  Posts: IMainPost[];
  Followings: Array<{ nickname: string }>
  Followers: Array<{ nickname: string }>
}

export interface LoginRequestAction {
  type: typeof LOG_IN_REQUEST
  data: { email: string; password: string }
}

export interface LoginSuccessAction {
  type: typeof LOG_IN_SUCCESS
  data: { email: string; password: string }
}

export interface LoginFailureAction {
  type: typeof LOG_IN_FAILURE
  error: object
}

export interface LogoutRequestAction {
  type: typeof LOG_OUT_REQUEST
}

export interface LogoutSuccessAction {
  type: typeof LOG_OUT_SUCCESS
}

export interface LogoutFailureAction {
  type: typeof LOG_OUT_FAILURE
  error: object
}

export interface SignUpRequestAction {
  type: typeof SIGN_UP_REQUEST
  data: { email: string; password: string; nickname: string; }
}

export interface SignUpSuccessAction {
  type: typeof SIGN_UP_SUCCESS
  data: { email: string; password: string; nickname: string; }
}

export interface SignUpFailureAction {
  type: typeof SIGN_UP_FAILURE
  error: object
}

export interface ChangeNickNameRequestAction {
  type: typeof CHANGE_NICKNAME_REQUEST
}

export interface ChangeNickNameSuccessAction {
  type: typeof CHANGE_NICKNAME_SUCCESS
}

export interface ChangeNickNameFailureAction {
  type: typeof CHANGE_NICKNAME_FAILURE
  error: object
}

export interface AddPostToMeAction {
  type: typeof ADD_POST_TO_ME;
  data: string;
}

export interface RemovePostOfMeAction {
  type: typeof REMOVE_POST_OF_ME,
  data: string;
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
  | SignUpFailureAction
  | ChangeNickNameRequestAction
  | ChangeNickNameSuccessAction
  | ChangeNickNameFailureAction
  | AddPostToMeAction
  | RemovePostOfMeAction;

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
  changeNicknameLoading: boolean; // 닉네임 변경 시도중
  changeNicknameDone: boolean;
  changeNicknameError: object | null;
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
  changeNicknameLoading: false,
  changeNicknameDone: false,
  changeNicknameError: null,
  me: null,
  signUpData: {},
  loginData: {},
};

const dummyUser = (data: { email: string; password: string }) => ({
  ...data,
  nickname: '에반진',
  id: '1',
  Posts: [{ id: '1' }],
  Followings: [
    { nickanme: '부기초' },
    { nickanme: '피카츄' },
    { nickanme: '라이츄' },
  ],
  Followers: [
    { nickanme: '부기초' },
    { nickanme: '피카츄' },
    { nickanme: '라이츄' },
  ],
});

export const loginRequestAction = (data: { email: string; password: string }): UserActionTypes => ({
  type: LOG_IN_REQUEST,
  data,
});

export const logoutRequestAction = (): UserActionTypes => ({
  type: LOG_OUT_REQUEST,
});

// eslint-disable-next-line max-len
const reducer = (state: UserState = initialState, action: UserActionTypes): UserState => produce(state, (draft) => {
  switch (action.type) {
    case LOG_IN_REQUEST:
      draft.logInLoading = true;
      draft.logInError = null;
      draft.logInDone = false;
      break;
    case LOG_IN_SUCCESS:
      draft.logInLoading = false;
      draft.logInDone = true;
      draft.me = dummyUser(action.data);
      break;
    case LOG_IN_FAILURE:
      draft.logInLoading = false;
      draft.logInError = action.error;
      break;
    case LOG_OUT_REQUEST:
      draft.logOutLoading = true;
      draft.logOutDone = false;
      draft.logOutError = null;
      break;
    case LOG_OUT_SUCCESS:
      draft.logOutLoading = false;
      draft.logOutDone = true;
      draft.me = null;
      break;
    case LOG_OUT_FAILURE:
      draft.logOutLoading = false;
      draft.logOutError = action.error;
      break;
    case SIGN_UP_REQUEST:
      draft.signUpLoading = true;
      draft.signUpDone = false;
      draft.signUpError = null;
      break;
    case SIGN_UP_SUCCESS:
      draft.signUpLoading = false;
      draft.signUpDone = true;
      break;
    case SIGN_UP_FAILURE:
      draft.signUpLoading = false;
      draft.signUpError = action.error;
      break;
    case CHANGE_NICKNAME_REQUEST:
      draft.changeNicknameLoading = true;
      draft.changeNicknameDone = false;
      draft.changeNicknameError = null;
      break;
    case CHANGE_NICKNAME_SUCCESS:
      draft.changeNicknameLoading = false;
      draft.changeNicknameDone = true;
      break;
    case CHANGE_NICKNAME_FAILURE:
      draft.changeNicknameLoading = false;
      draft.changeNicknameError = action.error;
      break;
    case ADD_POST_TO_ME:
      draft.me?.Posts.unshift({ id: action.data });
      break;
    case REMOVE_POST_OF_ME:
      draft.me.Posts = draft.me?.Posts.filter((v) => v.id !== action.data);
      break;
    default:
      break;
  }
});

export default reducer;
