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

interface AddPostRequestAction {
  type: typeof ADD_POST_REQUEST
  data: string
}

interface AddPostSuccessAction {
  type: typeof ADD_POST_SUCCESS
  data: IMainPost[]
}

interface AddPostFailureAction {
  type: typeof ADD_POST_FAILURE,
  error: object
}

interface AddCommentRequestAction {
  type: typeof ADD_COMMENT_REQUEST
  data: { content: string, postId: number, userId: string | undefined }
}

interface AddCommentSuccessAction {
  type: typeof ADD_COMMENT_SUCCESS
}

interface AddCommentFailureAction {
  type: typeof ADD_COMMENT_FAILURE,
  error: object
}

type PostActionTypes =
  | AddPostRequestAction
  | AddPostSuccessAction
  | AddPostFailureAction
  | AddCommentRequestAction
  | AddCommentSuccessAction
  | AddCommentFailureAction;

export interface IMainPost {
  id: number;
  User: {
    id: number;
    nickname: string;
  };
  content: string;
  Images: Array<{ src: string }>;
  Comments: Array<{ User: { nickname: string }; content: string }>;
}

interface PostState {
  mainPosts: IMainPost[];
  imagePaths: string[];
  addPostLoading: boolean;
  addPostDone: boolean;
  addPostError: object | null;
  addCommentLoading: boolean,
  addCommentDone: boolean,
  addCommentError: object | null,
}

const initialState: PostState = {
  mainPosts: [
    {
      id: 1,
      User: {
        id: 1,
        nickname: 'evanjin',
      },
      content: '첫 번째 게시글 #게시글 #익스프레스',
      Images: [
        { src: 'https://thebook.io/img/covers/cover_080229.jpg' },
        { src: 'https://thebook.io/img/covers/cover_006934.jpg' },
        { src: 'https://thebook.io/img/covers/cover_080203.jpg' },
      ],
      Comments: [
        {
          User: {
            nickname: 'nero',
          },
          content: '우와 개정판이 나왔어요.',
        },
        {
          User: {
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

const dummyPost = {
  id: 2,
  content: '더미데이터입니다.',
  User: {
    id: 1,
    nickname: '제로초',
  },
  Images: [],
  Comments: [],
};

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
        mainPosts: [dummyPost, ...state.mainPosts],
        addPostLoading: false,
        addPostDone: true,
      };
    case ADD_POST_FAILURE:
      return {
        ...state,
        addPostLoading: false,
        addPostError: action.error,
      };
    case ADD_COMMENT_REQUEST:
      return {
        ...state,
        addCommentLoading: true,
        addCommentDone: false,
        addCommentError: null,
      };
    case ADD_COMMENT_SUCCESS:
      return {
        ...state,
        addCommentLoading: false,
        addCommentDone: true,
      };
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
