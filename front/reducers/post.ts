import produce from 'immer';

export const UPLOAD_IMAGES_REQUEST = 'UPLOAD_IMAGES_REQUEST' as const;
export const UPLOAD_IMAGES_SUCCESS = 'UPLOAD_IMAGES_SUCCESS' as const;
export const UPLOAD_IMAGES_FAILURE = 'UPLOAD_IMAGES_FAILURE' as const;

export const LIKE_POST_REQUEST = 'LIKE_POST_REQUEST' as const;
export const LIKE_POST_SUCCESS = 'LIKE_POST_SUCCESS' as const;
export const LIKE_POST_FAILURE = 'LIKE_POST_FAILURE' as const;

export const UNLIKE_POST_REQUEST = 'UNLIKE_POST_REQUEST' as const;
export const UNLIKE_POST_SUCCESS = 'UNLIKE_POST_SUCCESS' as const;
export const UNLIKE_POST_FAILURE = 'UNLIKE_POST_FAILURE' as const;

export const LOAD_POST_REQUEST = 'LOAD_POST_REQUEST' as const;
export const LOAD_POST_SUCCESS = 'LOAD_POST_SUCCESS' as const;
export const LOAD_POST_FAILURE = 'LOAD_POST_FAILURE' as const;

export const LOAD_USER_POSTS_REQUEST = 'LOAD_USER_POSTS_REQUEST' as const;
export const LOAD_USER_POSTS_SUCCESS = 'LOAD_USER_POSTS_SUCCESS' as const;
export const LOAD_USER_POSTS_FAILURE = 'LOAD_USER_POSTS_FAILURE' as const;

export const LOAD_HASHTAG_POSTS_REQUEST = 'LOAD_HASHTAG_POSTS_REQUEST' as const;
export const LOAD_HASHTAG_POSTS_SUCCESS = 'LOAD_HASHTAG_POSTS_SUCCESS' as const;
export const LOAD_HASHTAG_POSTS_FAILURE = 'LOAD_HASHTAG_POSTS_FAILURE' as const;

export const LOAD_POSTS_REQUEST = 'LOAD_POSTS_REQUEST' as const;
export const LOAD_POSTS_SUCCESS = 'LOAD_POSTS_SUCCESS' as const;
export const LOAD_POSTS_FAILURE = 'LOAD_POSTS_FAILURE' as const;

export const ADD_POST_REQUEST = 'ADD_POST_REQUEST' as const;
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS' as const;
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE' as const;

export const REMOVE_POST_REQUEST = 'REMOVE_POST_REQUEST' as const;
export const REMOVE_POST_SUCCESS = 'REMOVE_POST_SUCCESS' as const;
export const REMOVE_POST_FAILURE = 'REMOVE_POST_FAILURE' as const;

export const ADD_COMMENT_REQUEST = 'ADD_COMMENT_REQUEST' as const;
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS' as const;
export const ADD_COMMENT_FAILURE = 'ADD_COMMENT_FAILURE' as const;

export const RETWEET_REQUEST = 'RETWEET_REQUEST' as const;
export const RETWEET_SUCCESS = 'RETWEET_SUCCESS' as const;
export const RETWEET_FAILURE = 'RETWEET_FAILURE' as const;

export const REMOVE_IMAGE = 'REMOVE_IMAGE' as const;

export interface UploadImagesRequestAction {
  type: typeof UPLOAD_IMAGES_REQUEST;
  data: FormData;
}

export interface UploadImagesSuccessAction {
  type: typeof UPLOAD_IMAGES_SUCCESS
  data: string[];
}

export interface UploadImagesFailureAction {
  type: typeof UPLOAD_IMAGES_FAILURE;
  error: string;
}

export interface LikePostRequestAction {
  type: typeof LIKE_POST_REQUEST;
  data: number;
}

export interface LikePostSuccessAction {
  type: typeof LIKE_POST_SUCCESS;
  data: { PostId: number; UserId: number; }
}

export interface LikePostFailureAction {
  type: typeof LIKE_POST_FAILURE;
  error: string;
}

export interface UnLikePostRequestAction {
  type: typeof UNLIKE_POST_REQUEST;
  data: number;
}

export interface UnLikePostSuccessAction {
  type: typeof UNLIKE_POST_SUCCESS;
  data: { PostId: number; UserId: number; }
}

export interface UnLikePostFailureAction {
  type: typeof UNLIKE_POST_FAILURE;
  error: string;
}

export interface LoadHashtagPostsRequestAction {
  type: typeof LOAD_HASHTAG_POSTS_REQUEST
}

export interface LoadHashtagPostsSuccessAction {
  type: typeof LOAD_HASHTAG_POSTS_SUCCESS
}

export interface LoadHashtagPostsFailureAction {
  type: typeof LOAD_HASHTAG_POSTS_FAILURE;
  error: string;
}

export interface LoadUserPostsRequestAction {
  type: typeof LOAD_USER_POSTS_REQUEST
}

export interface LoadUserPostsSuccessAction {
  type: typeof LOAD_USER_POSTS_SUCCESS
}

export interface LoadUserPostsFailureAction {
  type: typeof LOAD_USER_POSTS_FAILURE;
  error: string;
}

export interface LoadPostsRequestAction {
  type: typeof LOAD_POSTS_REQUEST;
  lastId: number | undefined;
}

export interface LoadPostsSuccessAction {
  type: typeof LOAD_POSTS_SUCCESS;
  data: IMainPost[];
}

export interface LoadPostsFailureAction {
  type: typeof LOAD_POSTS_FAILURE;
  error: string;
}

export interface AddPostRequestAction {
  type: typeof ADD_POST_REQUEST;
  data: FormData ;
}

export interface AddPostSuccessAction {
  type: typeof ADD_POST_SUCCESS
  data: IMainPost
}

export interface AddPostFailureAction {
  type: typeof ADD_POST_FAILURE,
  error: string
}

export interface RemovePostRequestAction {
  type: typeof REMOVE_POST_REQUEST;
  data: number;
}

export interface RemovePostSuccessAction {
  type: typeof REMOVE_POST_SUCCESS;
  data: { PostId:number };
}

export interface RemovePostFailureAction {
  type: typeof REMOVE_POST_FAILURE;
  error: string;
}

export interface AddCommentRequestAction {
  type: typeof ADD_COMMENT_REQUEST
  data: { content: string, postId: number, userId: number }
}

export interface AddCommentSuccessAction {
  type: typeof ADD_COMMENT_SUCCESS;
  data: AddCommentSuccessData
}

export interface AddCommentFailureAction {
  type: typeof ADD_COMMENT_FAILURE,
  error: string
}

export interface ReTweetRequestAction {
  type: typeof RETWEET_REQUEST;
  data: number;
}

export interface ReTweetSuccessAction {
  type: typeof RETWEET_SUCCESS
}

export interface ReTweetFailureAction {
  type: typeof RETWEET_FAILURE;
  error: string;
}

export interface RemoveImageAction {
  type: typeof REMOVE_IMAGE;
  data: number;
}

type PostActionTypes =
  | UploadImagesRequestAction
  | UploadImagesSuccessAction
  | UploadImagesFailureAction
  | LikePostRequestAction
  | LikePostSuccessAction
  | LikePostFailureAction
  | UnLikePostRequestAction
  | UnLikePostSuccessAction
  | UnLikePostFailureAction
  | LoadUserPostsRequestAction
  | LoadUserPostsSuccessAction
  | LoadUserPostsFailureAction
  | LoadHashtagPostsRequestAction
  | LoadHashtagPostsSuccessAction
  | LoadHashtagPostsFailureAction
  | LoadPostsRequestAction
  | LoadPostsSuccessAction
  | LoadPostsFailureAction
  | AddPostRequestAction
  | AddPostSuccessAction
  | AddPostFailureAction
  | AddCommentRequestAction
  | AddCommentSuccessAction
  | AddCommentFailureAction
  | RemovePostRequestAction
  | RemovePostSuccessAction
  | RemovePostFailureAction
  | ReTweetRequestAction
  | ReTweetSuccessAction
  | ReTweetFailureAction
  | RemoveImageAction;

export interface IMainPost {
  id: number;
  UserId: number;
  User: {
    id: number;
    nickname: string;
  };
  content: string;
  Images: Array<{ id: number; src: string }>;
  Comments: Array<{
    id: number;
    content: string;
    UserId: number;
    PostId: number;
    createdAt: string;
    updatedAt: string;
    User: {
      id: number;
      nickname: string;
    }
  }>;
  Likers: Array<{
    id: number;
    Like?: Array<{
      UserId: number;
      PostId: number;
      createdAt: string;
      updatedAt: string;
    }>
  }>
  Retweet: {
    id:number;
    UserId: number;
    content:string;
    RetweetId: number | null;
    User: { id: number; nickname: string; }
    Images: Array<{ id: number; src: string }>;
    createdAt: string;
    updatedAt: string;
  } | null;
  RetweetId: number | null;
  createdAt: string;
  updatedAt: string;
}

export interface AddCommentSuccessData {
  PostId: number;
  User: { id: number, nickname: string };
  UserId: number
  content: string;
  createdAt: string;
  id: number;
  updatedAt: string;
}

interface PostState {
  mainPosts: IMainPost[];
  imagePaths: string[];
  hasMorePosts: boolean;
  likePostLoading: boolean;
  likePostDone: boolean;
  likePostError: string | null;
  unlikePostLoading: boolean;
  unlikePostDone: boolean;
  unlikePostError: string | null;
  addPostLoading: boolean;
  addPostDone: boolean;
  addPostError: string | null;
  loadPostsLoading: boolean;
  loadPostsDone: boolean;
  loadPostsError: string | null;
  removePostLoading: boolean;
  removePostDone: boolean;
  removePostError: string | null;
  addCommentLoading: boolean;
  addCommentDone: boolean;
  addCommentError: string | null;
  loadPostLoading: boolean;
  loadPostDone: boolean;
  loadPostError: string | null;
  uploadImagesLoading: boolean;
  uploadImagesDone: boolean;
  uploadImagesError: string | null;
  retweetLoading:boolean;
  retweetDone: boolean;
  retweetError: string | null;
}

const initialState: PostState = {
  mainPosts: [],
  imagePaths: [],
  hasMorePosts: true,
  likePostLoading: false,
  likePostDone: false,
  likePostError: null,
  unlikePostLoading: false,
  unlikePostDone: false,
  unlikePostError: null,
  addPostLoading: false,
  addPostDone: false,
  addPostError: null,
  loadPostsLoading: false,
  loadPostsDone: false,
  loadPostsError: null,
  removePostLoading: false,
  removePostDone: false,
  removePostError: null,
  addCommentLoading: false,
  addCommentDone: false,
  addCommentError: null,
  loadPostLoading: false,
  loadPostDone: false,
  loadPostError: null,
  uploadImagesLoading: false,
  uploadImagesDone: false,
  uploadImagesError: null,
  retweetLoading: false,
  retweetDone: false,
  retweetError: null,
};

export const addPostRequestAction = (data: FormData): PostActionTypes => ({
  type: ADD_POST_REQUEST,
  data,
});

export const addCommentRequestAction = (data: {
  content: string, postId: number, userId: number
}): PostActionTypes => ({
  type: ADD_COMMENT_REQUEST,
  data,
});

export const likePostRequestAction = (data: number): PostActionTypes => ({
  type: LIKE_POST_REQUEST,
  data,
});

export const unlikePostRequestAction = (data: number): PostActionTypes => ({
  type: UNLIKE_POST_REQUEST,
  data,
});

export const removePostRequestAction = (data: number): PostActionTypes => ({
  type: REMOVE_POST_REQUEST,
  data,
});

export const uploadImagesRequestAction = (data: FormData): PostActionTypes => ({
  type: UPLOAD_IMAGES_REQUEST,
  data,
});

export const removeImageAction = (data: number): PostActionTypes => ({
  type: REMOVE_IMAGE,
  data,
});

export const retweetRequestAction = (data: number): PostActionTypes => ({
  type: RETWEET_REQUEST,
  data,
});

export const loadPostsRequestAction = (lastId: number | undefined): PostActionTypes => ({
  type: LOAD_POSTS_REQUEST,
  lastId,
});

// eslint-disable-next-line max-len
const reducer = (state: PostState = initialState, action: PostActionTypes): PostState => produce(state, (draft) => {
  switch (action.type) {
    case REMOVE_IMAGE:
      draft.imagePaths.splice(action.data, 1);
      break;
    case RETWEET_REQUEST:
      draft.retweetLoading = true;
      draft.retweetDone = false;
      draft.retweetError = null;
      break;
    case RETWEET_SUCCESS: {
      draft.retweetLoading = false;
      draft.retweetDone = true;
      break;
    }
    case RETWEET_FAILURE:
      draft.retweetLoading = false;
      draft.retweetError = action.error;
      break;
    case UPLOAD_IMAGES_REQUEST:
      draft.uploadImagesLoading = true;
      draft.uploadImagesDone = false;
      draft.uploadImagesError = null;
      break;
    case UPLOAD_IMAGES_SUCCESS: {
      draft.imagePaths = action.data;
      draft.uploadImagesLoading = false;
      draft.uploadImagesDone = true;
      break;
    }
    case UPLOAD_IMAGES_FAILURE:
      draft.uploadImagesLoading = false;
      draft.uploadImagesError = action.error;
      break;
    case LIKE_POST_REQUEST:
      draft.likePostLoading = true;
      draft.likePostDone = false;
      draft.likePostError = null;
      break;
    case LIKE_POST_SUCCESS: {
      const post = draft.mainPosts.find((v) => v.id === action.data.PostId);
      post?.Likers.push({ id: action.data.UserId });
      draft.likePostLoading = false;
      draft.likePostDone = true;
      break;
    }
    case LIKE_POST_FAILURE:
      draft.likePostLoading = false;
      draft.likePostError = action.error;
      break;
    case UNLIKE_POST_REQUEST:
      draft.unlikePostLoading = true;
      draft.unlikePostDone = false;
      draft.unlikePostError = null;
      break;
    case UNLIKE_POST_SUCCESS: {
      const post = draft.mainPosts.find((v) => v.id === action.data.PostId);
      if (post) {
        const index = post?.Likers.findIndex((v) => v.id === action.data.UserId);
        if (index !== -1) post?.Likers.splice(index, 1);
      }
      draft.unlikePostLoading = false;
      draft.unlikePostDone = true;
      break;
    }
    case UNLIKE_POST_FAILURE:
      draft.unlikePostLoading = false;
      draft.unlikePostError = action.error;
      break;
    case LOAD_POSTS_REQUEST:
      draft.loadPostsLoading = true;
      draft.loadPostsDone = false;
      draft.loadPostsError = null;
      break;
    case LOAD_POSTS_SUCCESS:
      draft.mainPosts = draft.mainPosts.concat(action.data);
      draft.loadPostsLoading = false;
      draft.loadPostsDone = true;
      draft.hasMorePosts = action.data.length === 10;
      break;
    case LOAD_POSTS_FAILURE:
      draft.loadPostsLoading = false;
      draft.loadPostsError = action.error;
      break;
    case ADD_POST_REQUEST:
      draft.addPostLoading = true;
      draft.addPostDone = false;
      draft.addPostError = null;
      break;
    case ADD_POST_SUCCESS:
      draft.mainPosts.unshift(action.data);
      draft.addPostLoading = false;
      draft.addPostDone = true;
      draft.imagePaths = [];
      break;
    case ADD_POST_FAILURE:
      draft.addPostLoading = false;
      draft.addPostError = action.error;
      break;
    case REMOVE_POST_REQUEST:
      draft.removePostLoading = true;
      draft.removePostDone = false;
      draft.removePostError = null;
      break;
    case REMOVE_POST_SUCCESS: {
      const index = draft.mainPosts.findIndex((v) => v.id === action.data.PostId);
      if (index !== -1) draft.mainPosts.splice(index, 1);
      draft.removePostLoading = false;
      draft.removePostDone = true;
      break;
    }
    case REMOVE_POST_FAILURE:
      draft.removePostLoading = false;
      draft.removePostError = action.error;
      break;
    case ADD_COMMENT_REQUEST:
      draft.addCommentLoading = true;
      draft.addCommentDone = false;
      draft.addCommentError = null;
      break;
    case ADD_COMMENT_SUCCESS:
      draft.mainPosts
        .find((v) => v.id === action.data.PostId)
        ?.Comments.unshift(action.data);
      draft.addCommentLoading = false;
      draft.addCommentDone = true;
      break;
    case ADD_COMMENT_FAILURE:
      draft.addCommentLoading = false;
      draft.addCommentError = action.error;
      break;
    default:
      break;
  }
});

export default reducer;
