// action types
// reducers
const initialData = [{ recipe: null, id: null }];

export const ADD_TO_CART = 'recipe-app/users/ADD_TO_CART';
export const DELETE_FROM_CART = 'recipe-app/users/DELETE_FROM_CART';

const initialState = {
  cart: initialData,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      return {
        cart: [...state.cart, action.data],
      };
    case DELETE_FROM_CART:
      return {
        ...state,
      };
    default:
      return state;
  }
};
export default userReducer;

// action creators
export const addToCart = (data) => {
  return (dispatch, getState, getFirebase) => {
    const firestore = getFirebase().firestore();
    const authorId = getState().firebase.auth.uid;
    firestore
      .collection('users')
      .doc(authorId)
      .update({
        cart: firestore.FieldValue.arrayUnion(data),
      })
      .then(() => {
        dispatch({
          type: ADD_TO_CART,
          data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const deleteFromCart = (data) => {
  return (dispatch, getState, getFirebase) => {
    const firestore = getFirebase().firestore();
    const authorId = getState().firebase.auth.uid;
    firestore
      .collection('users')
      .doc(authorId)
      .update({
        cart: firestore.FieldValue.arrayRemove(data),
      })
      .then(() => {
        dispatch({
          type: DELETE_FROM_CART,
          data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
