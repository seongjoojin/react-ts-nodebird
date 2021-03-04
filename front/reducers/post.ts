import { nanoid } from 'nanoid';

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

export interface AddPostRequestAction {
  type: typeof ADD_POST_REQUEST;
  data: { id: string; content: string };
}

export interface AddPostSuccessAction {
  type: typeof ADD_POST_SUCCESS
  data: { id: string; content: string; }
}

export interface AddPostFailureAction {
  type: typeof ADD_POST_FAILURE,
  error: object
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
  error: object;
}

export interface AddCommentRequestAction {
  type: typeof ADD_COMMENT_REQUEST
  data: { content: string, postId: number, userId: number }
}

export interface AddCommentSuccessAction {
  type: typeof ADD_COMMENT_SUCCESS;
  data: { content: string; postId: string; userId: number };
}

export interface AddCommentFailureAction {
  type: typeof ADD_COMMENT_FAILURE,
  error: object
}

type PostActionTypes =
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
  id: string;
  User: {
    id: string;
    nickname: string;
  };
  content: string;
  Images: Array<{ id: string; src: string }>;
  Comments: Array<{
    id: string;
    User: { id: string; nickname: string };
    content: string;
  }>;
}

interface PostState {
  mainPosts: IMainPost[];
  imagePaths: string[];
  addPostLoading: boolean;
  addPostDone: boolean;
  addPostError: object | null;
  removePostLoading: boolean;
  removePostDone: boolean;
  removePostError: object | null;
  addCommentLoading: boolean;
  addCommentDone: boolean;
  addCommentError: object | null;
}

const initialState: PostState = {
  mainPosts: [
    {
      id: '1',
      User: {
        id: '1',
        nickname: 'evanjin',
      },
      content: '첫 번째 게시글 #게시글 #익스프레스',
      Images: [
        { id: nanoid(), src: 'https://thebook.io/img/covers/cover_080229.jpg' },
        { id: nanoid(), src: 'https://thebook.io/img/covers/cover_006934.jpg' },
        { id: nanoid(), src: 'https://thebook.io/img/covers/cover_080203.jpg' },
      ],
      Comments: [
        {
          id: nanoid(),
          User: {
            id: nanoid(),
            nickname: 'nero',
          },
          content: '우와 개정판이 나왔어요.',
        },
        {
          id: nanoid(),
          User: {
            id: nanoid(),
            nickname: 'hero',
          },
          content: '얼른 사고싶어요.',
        },
      ],
    },
  ],
  imagePaths: [],
  addPostLoading: false,
  addPostDone: false,
  addPostError: null,
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

const dummyPost = (data: { id: string; content: string; }) => ({
  id: data.id,
  content: data.content,
  User: {
    id: '1',
    nickname: '제로초',
  },
  Images: [],
  Comments: [],
});

const dummyComment = (data: string) => ({
  id: nanoid(),
  content: data,
  User: {
    id: '1',
    nickname: '제로초',
  },
});

const reducer = (state: PostState = initialState, action: PostActionTypes): PostState => {
  switch (action.type) {
    case ADD_POST_REQUEST:
      return {
        ...state,
        addPostLoading: true,
        addPostDone: false,
        addPostError: null,
      };
    case ADD_POST_SUCCESS:
      return {
        ...state,
        mainPosts: [dummyPost(action.data), ...state.mainPosts],
        addPostLoading: false,
        addPostDone: true,
      };
    case ADD_POST_FAILURE:
      return {
        ...state,
        addPostLoading: false,
        addPostError: action.error,
      };
    case REMOVE_POST_REQUEST:
      return {
        ...state,
        removePostLoading: true,
        removePostDone: false,
        removePostError: null,
      };
    case REMOVE_POST_SUCCESS:
      return {
        ...state,
        mainPosts: state.mainPosts.filter((v) => v.id !== action.data),
        removePostLoading: false,
        removePostDone: true,
      };
    case REMOVE_POST_FAILURE:
      return {
        ...state,
        removePostLoading: false,
        removePostError: action.error,
      };
    case ADD_COMMENT_REQUEST:
      return {
        ...state,
        addCommentLoading: true,
        addCommentDone: false,
        addCommentError: null,
      };
    case ADD_COMMENT_SUCCESS: {
      const postIndex = state.mainPosts.findIndex(
        (v) => v.id === action.data.postId,
      );
      const post = { ...state.mainPosts[postIndex] };
      post.Comments = [dummyComment(action.data.content), ...post.Comments];
      const mainPosts = [...state.mainPosts];
      mainPosts[postIndex] = post;
      return {
        ...state,
        mainPosts,
        addCommentLoading: false,
        addCommentDone: true,
      };
    }
    case ADD_COMMENT_FAILURE:
      return {
        ...state,
        addCommentLoading: false,
        addCommentError: action.error,
      };
    default:
      return state;
  }
};

export default reducer;
