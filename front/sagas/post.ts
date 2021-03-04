import { all, delay, fork, put, takeLatest } from 'redux-saga/effects';
import {
  AddCommentRequestAction,
  AddPostRequestAction,
  ADD_COMMENT_FAILURE, ADD_COMMENT_REQUEST,
  ADD_COMMENT_SUCCESS,
  ADD_POST_FAILURE,
  ADD_POST_REQUEST,
  ADD_POST_SUCCESS,
} from '../reducers/post';

function addPostAPI() {

}

function* addPost(action: AddPostRequestAction) {
  try {
    yield delay(2000);
    yield put({
      type: ADD_POST_SUCCESS,
      data: action.data,
    });
  } catch (err) {
    yield put({
      type: ADD_POST_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchAddPost() {
  yield takeLatest(ADD_POST_REQUEST, addPost);
}

function addCommentAPI() {

}

function* addComment(action: AddCommentRequestAction) {
  try {
    yield delay(2000);
    yield put({
      type: ADD_COMMENT_SUCCESS,
      data: action.data,
    });
  } catch (err) {
    yield put({
      type: ADD_COMMENT_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchAddComment() {
  yield takeLatest(ADD_COMMENT_REQUEST, addComment);
}
export default function* postSaga() {
  yield all([
    fork(watchAddPost),
    fork(watchAddComment),
  ]);
}
