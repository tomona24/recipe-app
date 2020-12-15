import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import Create from './Create';
import Detail from './Detail';
import Index from './Index';
import Page404 from './Page404';
import Cart from './Cart';
import Header from '../organisms/Header';
import Footer from '../organisms/Footer';
import LogIn from '../molecules/LogIn';
import {
  addRecipe,
  deleteRecipe,
  updateRecipe,
  loadRecipe,
} from '../../modules/recipes';
import { addToCart, deleteFromCart } from '../../modules/user';
import { updateFormData } from '../../modules/form';

const useStyles = makeStyles((theme) => ({
  toolbar: theme.mixins.toolbar,
}));

const TopPage = (props) => {
  const {
    t,
    recipes,
    addNewRecipe,
    deletechosenRecipe,
    updateCurrentRecipe,
    loadChosenRecipe,
    detailRecipe,
    updateFormInput,
    cartItems,
    addRecipeToCart,
    deleteRecipeFromCart,
    setLang,
    lang,
    uid,
    authenticated,
    authenticating,
  } = props;
  const classes = useStyles();

  if (authenticating || !authenticated) {
    return (
      <Router>
        <CssBaseline />
        <Header
          t={t}
          setLang={setLang}
          lang={lang}
          cartItems={[]}
          authenticated={authenticated}
          authenticating={authenticating}
        />
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <LogIn
                t={t}
                recipes={recipes}
                loadRecipe={loadChosenRecipe}
                deletechosenRecipe={deletechosenRecipe}
                addToCart={addRecipeToCart}
              />
            )}
          />
        </Switch>
      </Router>
    );
  }

  if (authenticating || !authenticated) {
    return (
      <>
        {/* */}
        <CssBaseline />
        <Header
          t={t}
          setLang={setLang}
          lang={lang}
          cartItems={cartItems}
          authenticated={authenticated}
          authenticating={authenticating}
        />
        ログイン街
        {/* <div className={classes.toolbar}>
            <Switch>
              <Route
                exact
                path="/"
                render={() => (
                  <Index
                    t={t}
                    recipes={recipes}
                    loadRecipe={loadChosenRecipe}
                    deletechosenRecipe={deletechosenRecipe}
                    addToCart={addRecipeToCart}
                  />
                )}
              />
              <Route
                path="/cart"
                render={({ match }) => (
                  <Cart
                    t={t}
                    cartItems={cartItems}
                    loadRecipe={loadChosenRecipe}
                    detailRecipe={detailRecipe}
                    deletechosenRecipe={deletechosenRecipe}
                    deleteFromCart={deleteRecipeFromCart}
                  />
                )}
              />
              <Route
                path="/create"
                render={({ match }) => (
                  <Create
                    t={t}
                    addNewRecipe={addNewRecipe}
                    recipes={recipes}
                    updateRecipe={updateCurrentRecipe}
                    updateFormData={updateFormInput}
                  />
                )}
              />
              <Route
                path="/detail/:id"
                render={() => (
                  <Detail
                    t={t}
                    loadRecipe={loadRecipe}
                    detailRecipe={detailRecipe}
                    deletechosenRecipe={deletechosenRecipe}
                  />
                )}
              />
              <Route render={() => <Page404 t={t} />} />
            </Switch>
          </div>
          <Footer t={t} />
        </Router> */}
      </>
    );
  }
  return (
    <>
      <Router>
        <CssBaseline />
        <Header t={t} setLang={setLang} lang={lang} cartItems={cartItems} />
        <div className={classes.toolbar}>
          <Switch>
            <Route
              exact
              path="/"
              render={() => (
                <Index
                  t={t}
                  recipes={recipes}
                  loadRecipe={loadChosenRecipe}
                  deletechosenRecipe={deletechosenRecipe}
                  addToCart={addRecipeToCart}
                />
              )}
            />
            <Route
              path="/cart"
              render={({ match }) => (
                <Cart
                  t={t}
                  cartItems={cartItems}
                  loadRecipe={loadChosenRecipe}
                  detailRecipe={detailRecipe}
                  deletechosenRecipe={deletechosenRecipe}
                  deleteFromCart={deleteRecipeFromCart}
                />
              )}
            />
            <Route
              path="/create"
              render={({ match }) => (
                <Create
                  t={t}
                  addNewRecipe={addNewRecipe}
                  recipes={recipes}
                  updateRecipe={updateCurrentRecipe}
                  updateFormData={updateFormInput}
                />
              )}
            />
            <Route
              path="/detail/:id"
              render={() => (
                <Detail
                  t={t}
                  loadRecipe={loadRecipe}
                  detailRecipe={detailRecipe}
                  deletechosenRecipe={deletechosenRecipe}
                />
              )}
            />
            <Route render={() => <Page404 t={t} />} />
          </Switch>
        </div>
        <Footer t={t} />
      </Router>
    </>
  );
};

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
    updateCurrentRecipe: (recipe) => {
      dispatch(updateRecipe(recipe));
    },
    loadChosenRecipe: (id) => {
      dispatch(loadRecipe(id));
    },
    updateFormInput: (data) => {
      dispatch(updateFormData(data));
    },
    addRecipeToCart: (data) => {
      dispatch(addToCart(data));
    },
    deleteRecipeFromCart: (data) => {
      dispatch(deleteFromCart(data));
    },
  };
};

export default compose(
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
)(TopPage);
