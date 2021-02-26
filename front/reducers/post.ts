const ADD_POST = 'ADD_POST' as const;
export interface IMainPost {
  id: number;
  User: {
    id: number;
    nickname: string;
  };
  content: string;
  Images: Array<{ src: string }>;
  Comments: Array<{ User: { nickname: string }; content: string}>;
}
interface PostState {
  mainPosts: IMainPost[];
  imagePaths: string[];
  postAdded: boolean;
}

const initialState: PostState = {
  mainPosts: [
    {
      id: 1,
      User: {
        id: 1,
        nickname: 'evanjin',
      },
      content: '첫 번째 게시글',
      Images: [
        { src: 'https://gimg.gilbut.co.kr/book/BN002045/rn_view_BN002045.jpg' },
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
  postAdded: false,
};

export const addPost = () => ({
  type: ADD_POST,
});

const dummyPost = {
  id: 2,
  content: '더미데이터입니다.',
  User: {
    id: 1,
    nickname: '제로초'
  },
  Images: [],
  Comments: []
} 

type PostAction = ReturnType<typeof addPost>;

const reducer = (state = initialState, action: PostAction) => {
  switch (action.type) {
    case ADD_POST:
      return {
        ...state,
        mainPosts: [dummyPost, ...state.mainPosts],
        postAdded: true,
      };
    default:
      return state;
  }
};

export default reducer;
