import { connect } from 'react-redux';
import { compose } from 'redux';
import { firebaseConnect } from 'react-redux-firebase';
import {
  addRecipe,
  deleteRecipe,
  editRecipe,
  pickRecipe,
} from '../actions/actions';
import TopPage from '../../components/router/TopPage';

const mapStateToProps = (state) => {
  console.log(state);
  return {
    recipes: state.recipes,
    firestore: state.firestore.ordered.recipes,
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
  firebaseConnect([{ collection: 'recipes' }]),
  connect(mapStateToProps, mapDispatchToProps)
)(TopPage);

export default TopPageContainer;
