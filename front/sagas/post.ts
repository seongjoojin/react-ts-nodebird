import axios, { AxiosResponse } from 'axios';
import { all, call, fork, put, takeLatest } from 'redux-saga/effects';
import { ADD_POST_TO_ME, REMOVE_POST_OF_ME } from '../reducers/user';
import {
  AddCommentRequestAction,
  AddPostRequestAction,
  ADD_COMMENT_FAILURE,
  ADD_COMMENT_REQUEST,
  ADD_COMMENT_SUCCESS,
  ADD_POST_FAILURE,
  ADD_POST_REQUEST,
  ADD_POST_SUCCESS,
  LoadPostsRequestAction,
  LOAD_POSTS_FAILURE,
  LOAD_POSTS_REQUEST,
  LOAD_POSTS_SUCCESS,
  RemovePostRequestAction,
  REMOVE_POST_FAILURE,
  REMOVE_POST_REQUEST,
  REMOVE_POST_SUCCESS,
  IMainPost,
  AddCommentSuccessData,
  LIKE_POST_SUCCESS,
  LIKE_POST_FAILURE,
  LIKE_POST_REQUEST,
  UNLIKE_POST_REQUEST,
  UNLIKE_POST_SUCCESS,
  UNLIKE_POST_FAILURE,
  LikePostRequestAction,
  UnLikePostRequestAction,
  UPLOAD_IMAGES_REQUEST,
  UPLOAD_IMAGES_SUCCESS,
  UPLOAD_IMAGES_FAILURE,
  UploadImagesRequestAction,
  RETWEET_REQUEST,
  RETWEET_SUCCESS,
  RETWEET_FAILURE,
  ReTweetRequestAction,
  LoadPostRequestAction,
  LOAD_POST_SUCCESS,
  LOAD_POST_FAILURE,
  LOAD_POST_REQUEST,
  LOAD_HASHTAG_POSTS_REQUEST,
  LOAD_HASHTAG_POSTS_SUCCESS,
  LOAD_HASHTAG_POSTS_FAILURE,
  LOAD_USER_POSTS_REQUEST,
  LOAD_USER_POSTS_SUCCESS,
  LOAD_USER_POSTS_FAILURE,
  LoadHashtagPostsRequestAction,
  LoadUserPostsRequestAction,
} from '../reducers/post';

function retweetAPI(data: number) {
  return axios.post<{ data: IMainPost }>(`/post/${data}/retweet`);
}

function* retweet(action: ReTweetRequestAction) {
  try {
    const result: AxiosResponse<IMainPost> = yield call(
      retweetAPI,
      action.data,
    );
    yield put({
      type: RETWEET_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: RETWEET_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchRetweet() {
  yield takeLatest(RETWEET_REQUEST, retweet);
}

function uploadImagesAPI(data: FormData) {
  return axios.post<{ data: IMainPost }>('/post/images', data);
}

function* uploadImages(action: UploadImagesRequestAction) {
  try {
    const result: AxiosResponse<IMainPost> = yield call(
      uploadImagesAPI,
      action.data,
    );
    yield put({
      type: UPLOAD_IMAGES_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: UPLOAD_IMAGES_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchUploadImages() {
  yield takeLatest(UPLOAD_IMAGES_REQUEST, uploadImages);
}

function addPostAPI(data: FormData) {
  return axios.post<{ data: IMainPost }>('/post', data);
}

function* addPost(action: AddPostRequestAction) {
  try {
    const result: AxiosResponse<IMainPost> = yield call(
      addPostAPI,
      action.data,
    );
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

function loadPostAPI(data: number) {
  return axios.get<{ data: IMainPost }>(`/post/${data}`);
}

function* loadPost(action: LoadPostRequestAction) {
  try {
    const result: AxiosResponse<IMainPost> = yield call(
      loadPostAPI,
      action.data,
    );
    yield put({
      type: LOAD_POST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: LOAD_POST_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchLoadPost() {
  yield takeLatest(LOAD_POST_REQUEST, loadPost);
}

function loadUserPostsAPI(data: number, lastId: number | undefined) {
  return axios.get<{ data: IMainPost[] }>(`/user/${data}/posts?lastId=${lastId || 0}`);
}

function* loadUserPosts(action:LoadUserPostsRequestAction) {
  try {
    const result: AxiosResponse<IMainPost[]> = yield call(
      loadUserPostsAPI,
      action.data,
      action.lastId,
    );
    yield put({
      type: LOAD_USER_POSTS_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: LOAD_USER_POSTS_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchLoadUserPosts() {
  yield takeLatest(LOAD_USER_POSTS_REQUEST, loadUserPosts);
}

function loadHashtagPostsAPI(data: string, lastId: number | undefined) {
  return axios.get<{ data: IMainPost[] }>(`/hashtag/${encodeURIComponent(data)}?lastId=${lastId || 0}`);
}

function* loadHashtagPosts(action: LoadHashtagPostsRequestAction) {
  try {
    const result: AxiosResponse<IMainPost[]> = yield call(
      loadHashtagPostsAPI,
      action.data,
      action.lastId,
    );
    yield put({
      type: LOAD_HASHTAG_POSTS_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: LOAD_HASHTAG_POSTS_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchLoadHashtagPosts() {
  yield takeLatest(LOAD_HASHTAG_POSTS_REQUEST, loadHashtagPosts);
}

function loadPostsAPI(lastId: number | undefined) {
  return axios.get<{ data: IMainPost[] }>(`/posts?lastId=${lastId || 0}`);
}

function* loadPosts(action: LoadPostsRequestAction) {
  try {
    const result: AxiosResponse<IMainPost[]> = yield call(
      loadPostsAPI,
      action.lastId,
    );
    yield put({
      type: LOAD_POSTS_SUCCESS,
      data: result.data,
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

function likePostAPI(data: number) {
  return axios.patch<{ data: { PostId: number; UserId: number } }>(
    `/post/${data}/like`,
  );
}

function* likePost(action: LikePostRequestAction) {
  try {
    const result: AxiosResponse<{
      PostId: number;
      UserId: number;
    }> = yield call(likePostAPI, action.data);
    yield put({
      type: LIKE_POST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: LIKE_POST_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchLikePost() {
  yield takeLatest(LIKE_POST_REQUEST, likePost);
}

function unlikePostAPI(data: number) {
  return axios.delete<{ data: { PostId: number; UserId: number } }>(
    `/post/${data}/like`,
  );
}

function* unlikePost(action: UnLikePostRequestAction) {
  try {
    const result: AxiosResponse<{
      PostId: number;
      UserId: number;
    }> = yield call(unlikePostAPI, action.data);
    yield put({
      type: UNLIKE_POST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: UNLIKE_POST_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchUnlikePost() {
  yield takeLatest(UNLIKE_POST_REQUEST, unlikePost);
}

function removePostAPI(data: number) {
  return axios.delete<{ data: { PostId: number } }>(`/post/${data}`);
}

function* removePost(action: RemovePostRequestAction) {
  try {
    const result: AxiosResponse<{ PostId: number }> = yield call(
      removePostAPI,
      action.data,
    );
    yield put({
      type: REMOVE_POST_SUCCESS,
      data: result.data,
    });
    yield put({
      type: REMOVE_POST_OF_ME,
      data: result.data,
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

function addCommentAPI(data: {
  content: string;
  postId: number;
  userId: number;
}) {
  return axios.post<{ data: AddCommentSuccessData }>(
    `/post/${data.postId}/comment`,
    data,
  );
}

function* addComment(action: AddCommentRequestAction) {
  try {
    const result: AxiosResponse<AddCommentSuccessData> = yield call(
      addCommentAPI,
      action.data,
    );
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
    fork(watchRetweet),
    fork(watchUploadImages),
    fork(watchLikePost),
    fork(watchUnlikePost),
    fork(watchAddPost),
    fork(watchLoadPost),
    fork(watchLoadUserPosts),
    fork(watchLoadHashtagPosts),
    fork(watchLoadPosts),
    fork(watchRemovePost),
    fork(watchAddComment),
  ]);
}
