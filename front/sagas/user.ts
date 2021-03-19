import axios, { AxiosResponse } from 'axios';
import { all, call, fork, put, takeLatest } from 'redux-saga/effects';

import {
  LOG_IN_FAILURE,
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
  LOG_OUT_FAILURE,
  LOG_OUT_REQUEST,
  LOG_OUT_SUCCESS,
  LoginRequestAction,
  SIGN_UP_FAILURE,
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  FOLLOW_REQUEST,
  UNFOLLOW_REQUEST,
  FOLLOW_SUCCESS,
  FOLLOW_FAILURE,
  UNFOLLOW_SUCCESS,
  UNFOLLOW_FAILURE,
  LOAD_MY_INFO_REQUEST,
  LOAD_MY_INFO_SUCCESS,
  LOAD_MY_INFO_FAILURE,
  LoadMyInfoSuccessData,
  FollowRequestAction,
  UnFollowRequestAction,
  SignUpRequestAction,
  IMe,
  CHANGE_NICKNAME_REQUEST,
  CHANGE_NICKNAME_SUCCESS,
  CHANGE_NICKNAME_FAILURE,
  ChangeNickNameRequestAction,
  LOAD_FOLLOWERS_REQUEST,
  LOAD_FOLLOWINGS_REQUEST,
  LOAD_FOLLOWERS_SUCCESS,
  LOAD_FOLLOWERS_FAILURE,
  LOAD_FOLLOWINGS_SUCCESS,
  LOAD_FOLLOWINGS_FAILURE,
  REMOVE_FOLLOWER_REQUEST,
  FollowType,
  REMOVE_FOLLOWER_SUCCESS,
  REMOVE_FOLLOWER_FAILURE,
  RemoveFollowerRequestAction,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAILURE, LOAD_USER_REQUEST, LoadUserRequestAction,
} from '../reducers/user';

function loadUserAPI(data:number) {
  return axios.get(`/user/${data}`);
}

function* loadUser(action: LoadUserRequestAction) {
  try {
    const result: AxiosResponse<IMe> = yield call(loadUserAPI, action.data);
    yield put({
      type: LOAD_USER_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_USER_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchLoadUser() {
  yield takeLatest(LOAD_USER_REQUEST, loadUser);
}

function loginAPI(data: { email: string; password: string }) {
  return axios.post('/user/login', data);
}

function* login(action: LoginRequestAction) {
  try {
    const result: AxiosResponse<IMe> = yield call(loginAPI, action.data);
    yield put({
      type: LOG_IN_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: LOG_IN_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchLogin() {
  yield takeLatest(LOG_IN_REQUEST, login);
}

function logOutAPI() {
  return axios.post('/user/logout');
}

function* logout() {
  try {
    yield call(logOutAPI);
    yield put({
      type: LOG_OUT_SUCCESS,
    });
  } catch (err) {
    yield put({
      type: LOG_OUT_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchLogout() {
  yield takeLatest(LOG_OUT_REQUEST, logout);
}

function signUpAPI(data: {
  email: string;
  password: string;
  nickname: string;
}) {
  return axios.post('/user', data);
}

function* signUp(action: SignUpRequestAction) {
  try {
    const result: AxiosResponse<string> = yield call(signUpAPI, action.data);
    console.log('signUp result', result);
    yield put({
      type: SIGN_UP_SUCCESS,
    });
  } catch (err) {
    yield put({
      type: SIGN_UP_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchSignUp() {
  yield takeLatest(SIGN_UP_REQUEST, signUp);
}

function followAPI(data: number) {
  return axios.patch(`/user/${data}/follow`);
}

function* follow(action: FollowRequestAction) {
  try {
    const result = yield call(followAPI, action.data);
    yield put({
      type: FOLLOW_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: FOLLOW_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchFollow() {
  yield takeLatest(FOLLOW_REQUEST, follow);
}

function unfollowAPI(data: number) {
  return axios.delete(`/user/${data}/follow`);
}

function* unfollow(action: UnFollowRequestAction) {
  try {
    const result = yield call(unfollowAPI, action.data);
    yield put({
      type: UNFOLLOW_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: UNFOLLOW_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchUnfollow() {
  yield takeLatest(UNFOLLOW_REQUEST, unfollow);
}

function loadMyInfoAPI() {
  return axios.get('/user');
}

function* loadMyInfo() {
  try {
    const result: AxiosResponse<LoadMyInfoSuccessData | null> = yield call(loadMyInfoAPI);
    yield put({
      type: LOAD_MY_INFO_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: LOAD_MY_INFO_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchLoadMyInfo() {
  yield takeLatest(LOAD_MY_INFO_REQUEST, loadMyInfo);
}

function changeNicknameAPI(data: string) {
  return axios.patch('/user/nickname', { nickname: data });
}

function* changeNickname(action: ChangeNickNameRequestAction) {
  try {
    const result: AxiosResponse<{ nickname:string }> = yield call(changeNicknameAPI, action.data);
    yield put({
      type: CHANGE_NICKNAME_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: CHANGE_NICKNAME_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchChangeNickName() {
  yield takeLatest(CHANGE_NICKNAME_REQUEST, changeNickname);
}

function loadFollowersAPI() {
  return axios.get('/user/followers?limit=1');
}

function* loadFollowers() {
  try {
    // eslint-disable-next-line max-len
    const result: AxiosResponse<Array<{ id?: number; nickname?: string; Follow?: FollowType[]; }>> = yield call(loadFollowersAPI);
    yield put({
      type: LOAD_FOLLOWERS_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: LOAD_FOLLOWERS_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchLoadFollowers() {
  yield takeLatest(LOAD_FOLLOWERS_REQUEST, loadFollowers);
}

function loadFollowingsAPI() {
  return axios.get('/user/followings?limit=1');
}

function* loadFollowings() {
  try {
    // eslint-disable-next-line max-len
    const result: AxiosResponse<Array<{ id?: number; nickname?: string; Follow?: FollowType[]; }>> = yield call(loadFollowingsAPI);
    yield put({
      type: LOAD_FOLLOWINGS_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: LOAD_FOLLOWINGS_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchLoadFollowings() {
  yield takeLatest(LOAD_FOLLOWINGS_REQUEST, loadFollowings);
}

function removeFollowerAPI(data: number) {
  return axios.delete(`/user/follower/${data}`);
}

function* removeFollower(action: RemoveFollowerRequestAction) {
  try {
    const result: AxiosResponse<any> = yield call(removeFollowerAPI, action.data);
    yield put({
      type: REMOVE_FOLLOWER_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: REMOVE_FOLLOWER_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchRemoveFollower() {
  yield takeLatest(REMOVE_FOLLOWER_REQUEST, removeFollower);
}

export default function* userSaga() {
  yield all([
    fork(watchLoadUser),
    fork(watchRemoveFollower),
    fork(watchLoadFollowers),
    fork(watchLoadFollowings),
    fork(watchChangeNickName),
    fork(watchLoadMyInfo),
    fork(watchLogin),
    fork(watchFollow),
    fork(watchUnfollow),
    fork(watchLogout),
    fork(watchSignUp),
  ]);
}
