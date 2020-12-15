export const LOGIN_SUCCESS = 'recipe-app/auth/LOGIN_SUCCESS';
export const LOGIN_ERROR = 'recipe-app/auth/LOGIN_ERROR';
export const LOGOUT_SUCCESS = 'recipe-app/auth/LOGOUT_SUCCESS';
export const LOGOUT_ERROR = 'recipe-app/auth/LOGOUT_ERROR';

const initState = {
  authError: null,
};

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      console.log('login success');
      return {
        ...state,
        authError: null,
      };
    case 'LOGIN_ERROR':
      console.log('login error');
      return {
        ...state,
        authError: 'Login failed',
      };
    case 'LOGOUT_SUCCESS':
      console.log('logout success');
      return {};
    case 'LOGOUT_ERROR':
      console.log('logout error');
      return {
        ...state,
        authError: 'Logout failed',
      };
    default:
      return state;
  }
};

export default authReducer;

export const logInWithGoogle = () => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    firebase
      .login({
        provider: 'google',
        type: 'redirect',
      })
      .then(() => {
        dispatch({ type: LOGIN_SUCCESS });
      })
      .catch((err) => {
        dispatch({ type: LOGIN_ERROR });
      });
    // firebase
    //   .auth()
    //   .(credentials.email, credentials.password)
    //   .then(() => {
    //     dispatch({ type: LOGIN_SUCCESS });
    //   })
    //   .catch((err) => {
    //     dispatch({ type: LOGIN_ERROR });
    //   });
  };
};

export const logOut = () => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    firebase
      .logout()
      .then(() => {
        dispatch({ type: LOGOUT_SUCCESS });
      })
      .catch((err) => {
        dispatch({ type: LOGOUT_ERROR });
      });
  };
};
