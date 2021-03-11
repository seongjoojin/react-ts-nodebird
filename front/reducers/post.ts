import { nanoid } from 'nanoid';
import produce from 'immer';
import faker from 'faker';

export const LOAD_POSTS_REQUEST = 'LOAD_POSTS_REQUEST';
export const LOAD_POSTS_SUCCESS = 'LOAD_POSTS_SUCCESS';
export const LOAD_POSTS_FAILURE = 'LOAD_POSTS_FAILURE';

export const ADD_POST_REQUEST = 'ADD_POST_REQUEST';
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE';

export const REMOVE_POST_REQUEST = 'REMOVE_POST_REQUEST';
export const REMOVE_POST_SUCCESS = 'REMOVE_POST_SUCCESS';
export const REMOVE_POST_FAILURE = 'REMOVE_POST_FAILURE';

export const ADD_COMMENT_REQUEST = 'ADD_COMMENT_REQUEST';
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS';
export const ADD_COMMENT_FAILURE = 'ADD_COMMENT_FAILURE';

export interface LoadPostRequestAction {
  type: typeof LOAD_POSTS_REQUEST;
}

export interface LoadPostSuccessAction {
  type: typeof LOAD_POSTS_SUCCESS;
  data: IMainPost[];
}

export interface LoadPostFailureAction {
  type: typeof LOAD_POSTS_FAILURE;
  error: string;
}

export interface AddPostRequestAction {
  type: typeof ADD_POST_REQUEST;
  data: string ;
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
  data: string
}

export interface RemovePostSuccessAction {
  type: typeof REMOVE_POST_SUCCESS;
  data: string;
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
  data: { PostId: string, User: { id: string, nickname: string }, content: string };
}

export interface AddCommentFailureAction {
  type: typeof ADD_COMMENT_FAILURE,
  error: string
}

type PostActionTypes =
  | LoadPostRequestAction
  | LoadPostSuccessAction
  | LoadPostFailureAction
  | AddPostRequestAction
  | AddPostSuccessAction
  | AddPostFailureAction
  | AddCommentRequestAction
  | AddCommentSuccessAction
  | AddCommentFailureAction
  | RemovePostRequestAction
  | RemovePostSuccessAction
  | RemovePostFailureAction;

export interface IMainPost {
  id: number;
  User: {
    id: number;
    nickname: string;
  };
  content: string;
  Images: Array<{ id: string; src: string }>;
  Comments: Array<{
    id: string;
    User: { id: string; nickname: string };
    content: string;
  }>;
  RetweetId: number | null;
  createdAt: string;
  updatedAt: string;
}

interface PostState {
  mainPosts: IMainPost[];
  imagePaths: string[];
  hasMorePosts: boolean;
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
}

const initialState: PostState = {
  mainPosts: [],
  imagePaths: [],
  hasMorePosts: true,
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
};

export const addPostRequestAction = (data: string) => ({
  type: ADD_POST_REQUEST,
  data,
});

export const addCommentRequestAction = (data: {
  content: string, postId: number, userId: string | undefined
}) => ({
  type: ADD_COMMENT_REQUEST,
  data,
});

export const generateDummyPost = (number: number) => Array(number)
  .fill('')
  .map(() => ({
    id: nanoid(),
    User: {
      id: nanoid(),
      nickname: faker.name.findName(),
    },
    content: faker.lorem.paragraph(),
    Images: [
      {
        id: nanoid(),
        src: faker.image.image(),
      },
    ],
    Comments: [
      {
        id: nanoid(),
        User: {
          id: nanoid(),
          nickname: faker.name.findName(),
        },
        content: faker.lorem.sentences(),
      },
    ],
  }));

// eslint-disable-next-line max-len
const reducer = (state: PostState = initialState, action: PostActionTypes): PostState => produce(state, (draft) => {
  switch (action.type) {
    case LOAD_POSTS_REQUEST:
      draft.loadPostsLoading = true;
      draft.loadPostsDone = false;
      draft.loadPostsError = null;
      break;
    case LOAD_POSTS_SUCCESS:
      draft.mainPosts = action.data.concat(draft.mainPosts);
      draft.loadPostsLoading = false;
      draft.loadPostsDone = true;
      draft.hasMorePosts = draft.mainPosts.length < 50;
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
    case REMOVE_POST_SUCCESS:
      draft.mainPosts = draft.mainPosts.filter((v) => v.id !== action.data);
      draft.removePostLoading = false;
      draft.removePostDone = true;
      break;
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
