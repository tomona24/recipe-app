// action types
// reducers
const initialData = [{}];

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
        cart: state.cart.filter(
          (data) => data.recipe.id !== action.data.recipe.id
        ),
      };
    default:
      return state;
  }
};
export default userReducer;

// action creators
export const addToCart = (data) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    const authorId = getState().firebase.auth.uid;
    firestore
      .collection('users')
      .doc(authorId)
      .collection('cart')
      .doc(data.recipe.id)
      .set(data)
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

export const deleteFromCart = (id) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    firestore
      .collection('users')
      .doc('g14fhWPDTpxP0evHETKT')
      .collection('cart')
      .doc(id)
      .delete()
      .then(() => {
        dispatch({
          type: DELETE_FROM_CART,
          id,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
