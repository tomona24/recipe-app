import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';
import { connect } from 'react-redux';
import { firestoreConnect, isLoaded, isEmpty } from 'react-redux-firebase';
import { compose } from 'redux';
import Create from './Create';
import Detail from './Detail';
import Index from './Index';
import Page404 from './Page404';
import Cart from './Cart';
import Header from '../organisms/Header';
import Footer from '../organisms/Footer';
import LogIn from '../molecules/LogIn';
import { deleteRecipe, loadRecipe } from '../../modules/recipes';
import { addToCart, deleteFromCart } from '../../modules/user';
import { updateFormData } from '../../modules/form';

const useStyles = makeStyles((theme) => ({
  toolbar: theme.mixins.toolbar,
}));

const TopPage = (props) => {
  const {
    t,
    recipes,
    deletechosenRecipe,
    loadChosenRecipe,
    detailRecipe,
    addRecipeToCart,
    deleteRecipeFromCart,
    setLang,
    lang,
    user,
    uid,
    authenticated,
    authenticating,
  } = props;
  const [cartRecipes, setCartRecipes] = useState([]);
  const classes = useStyles();

  if (authenticating || !authenticated) {
    return (
      <Router>
        <CssBaseline />
        <Header
          t={t}
          setLang={setLang}
          lang={lang}
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

  return (
    <>
      <Router>
        <CssBaseline />
        <Header t={t} setLang={setLang} lang={lang} user={user} />
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
                  user={user}
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
                  recipes={recipes}
                  authenticated={authenticated}
                  authenticating={authenticating}
                />
              )}
            />
            <Route
              path="/detail/:id"
              render={() => (
                <Detail
                  t={t}
                  loadRecipe={loadChosenRecipe}
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
    user: state.firestore.data.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    deletechosenRecipe: (id) => {
      dispatch(deleteRecipe(id));
    },
    loadChosenRecipe: (id) => {
      dispatch(loadRecipe(id));
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
  firestoreConnect(({ uid, authenticated }) => {
    if (authenticated) {
      if (uid !== undefined) {
        return [
          {
            collection: 'recipes',
            where: ['user', '==', uid],
          },
          {
            collection: 'users',
            doc: uid,
            storeAs: `user`,
          },
        ];
      }
      return [];
    }
    return [];
  }),
  connect(mapStateToProps, mapDispatchToProps)
)(TopPage);
