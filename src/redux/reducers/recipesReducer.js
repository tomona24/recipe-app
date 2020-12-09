import { combineReducers } from 'redux';
import { firestoreReducer } from 'redux-firestore';
import { ADD_RECIPE, DELETE_RECIPE, EDIT_RECIPE } from '../actions/actions';
import { data1, data2, data3 } from './sampleData';

const initialState = {
  recipes: [data1, data2, data3],
  pickedRecipe: null,
};

const recipeReducer = (state = initialState.recipes, action) => {
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

export default recipeReducer;
