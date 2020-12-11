import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { addRecipe, deleteRecipe, editRecipe, loadRecipe } from './recipes';
import { updateFormData } from './form';
import TopPage from '../components/router/TopPage';

const mapStateToProps = (state) => {
  return {
    recipes: state.firestore.ordered.recipes,
    detailRecipe: state.recipes.pickedRecipe,
    formData: state.formData,
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
    loadRecipe: (id) => {
      dispatch(loadRecipe(id));
    },
    updateFormData: (data) => {
      dispatch(updateFormData(data));
    },
  };
};

const Container = compose(
  firestoreConnect([
    {
      collection: 'recipes',
      where: ['user', '==', 'g14fhWPDTpxP0evHETKT'],
    },
    {
      collection: 'users',
    },
  ]),
  connect(mapStateToProps, mapDispatchToProps)
)(TopPage);

export default Container;
