import { connect } from 'react-redux';
import { addRecipe, deleteRecipe, editRecipe } from '../actions/actions';
import App from '../../components/App';

const mapStateToProps = (state) => {
  return {
    recipes: state,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addNewRecipe: (recipe) => {
      dispatch(addRecipe(recipe));
    },
    deleteChosenRecipe: (recipe) => {
      dispatch(deleteRecipe(recipe));
    },
    editRecipe: (recipe) => {
      dispatch(editRecipe(recipe));
    },
  };
};

const RecipeContainer = connect(mapStateToProps, mapDispatchToProps)(App);

export default RecipeContainer;
