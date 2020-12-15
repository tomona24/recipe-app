import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { addRecipe, deleteRecipe, updateRecipe, loadRecipe } from './recipes';
import { addToCart, deleteFromCart } from './user';
import { updateFormData } from './form';
import App from '../components/App';
import TopPage from '../components/router/TopPage';

const mapStateToProps = (state) => {
  return {
    recipes: state.firestore.ordered.recipes,
    detailRecipe: state.recipes.pickedRecipe,
    formData: state.formData,
    user: state.firestore.ordered.recipes,
    cartItems: state.firestore.ordered.cart,
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
    deleteFromCart: (data) => {
      dispatch(deleteFromCart(data));
    },
  };
};

const Container = compose(
  firestoreConnect(({ uid }) => {
    return [
      {
        collection: 'recipes',
        where: ['user', '==', uid],
      },
      {
        collection: 'users',
        doc: uid,
        subcollections: [{ collection: 'cart' }],
        storeAs: `cart`,
      },
    ];
  }),
  connect(mapStateToProps, mapDispatchToProps)
)(App);

export default Container;
