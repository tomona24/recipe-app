// action types
export const ADD_RECIPE = 'ADD_RECIPE';
export const DELETE_RECIPE = 'DELETE_RECIPE';
export const EDIT_RECIPE = 'EDIT_RECIPE';
export const CHOOSE_RECIPE = 'CHOOSE_RECIPE';

// action creators
export const addRecipe = (recipe) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    firestore
      .collection('recipes')
      .add(recipe)
      .then(() => {
        dispatch({
          type: ADD_RECIPE,
          recipe,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const deleteRecipe = (id) => {
  return {
    type: DELETE_RECIPE,
    id,
  };
};

export const editRecipe = (recipe) => {
  return {
    type: EDIT_RECIPE,
    recipe,
  };
};

// CHOOSE RECIPE
export const chooseRecipe = (recipe) => {
  return {
    type: CHOOSE_RECIPE,
    recipe,
  };
};
