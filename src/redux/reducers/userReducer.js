import { combineReducers } from 'redux';
import { firestoreReducer } from 'redux-firestore';
import {
  ADD_RECIPE,
  DELETE_RECIPE,
  EDIT_RECIPE,
  PICK_RECIPE,
} from '../actions/actions';
import { data1, data2, data3 } from './sampleData';

const initialState = {
  recipes: [data1, data2, data3],
  pickedRecipe: null,
};

const recipes = (state = initialState.recipes, action) => {
  switch (action.type) {
    case ADD_RECIPE:
      return [...state, action.recipe];
    case DELETE_RECIPE:
      return state.filter((recipe) => recipe.id !== action.id);
    case EDIT_RECIPE:
      return state.map((recipe) =>
        recipe.id === action.recipe.id ? action.recipe : recipe
      );
    default:
      return state;
  }
};

const pickedRecipe = (state = initialState.pickedRecipe, action) => {
  switch (action.type) {
    case PICK_RECIPE:
      return action.id;
    default:
      return state;
  }
};

const userReducer = combineReducers({
  recipes,
  pickedRecipe,
  firestore: firestoreReducer,
});

export default userReducer;
