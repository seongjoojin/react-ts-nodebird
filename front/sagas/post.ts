import axios, { AxiosResponse } from 'axios';
import { nanoid } from 'nanoid';
import { all, call, delay, fork, put, takeLatest } from 'redux-saga/effects';
import { ADD_POST_TO_ME, REMOVE_POST_OF_ME } from '../reducers/user';
import {
  AddCommentRequestAction,
  AddPostRequestAction,
  ADD_COMMENT_FAILURE, ADD_COMMENT_REQUEST,
  ADD_COMMENT_SUCCESS,
  ADD_POST_FAILURE,
  ADD_POST_REQUEST,
  ADD_POST_SUCCESS,
  generateDummyPost,
  LoadPostRequestAction,
  LOAD_POSTS_FAILURE,
  LOAD_POSTS_REQUEST,
  LOAD_POSTS_SUCCESS,
  RemovePostRequestAction,
  REMOVE_POST_FAILURE,
  REMOVE_POST_REQUEST,
  REMOVE_POST_SUCCESS, IMainPost,
} from '../reducers/post';

function addPostAPI(data: string) {
  return axios.post('/post', { content: data });
}

function* addPost(action: AddPostRequestAction) {
  try {
    const result: AxiosResponse<IMainPost> = yield call(addPostAPI, action.data);
    yield put({
      type: ADD_POST_SUCCESS,
      data: result.data,
    });
    yield put({
      type: ADD_POST_TO_ME,
      data: result.data.id,
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

function loadPostsAPI() {}

function* loadPosts(action: LoadPostRequestAction) {
  try {
    yield delay(2000);
    yield put({
      type: LOAD_POSTS_SUCCESS,
      data: generateDummyPost(10),
    });
  } catch (err) {
    yield put({
      type: LOAD_POSTS_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchLoadPosts() {
  yield takeLatest(LOAD_POSTS_REQUEST, loadPosts);
}

function removePostAPI(data) {
  return axios.delete('/post', { withCredentials: true });
}

function* removePost(action: RemovePostRequestAction) {
  try {
    yield delay(2000);
    yield put({
      type: REMOVE_POST_SUCCESS,
      data: action.data,
    });
    yield put({
      type: REMOVE_POST_OF_ME,
      data: action.data,
    });
  } catch (err) {
    yield put({
      type: REMOVE_POST_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchRemovePost() {
  yield takeLatest(REMOVE_POST_REQUEST, removePost);
}

function addCommentAPI(data: { content: string, postId: number, userId: number }) {
  return axios.post(`/post/${data.postId}/comment`, data, { withCredentials: true });
}

function* addComment(action: AddCommentRequestAction) {
  try {
    const result : AxiosResponse<any> = yield call(addCommentAPI, action.data);
    yield put({
      type: ADD_COMMENT_SUCCESS,
      data: result.data,
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
    fork(watchLoadPosts),
    fork(watchRemovePost),
    fork(watchAddComment),
  ]);
}
