import { ADD_RECIPE, DELETE_RECIPE, EDIT_RECIPE } from '../actions/actions';
import { data1, data2, data3 } from './sampleData';

const initialRecipes = [data1, data2, data3];

const recipeReducer = (state = initialRecipes, action) => {
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
