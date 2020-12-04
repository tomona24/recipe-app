import { combineReducers } from 'redux';
import { firestoreReducer } from 'redux-firestore';
import {
  ADD_RECIPE,
  DELETE_RECIPE,
  EDIT_RECIPE,
  CHOOSE_RECIPE,
} from '../actions/actions';
import { data1, data2, data3 } from './sampleData';

const initialState = {
  recipes: [data1, data2, data3],
  chosenRecipes: null,
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

const chosenRecipe = (state = initialState.chosenRecipes, action) => {
  switch (action.type) {
    case CHOOSE_RECIPE:
      return action.recipe;
    default:
      return state;
  }
};

const recipeReducer = combineReducers({
  recipes,
  chosenRecipe,
  firestore: firestoreReducer,
});

export default recipeReducer;
