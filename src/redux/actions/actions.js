// action types
export const ADD_RECIPE = 'ADD_RECIPE';
export const DELETE_RECIPE = 'DELETE_RECIPE';
export const EDIT_RECIPE = 'EDIT_RECIPE';

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
          type: DELETE_RECIPE,
          id,
        });
      })
      .catch((err) => {
        console.log(err);
      });

    return {
      type: DELETE_RECIPE,
      id,
    };
  };
};

export const editRecipe = (recipe) => {
  return {
    type: EDIT_RECIPE,
    recipe,
  };
};
