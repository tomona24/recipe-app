// action types
// reducers
import { data1, data2, data3 } from './sampleData';

export const CREATE = 'recipe-app/recipes/CREATE';
export const DELETE = 'recipe-app/recipes/DELETE';
export const UPDATE = 'recipe-app/recipes/UPDATE';
export const LOAD = 'recipe-app/recipes/UPDATE';

const initialState = {
  recipes: [data1, data2, data3],
  pickedRecipe: null,
};

const recipesReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE:
      return {
        recipes: [...state.recipes, action.recipe],
        pickedRecipe: state.pickedRecipe,
      };
    case DELETE:
      return {
        recipes: state.recipes.filter((recipe) => recipe.id !== action.id),
        pickedRecipe: state.pickedRecipe,
      };
    case LOAD:
      return {
        recipes: state.recipes,
        pickedRecipe: action.recipe,
      };
    case UPDATE:
      return {
        recipes: state.recipes.map((recipe) =>
          recipe.id === action.recipe.id ? action.recipe : recipe
        ),
        pickedRecipe: state.pickedRecipe,
      };

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

export const updateRecipe = (recipe) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    firestore
      .collection('recipes')
      .doc(recipe.id)
      .set(recipe)
      .then(() => {
        dispatch({
          type: UPDATE,
          recipe,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

// obj has 'id' or 'recipe', and 'needFetch'
export const loadRecipe = (obj) => {
  if (obj.needFetch) {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
      const firestore = getFirestore();
      firestore
        .collection('recipes')
        .doc(obj.id)
        .get()
        .then((doc) => {
          if (doc.exists) {
            const recipe = doc.data();
            dispatch({
              type: LOAD,
              recipe,
            });
          } else {
            console.log('No such document!');
          }
        })
        .catch((err) => {
          console.log(err);
        });
    };
  }
  return {
    type: LOAD,
    recipe: obj.recipe,
  };
};
