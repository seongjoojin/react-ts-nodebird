import produce from 'immer';
import { IMainPost } from './post';

export const LOAD_MY_INFO_REQUEST = 'LOAD_MY_INFO_REQUEST';
export const LOAD_MY_INFO_SUCCESS = 'LOAD_MY_INFO_SUCCESS';
export const LOAD_MY_INFO_FAILURE = 'LOAD_MY_INFO_FAILURE';

export const LOAD_USER_REQUEST = 'LOAD_USER_REQUEST';
export const LOAD_USER_SUCCESS = 'LOAD_USER_SUCCESS';
export const LOAD_USER_FAILURE = 'LOAD_USER_FAILURE';

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

export interface IMe {
  email: string;
  id: number;
  nickname: string;
  Posts: IMainPost[];
  Followings: Array<{ id: number; nickname: string }>;
  Followers: Array<{ id: number; nickname: string }>;
  createdAt: string;
  updatedAt: string;
}

export interface LoadMyInfoSuccessData {
  email: string;
  id: number;
  nickname: string;
  Posts: Array<{ id: number; }>;
  Followings: Array<{ id: number; }>;
  Followers: Array<{ id: number; }>;
  createdAt: string;
  updatedAt: string;
}

export interface LoginRequestAction {
  type: typeof LOG_IN_REQUEST
  data: { email: string; password: string }
}

export interface LoginSuccessAction {
  type: typeof LOG_IN_SUCCESS;
  data: {
    Followers: [];
    Followings: [];
    Posts: [];
    createdAt: '2021-03-09T12:56:41.000Z';
    email: '123@123.123';
    id: 1;
    nickname: '123';
    updatedAt: '2021-03-09T12:56:41.000Z';
  };
}

export interface LoginFailureAction {
  type: typeof LOG_IN_FAILURE
  error: string
}

export interface LogoutRequestAction {
  type: typeof LOG_OUT_REQUEST
}

export interface LogoutSuccessAction {
  type: typeof LOG_OUT_SUCCESS;
  data: IMe;
}

export interface LogoutFailureAction {
  type: typeof LOG_OUT_FAILURE
  error: string
}

export interface SignUpRequestAction {
  type: typeof SIGN_UP_REQUEST
  data: { email: string; password: string; nickname: string; }
}

export interface SignUpSuccessAction {
  type: typeof SIGN_UP_SUCCESS
}

export interface SignUpFailureAction {
  type: typeof SIGN_UP_FAILURE
  error: string
}

export interface ChangeNickNameRequestAction {
  type: typeof CHANGE_NICKNAME_REQUEST;
  data: string;
}

export interface ChangeNickNameSuccessAction {
  type: typeof CHANGE_NICKNAME_SUCCESS;
  data: { nickname: string; };
}

export interface ChangeNickNameFailureAction {
  type: typeof CHANGE_NICKNAME_FAILURE
  error: string
}

export interface FollowRequestAction {
  type: typeof FOLLOW_REQUEST;
  data: string;
}

export interface FollowSuccessAction {
  type: typeof FOLLOW_SUCCESS;
  data: string;
}

export interface FollowFailureAction {
  type: typeof FOLLOW_FAILURE;
  error: string;
}

export interface UnFollowRequestAction {
  type: typeof UNFOLLOW_REQUEST;
  data: string;
}

export interface UnFollowSuccessAction {
  type: typeof UNFOLLOW_SUCCESS;
  data: string;
}

export interface UnFollowFailureAction {
  type: typeof UNFOLLOW_FAILURE;
  error: string;
}

export interface LoadMyInfoRequestAction {
  type: typeof LOAD_MY_INFO_REQUEST;
}

export interface LoadMyInfoSuccessAction {
  type: typeof LOAD_MY_INFO_SUCCESS;
  data: LoadMyInfoSuccessData | null;
}

export interface LoadMyInfoFailureAction {
  type: typeof LOAD_MY_INFO_FAILURE;
  error: string;
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
  | FollowRequestAction
  | FollowSuccessAction
  | FollowFailureAction
  | UnFollowRequestAction
  | UnFollowSuccessAction
  | UnFollowFailureAction
  | AddPostToMeAction
  | RemovePostOfMeAction
  | LoadMyInfoRequestAction
  | LoadMyInfoSuccessAction
  | LoadMyInfoFailureAction;

interface UserState {
  loadMyInfoLoading: boolean; // 유저 정보 가져오기 시도중
  loadMyInfoDone: boolean;
  loadMyInfoError: string | null;
  logInLoading: boolean; // 로그인 시도중
  logInDone: boolean;
  logInError: string | null;
  logOutLoading: boolean; // 로그아웃 시도중
  logOutDone: boolean;
  logOutError: string | null;
  signUpLoading: boolean; // 회원가입 시도중
  signUpDone: boolean;
  signUpError: string | null;
  changeNicknameLoading: boolean; // 닉네임 변경 시도중
  changeNicknameDone: boolean;
  changeNicknameError: string | null;
  followLoading: boolean; // 팔로우 시도중
  followDone: boolean;
  followError: string | null;
  unfollowLoading: boolean; // 언팔로우 시도중
  unfollowDone: boolean;
  unfollowError: string | null;
  me: IMe | LoadMyInfoSuccessData | null;
}

const initialState: UserState = {
  loadMyInfoLoading: false,
  loadMyInfoDone: false,
  loadMyInfoError: null,
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
  followLoading: false, // 팔로우 시도중
  followDone: false,
  followError: null,
  unfollowLoading: false, // 언팔로우 시도중
  unfollowDone: false,
  unfollowError: null,
  me: null,
};

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
    case LOAD_MY_INFO_REQUEST:
      draft.loadMyInfoLoading = true;
      draft.loadMyInfoError = null;
      draft.loadMyInfoDone = false;
      break;
    case LOAD_MY_INFO_SUCCESS:
      draft.loadMyInfoLoading = false;
      draft.loadMyInfoDone = true;
      draft.me = action.data;
      break;
    case LOAD_MY_INFO_FAILURE:
      draft.loadMyInfoLoading = false;
      draft.loadMyInfoError = action.error;
      break;
    case FOLLOW_REQUEST:
      draft.followLoading = true;
      draft.followError = null;
      draft.followDone = false;
      break;
    case FOLLOW_SUCCESS:
      draft.followLoading = false;
      draft.followDone = true;
      draft.me?.Followings.push({ id: action.data });
      break;
    case FOLLOW_FAILURE:
      draft.followLoading = false;
      draft.followError = action.error;
      break;
    case UNFOLLOW_REQUEST:
      draft.unfollowLoading = true;
      draft.unfollowError = null;
      draft.unfollowDone = false;
      break;
    case UNFOLLOW_SUCCESS:
      draft.unfollowLoading = false;
      draft.unfollowDone = true;
      draft.me.Followings = draft.me?.Followings.filter((v) => v.id !== action.data);
      break;
    case UNFOLLOW_FAILURE:
      draft.unfollowLoading = false;
      draft.unfollowError = action.error;
      break;
    case LOG_IN_REQUEST:
      draft.logInLoading = true;
      draft.logInError = null;
      draft.logInDone = false;
      break;
    case LOG_IN_SUCCESS:
      draft.logInLoading = false;
      draft.logInDone = true;
      draft.me = action.data;
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
    case CHANGE_NICKNAME_SUCCESS: {
      if (draft.me) {
        draft.me.nickname = action.data.nickname;
      }
      draft.changeNicknameLoading = false;
      draft.changeNicknameDone = true;
      break;
    }
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
