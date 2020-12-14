import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { addRecipe, deleteRecipe, updateRecipe, loadRecipe } from './recipes';
import { addToCart } from './user';
import { updateFormData } from './form';
import App from '../components/App';
import TopPage from '../components/router/TopPage';

const mapStateToProps = (state) => {
  return {
    recipes: state.firestore.ordered.recipes,
    detailRecipe: state.recipes.pickedRecipe,
    formData: state.formData,
    user: state.user.user,
    cartItems: state.user.cart,
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
    updateRecipe: (recipe) => {
      dispatch(updateRecipe(recipe));
    },
    loadRecipe: (id) => {
      dispatch(loadRecipe(id));
    },
    updateFormData: (data) => {
      dispatch(updateFormData(data));
    },
    addToCart: (data) => {
      dispatch(addToCart(data));
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
)(App);

export default Container;
