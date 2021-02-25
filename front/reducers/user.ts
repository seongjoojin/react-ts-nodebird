const LOG_IN = 'LOG_IN' as const;
const LOG_OUT = 'LOG_OUT' as const;

interface UserState {
  isLoggedIn: boolean;
  user: object | null;
  signUpData: object;
  loginData: object;
}

const initialState: UserState = {
    isLoggedIn: false,
    user: null,
    signUpData: {},
    loginData: {}
  }

export const loginAction = (data: { id: string; password: string }) => ({
  type: LOG_IN,
  payload: data,
});

export const logoutAction = () => ({
  type: LOG_OUT,
});

type UserAction = 
  | ReturnType<typeof loginAction>
  | ReturnType<typeof logoutAction>

const reducer = (state = initialState, action: UserAction) => {
  switch (action.type) {
    case LOG_IN:
      return {
        ...state,
        isLoggedIn: true,
        user: action.payload,
      };
    case LOG_OUT:
      return {
        ...state,
        isLoggedIn: false,
        user: null,
      };
    default:
      return state;
  }
};

export default reducer;