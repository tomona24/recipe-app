// action types
// reducers
const initialData = [
  { servingNum: 1, recipeId: '9UNJxWToCz2cfFDwMUZf' },
  { servingNum: 2, recipeId: 'djew9ZM1dBTc6GWP5oih' },
];

export const ADD_TO_CART = 'recipe-app/users/ADD_TO_CART';
export const DELETE_FROM_CART = 'recipe-app/users/DELETE_FROM_CART';
export const UPDATE_IN_CART = 'recipe-app/users/UPDATE_IN_CART';
export const LOAD_IN_CART = 'recipe-app/users/LOAD_IN_CART';

const initialState = {
  cart: initialData,
  user: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      return {
        cart: [...state.cart, action.data],
        user: state.user,
      };
    case DELETE_FROM_CART:
      return {
        cart: state.cart.filter(
          (data) => data.recipeId !== action.data.recipeId
        ),
        user: state.user,
      };
    case UPDATE_IN_CART:
      return {
        cart: state.cart.map((data) =>
          data.recipeId === action.data.recipeId ? action.data : data
        ),
        user: state.user,
      };
    case LOAD_IN_CART:
      return {
        cart: action.data,
        user: state.user,
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
    firestore
      .collection('users')
      .doc('g14fhWPDTpxP0evHETKT')
      .collection('cart')
      .add(data)
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

export const updateInCart = (data) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    firestore
      .collection('users')
      .doc('g14fhWPDTpxP0evHETKT')
      .collection('cart')
      .doc(data.recipe.id)
      .set({
        num: data.num,
      })
      .then(() => {
        dispatch({
          type: UPDATE_IN_CART,
          data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

// obj has 'id' or 'recipe', and 'needFetch'
export const loadInCart = (obj) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    firestore
      .collection('users')
      .doc('g14fhWPDTpxP0evHETKT')
      .collection('cart')
      .get()
      .then((doc) => {
        if (doc.exists) {
          const data = doc.data();
          dispatch({
            type: LOAD_IN_CART,
            data,
          });
        } else {
          console.log('No such document!');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
