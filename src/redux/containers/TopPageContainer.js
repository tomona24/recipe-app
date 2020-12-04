import { connect } from 'react-redux';
import {
  addRecipe,
  deleteRecipe,
  editRecipe,
  chooseRecipe,
} from '../actions/actions';
import TopPage from '../../components/router/TopPage';

const mapStateToProps = (state) => {
  return {
    recipes: state.recipes,
    firestore: state.firestore,
    chosenRecipe: state.chosenRecipe,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addNewRecipe: (recipe) => {
      dispatch(addRecipe(recipe));
    },
    deletechosenRecipe: (id) => {
      dispatch(deleteRecipe(id));
    },
    editRecipe: (recipe) => {
      dispatch(editRecipe(recipe));
    },
    chooseRecipe: (recipe) => {
      dispatch(chooseRecipe(recipe));
    },
  };
};

const TopPageContainer = connect(mapStateToProps, mapDispatchToProps)(TopPage);

export default TopPageContainer;
