// action types
// reducers
const initialData = [
  { num: 1, recipeId: '9UNJxWToCz2cfFDwMUZf' },
  { num: 2, recipeId: 'djew9ZM1dBTc6GWP5oih' },
];

export const ADD_RECIPE = 'recipe-app/users/ADD_RECIPE';
export const DELETE_RECIPE = 'recipe-app/users/DELETE_RECIPE';
export const UPDATE_RECIPE = 'recipe-app/users/UPDATE_RECIPE';
export const LOAD_RECIPE = 'recipe-app/users/LOAD_RECIPE';

const initialState = {
  cart: initialData,
  user: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_RECIPE:
      return {
        cart: [...state.cart, action.data],
        user: state.user,
      };
    case DELETE_RECIPE:
      return {
        cart: state.cart.filter(
          (data) => data.recipeId !== action.data.recipeId
        ),
        user: state.user,
      };
    case UPDATE_RECIPE:
      return {
        cart: state.cart.map((data) =>
          data.recipeId === action.data.recipeId ? action.data : data
        ),
        user: state.user,
      };
    case LOAD_RECIPE:
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
          type: ADD_RECIPE,
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
          type: DELETE_RECIPE,
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
          type: UPDATE_RECIPE,
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
      .collection('recipes')
      .doc(obj.id)
      .get()
      .then((doc) => {
        if (doc.exists) {
          const data = doc.data();
          dispatch({
            type: LOAD_RECIPE,
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
