export const LOGIN_SUCCESS = 'recipe-app/auth/LOGIN_SUCCESS';
export const LOGIN_ERROR = 'recipe-app/auth/LOGIN_ERROR';
export const LOGOUT_SUCCESS = 'recipe-app/auth/LOGOUT_SUCCESS';
export const LOGOUT_ERROR = 'recipe-app/auth/LOGOUT_ERROR';
export const SIGNUP_SUCCESS = 'recipe-app/auth/SIGNUP_SUCCESS';
export const SIGNUP_ERROR = 'recipe-app/auth/SIGNUP_ERROR';

const initState = {
  authError: null,
};

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      console.log('login success');
      return {
        ...state,
        authError: action.item,
      };
    case LOGIN_ERROR:
      return {
        ...state,
        authError: 'Login failed',
      };
    case LOGOUT_SUCCESS:
      console.log('logout success');
      return {};
    case LOGOUT_ERROR:
      console.log('logout error');
      return {
        ...state,
        authError: 'Logout failed',
      };
    case SIGNUP_SUCCESS:
      console.log('signup success');
      return {};
    case SIGNUP_ERROR:
      console.log('signup error');
      return {
        ...state,
        authError: action.err.message,
      };
    default:
      return state;
  }
};

export default authReducer;

export const logInWithGoogle = () => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();
    firebase
      .login({
        provider: 'google',
        type: 'popup',
      })
      .then((resp) => {
        const { uid, displayName } = resp.user;
        return firestore
          .collection('users')
          .doc(uid)
          .set({ name: displayName });
      })
      .then(() => {
        dispatch({
          type: LOGIN_SUCCESS,
        });
      })
      .catch((err) => {
        dispatch({ type: LOGIN_ERROR });
      });
  };
};

export const signOut = () => {
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

// export const signUpWithGoogle = () => {
//   return (dispatch, getState, { getFirebase }) => {
//     const firebase = getFirebase();
//     firebase
//       .login({
//         provider: 'google',
//         type: 'redirect',
//       })
//       .then(() => {
//         dispatch({ type: LOGIN_SUCCESS });
//       })
//       .catch((err) => {
//         dispatch({ type: LOGIN_ERROR });
//       });
//   };
// };
