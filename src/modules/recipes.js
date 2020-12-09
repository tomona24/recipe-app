// action types
export const CREATE = 'recipe-app/recipes/CREATE';
export const DELETE = 'recipe-app/recipes/DELETE';
export const UPDATE = 'recipe-app/recipes/UPDATE';

// reducers
import { data1, data2, data3 } from './sampleData';

const initialState = {
  recipes: [data1, data2, data3],
  pickedRecipe: null,
};

const recipesReducer = (state = initialState.recipes, action) => {
  switch (action.type) {
    case CREATE:
      return [...state, action.recipe];
    case DELETE:
      return state.filter((recipe) => recipe.id !== action.id);
    case UPDATE:
      return state.map((recipe) =>
        recipe.id === action.recipe.id ? action.recipe : recipe
      );
    default:
      return state;
  }
};
export default recipesReducer;

// action creators
export const addRecipe = (recipe) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    firestore
      .collection('recipes')
      .add(recipe)
      .then(() => {
        dispatch({
          type: CREATE,
          recipe,
        });
      })
      .catch((err) => {
        console.log(err);
      });
    // firestore
    //   .collection('recipes')
    //   .add(recipe)
    //   .then((docRef) => {
    //     const userData = firestore
    //       .collection('users')
    //       .doc('g14fhWPDTpxP0evHETKT')
    //       .collection('myRecipes')
    //       .doc(docRef.id)
    //       .set({
    //         recipeId: docRef.id,
    //         memo: '',
    //         star: null,
    //       })
    //       .then(() => {
    //         dispatch({
    //           type: ADD_RECIPE,
    //           recipe,
    //         });
    //       })
    //       .catch((err) => {
    //         console.log(err);
    //       });
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  };
};

export const deleteRecipe = (id) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    firestore
      .collection('recipes')
      .doc(id)
      .delete()
      .then(() => {
        dispatch({
          type: DELETE,
          id,
        });
      })
      .catch((err) => {
        console.log(err);
      });

    return {
      type: DELETE,
      id,
    };
  };
};

export const editRecipe = (recipe) => {
  return {
    type: UPDATE,
    recipe,
  };
};
