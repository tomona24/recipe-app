// action types
// reducers
import { data1, data2, data3 } from './sampleData';

export const CREATE = 'recipe-app/recipes/CREATE';
export const DELETE = 'recipe-app/recipes/DELETE';
export const UPDATE = 'recipe-app/recipes/UPDATE';
export const LOAD = 'recipe-app/recipes/LOAD';

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
    case UPDATE:
      return {
        recipes: state.recipes.map((recipe) =>
          recipe.id === action.recipe.id ? action.recipe : recipe
        ),
        pickedRecipe: state.pickedRecipe,
      };
    case LOAD:
      return {
        recipes: state.recipes,
        pickedRecipe: action.recipe,
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
    const authorId = getState().firebase.auth.uid;
    firestore
      .collection('recipes')
      .add({
        ...recipe,
        user: authorId,
        createdDate: new Date(),
        updatedDate: new Date(),
      })
      .then(() => {
        dispatch({
          type: CREATE,
          recipe,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const deleteRecipe = (id) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestrage = getFirebase().storage();
    const firestore = getFirestore();
    const imageId = getState().firestore.data.recipes[id].images[0].id;
    firestore
      .collection('recipes')
      .doc(id)
      .delete()
      .then(() => {
        firestrage.ref('uploadedRecipeImages').child(imageId).delete();
      })
      .then(() => {
        dispatch({
          type: DELETE,
          id,
        });
      })

      .catch((err) => {
        console.log(err);
      });
  };
};

export const updateRecipe = (recipe) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    const authorId = getState().firebase.auth.uid;
    firestore
      .collection('recipes')
      .doc(recipe.id)
      .set({ ...recipe, user: authorId, updatedDate: new Date() })
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
};
