import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import {
  addRecipe,
  deleteRecipe,
  editRecipe,
  pickRecipe,
} from '../actions/actions';
import TopPage from '../../components/router/TopPage';

const mapStateToProps = (state) => {
  return {
    recipes: state.recipes,
    firestoreRecipes: state.firestore.data.recipes,
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
    pickRecipe: (recipe) => {
      dispatch(pickRecipe(recipe));
    },
  };
};

const TopPageContainer = compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([{ collection: 'recipes' }])
)(TopPage);

export default TopPageContainer;
