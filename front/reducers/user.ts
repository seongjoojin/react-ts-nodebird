export const LOG_IN_REQUEST = 'LOG_IN_REQUEST';
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';
export const LOG_IN_FAILURE = 'LOG_IN_FAILURE';

export const LOG_OUT_REQUEST = 'LOG_OUT_REQUEST';
export const LOG_OUT_SUCCESS = 'LOG_OUT_SUCCESS';
export const LOG_OUT_FAILURE = 'LOG_OUT_FAILURE';

interface IMe {
  id: string;
  password?: string;
  nickname?: string;
}

export interface LoginRequestAction {
  type: typeof LOG_IN_REQUEST
  payload: IMe
}

interface LoginSuccessAction {
  type: typeof LOG_IN_SUCCESS
  payload: IMe
}

interface LoginFailureAction {
  type: typeof LOG_IN_FAILURE
}

interface LogoutRequestAction {
  type: typeof LOG_OUT_REQUEST
}

interface LogoutSuccessAction {
  type: typeof LOG_OUT_SUCCESS
}

interface LogoutFailureAction {
  type: typeof LOG_OUT_FAILURE
}

export type UserActionTypes =
  | LoginSuccessAction
  | LoginFailureAction
  | LoginRequestAction
  | LogoutRequestAction
  | LogoutSuccessAction
  | LogoutFailureAction

interface UserState {
  isLoggingIn: boolean; // 로그인 시도중
  isLoggedIn: boolean;
  isLoggingOut: boolean; // 로그아웃 시도중
  me: IMe | null;
  signUpData: object;
  loginData: object;
}

const initialState: UserState = {
  isLoggingIn: false,
  isLoggingOut: false,
  isLoggedIn: false,
  me: null,
  signUpData: {},
  loginData: {}
};

export const loginRequestAction = (data: IMe): UserActionTypes => ({
  type: LOG_IN_REQUEST,
  payload: data,
});


export const logoutRequestAction = (): UserActionTypes => ({
  type: LOG_OUT_REQUEST,
});

const reducer = (state: UserState = initialState, action: UserActionTypes): UserState => {
  switch (action.type) {
    case LOG_IN_REQUEST:
      return {
        ...state,
        isLoggingIn: true,
      };
    case LOG_IN_SUCCESS:
      return {
        ...state,
        isLoggingIn: false,
        isLoggedIn: true,
        me: {...action.payload, nickname: 'evanjin'},
      };
    case LOG_IN_FAILURE:
      return {
        ...state,
        isLoggingIn: false,
        isLoggedIn: false
      };
    case LOG_OUT_REQUEST:
      return {
        ...state,
        isLoggingOut: true,
      };
    case LOG_OUT_SUCCESS:
      return {
        ...state,
        isLoggedIn: false,
        isLoggingOut: false,
        me: null,
      };
    case LOG_OUT_FAILURE:
      return {
        ...state,
        isLoggingOut: false,
      };
    default:
      return state;
  }
};

export default reducer;