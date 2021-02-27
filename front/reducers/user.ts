const LOG_IN = 'LOG_IN' as const;
const LOG_OUT = 'LOG_OUT' as const;

interface IMe {
  id: number;
  password: string;
}

interface UserState {
  isLoggedIn: boolean;
  me: IMe | null;
  signUpData: object;
  loginData: object;
}

const initialState: UserState = {
  isLoggedIn: false,
  me: null,
  signUpData: {},
  loginData: {}
};

export const loginAction = (data: IMe) => ({
  type: LOG_IN,
  payload: data,
});

export const logoutAction = () => ({
  type: LOG_OUT,
});

type UserAction = 
  | ReturnType<typeof loginAction>
  | ReturnType<typeof logoutAction>

const reducer = (state: UserState = initialState, action: UserAction): UserState => {
  switch (action.type) {
    case LOG_IN:
      return {
        ...state,
        isLoggedIn: true,
        me: action.payload,
      };
    case LOG_OUT:
      return {
        ...state,
        isLoggedIn: false,
        me: null,
      };
    default:
      return state;
  }
};

export default reducer;