import {all, delay, fork, put, takeLatest} from 'redux-saga/effects';

function addPostAPI() {

}

function* addPost() {
  try {
    yield delay(2000);
    yield put({
      type: 'ADD_POST_SUCCESS',
    });
  } catch (e) {
    yield put({
      type: 'ADD_POST_FAILURE',
      error: e,
    });
  }
}

function* watchAddPost() {
  yield takeLatest('ADD_POST_REQUEST', addPost);
}

export default function* postSaga() {
  yield all([
    fork(watchAddPost),
  ]);
}