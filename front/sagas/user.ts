import {all, delay, fork, put, takeLatest} from 'redux-saga/effects';

import {
  LOG_IN_FAILURE,
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
  LOG_OUT_FAILURE,
  LOG_OUT_REQUEST,
  LOG_OUT_SUCCESS,
  LoginRequestAction,
} from 'reducers/user';

function* login(action: LoginRequestAction) {
  try {
    // yield call(loginAPI);
    // yield delay(1000);
    yield put({
      type: LOG_IN_SUCCESS,
      data: action.payload
    });
  } catch (err) {
    yield put({
      type: LOG_IN_FAILURE,
      data: err.response.data
    });
  }
}

function* watchLogin() {
  yield takeLatest(LOG_IN_REQUEST, login);
}

function* logout() {
  try {
    // const result = yield call(logOutAPI);
    yield delay(1000);
    yield put({
      type: LOG_OUT_SUCCESS,
    });
  } catch (err) {
    yield put({
      type: LOG_OUT_FAILURE,
      data: err.response.data,
    });
  }
}

function* watchLogout() {
  yield takeLatest(LOG_OUT_REQUEST, logout);
}


export default function* userSaga() {
  yield all([
    fork(watchLogin),
    fork(watchLogout)
  ]);
}