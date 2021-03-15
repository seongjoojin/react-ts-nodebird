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

export const REMOVE_FOLLOWER_REQUEST = 'REMOVE_FOLLOWER_REQUEST';
export const REMOVE_FOLLOWER_SUCCESS = 'REMOVE_FOLLOWER_SUCCESS';
export const REMOVE_FOLLOWER_FAILURE = 'REMOVE_FOLLOWER_FAILURE';

export const LOAD_FOLLOWINGS_REQUEST = 'LOAD_FOLLOWINGS_REQUEST';
export const LOAD_FOLLOWINGS_SUCCESS = 'LOAD_FOLLOWINGS_SUCCESS';
export const LOAD_FOLLOWINGS_FAILURE = 'LOAD_FOLLOWINGS_FAILURE';

export const LOAD_FOLLOWERS_REQUEST = 'LOAD_FOLLOWERS_REQUEST';
export const LOAD_FOLLOWERS_SUCCESS = 'LOAD_FOLLOWERS_SUCCESS';
export const LOAD_FOLLOWERS_FAILURE = 'LOAD_FOLLOWERS_FAILURE';

export const ADD_POST_TO_ME = 'ADD_POST_TO_ME';
export const REMOVE_POST_OF_ME = 'REMOVE_POST_OF_ME';

export type FollowType = {
  createdAt: string;
  updatedAt: string;
  FollowingId: string;
  FollowerId: string;
};

export interface IMe {
  email: string;
  id: number;
  nickname: string;
  Posts: IMainPost[];
  Followings: Array<{ id: number; nickname?: string; Follow?: FollowType[]; }>;
  Followers: Array<{ id: number; nickname?: string; Follow?: FollowType[]; }>;
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
  data: IMe;
}

export interface LoginFailureAction {
  type: typeof LOG_IN_FAILURE;
  error: string
}

export interface LogoutRequestAction {
  type: typeof LOG_OUT_REQUEST;
}

export interface LogoutSuccessAction {
  type: typeof LOG_OUT_SUCCESS;
  data: IMe;
}

export interface LogoutFailureAction {
  type: typeof LOG_OUT_FAILURE;
  error: string;
}

export interface SignUpRequestAction {
  type: typeof SIGN_UP_REQUEST;
  data: { email: string; password: string; nickname: string; }
}

export interface SignUpSuccessAction {
  type: typeof SIGN_UP_SUCCESS;
}

export interface SignUpFailureAction {
  type: typeof SIGN_UP_FAILURE;
  error: string;
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
  data: number;
}

export interface FollowSuccessAction {
  type: typeof FOLLOW_SUCCESS;
  data: { UserId: number };
}

export interface FollowFailureAction {
  type: typeof FOLLOW_FAILURE;
  error: string;
}

export interface UnFollowRequestAction {
  type: typeof UNFOLLOW_REQUEST;
  data: number;
}

export interface UnFollowSuccessAction {
  type: typeof UNFOLLOW_SUCCESS;
  data: { UserId: number };
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
  data: IMainPost;
}

export interface RemovePostOfMeAction {
  type: typeof REMOVE_POST_OF_ME,
  data: number;
}

export interface RemoveFollowerRequestAction {
  type: typeof REMOVE_FOLLOWER_REQUEST;
  data: number;
}

export interface RemoveFollowerSuccessAction {
  type: typeof REMOVE_FOLLOWER_SUCCESS
  data: { UserId: number }
}

export interface RemoveFollowerFailureAction {
  type: typeof REMOVE_FOLLOWER_FAILURE;
  error: string;
}

export interface LoadFollowingsRequestAction {
  type: typeof LOAD_FOLLOWINGS_REQUEST
}

export interface LoadFollowingsSuccessAction {
  type: typeof LOAD_FOLLOWINGS_SUCCESS;
  data: Array<{ id: number; nickname?: string; Follow?: FollowType[] }>;
}

export interface LoadFollowingsFailureAction {
  type: typeof LOAD_FOLLOWINGS_FAILURE;
  error: string;
}

export interface LoadFollowersRequestAction {
  type: typeof LOAD_FOLLOWERS_REQUEST
}

export interface LoadFollowersSuccessAction {
  type: typeof LOAD_FOLLOWERS_SUCCESS;
  data: Array<{ id: number; nickname?: string; Follow?: FollowType[] }>;
}

export interface LoadFollowersFailureAction {
  type: typeof LOAD_FOLLOWERS_FAILURE;
  error: string;
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
  | LoadMyInfoFailureAction
  | RemoveFollowerRequestAction
  | RemoveFollowerSuccessAction
  | RemoveFollowerFailureAction
  | LoadFollowingsRequestAction
  | LoadFollowingsSuccessAction
  | LoadFollowingsFailureAction
  | LoadFollowersRequestAction
  | LoadFollowersSuccessAction
  | LoadFollowersFailureAction;

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
  loadFollowingsLoading: boolean;
  loadFollowingsDone: boolean;
  loadFollowingsError: string | null;
  loadFollowersLoading: boolean;
  loadFollowersDone: boolean;
  loadFollowersError: string | null;
  removeFollowerLoading: boolean;
  removeFollowerDone: boolean;
  removeFollowerError: string | null;
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
  loadFollowingsLoading: false,
  loadFollowingsDone: false,
  loadFollowingsError: null,
  loadFollowersLoading: false,
  loadFollowersDone: false,
  loadFollowersError: null,
  removeFollowerLoading: false,
  removeFollowerDone: false,
  removeFollowerError: null,
  me: null,
};

export const loginRequestAction = (data: { email: string; password: string }): UserActionTypes => ({
  type: LOG_IN_REQUEST,
  data,
});

export const logoutRequestAction = (): UserActionTypes => ({
  type: LOG_OUT_REQUEST,
});

export const followRequestAction = (data: number): UserActionTypes => ({
  type: FOLLOW_REQUEST,
  data,
});

export const unfollowRequestAction = (data: number): UserActionTypes => ({
  type: UNFOLLOW_REQUEST,
  data,
});

export const changeNicknameRequestAction = (data: string): UserActionTypes => ({
  type: CHANGE_NICKNAME_REQUEST,
  data,
});

export const loadFollowersRequestAction = (): UserActionTypes => ({
  type: LOAD_FOLLOWERS_REQUEST,
});

export const loadFollowingsRequestAction = (): UserActionTypes => ({
  type: LOAD_FOLLOWINGS_REQUEST,
});

export const removeFollowerRequestAction = (data: number): UserActionTypes => ({
  type: REMOVE_FOLLOWER_REQUEST,
  data,
});

// eslint-disable-next-line max-len
const reducer = (state: UserState = initialState, action: UserActionTypes): UserState => produce(state, (draft) => {
  switch (action.type) {
    case REMOVE_FOLLOWER_REQUEST:
      draft.removeFollowerLoading = true;
      draft.removeFollowerError = null;
      draft.removeFollowerDone = false;
      break;
    case REMOVE_FOLLOWER_SUCCESS:
      if (draft.me) {
        draft.me.Followers = draft.me.Followers.filter((v) => v.id !== action.data.UserId);
      }
      draft.removeFollowerLoading = false;
      draft.removeFollowerDone = true;
      break;
    case REMOVE_FOLLOWER_FAILURE:
      draft.removeFollowerLoading = false;
      draft.removeFollowerError = action.error;
      break;
    case LOAD_FOLLOWINGS_REQUEST:
      draft.loadFollowingsLoading = true;
      draft.loadFollowingsError = null;
      draft.loadFollowingsDone = false;
      break;
    case LOAD_FOLLOWINGS_SUCCESS: {
      if (draft.me) {
        draft.me.Followings.splice(-1);
        draft.me.Followings = draft.me.Followings.concat(...action.data);
      }
      draft.loadFollowingsLoading = false;
      draft.loadFollowingsDone = true;
      break;
    }
    case LOAD_FOLLOWINGS_FAILURE:
      draft.loadFollowingsLoading = false;
      draft.loadFollowingsError = action.error;
      break;
    case LOAD_FOLLOWERS_REQUEST:
      draft.loadFollowersLoading = true;
      draft.loadFollowersError = null;
      draft.loadFollowersDone = false;
      break;
    case LOAD_FOLLOWERS_SUCCESS: {
      if (draft.me) {
        draft.me.Followers.splice(-1);
        draft.me.Followers = draft.me.Followers.concat(...action.data);
      }
      draft.loadFollowersLoading = false;
      draft.loadFollowersDone = true;
      break;
    }
    case LOAD_FOLLOWERS_FAILURE:
      draft.loadFollowersLoading = false;
      draft.loadFollowersError = action.error;
      break;
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
      draft.me?.Followings.push({ id: action.data.UserId });
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
    case UNFOLLOW_SUCCESS: {
      draft.unfollowLoading = false;
      draft.unfollowDone = true;
      if (draft.me) {
        draft.me.Followings = draft.me?.Followings.filter((v) => v.id !== action.data.UserId);
      }
      break;
    }
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
      draft.me?.Posts.unshift(action.data);
      break;
    case REMOVE_POST_OF_ME: {
      if (draft.me) {
        draft.me.Posts = draft.me?.Posts.filter((v) => v.id !== action.data);
      }
      break;
    }
    default:
      break;
  }
});

export default reducer;
