import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Switch, useRouteMatch, Route, Redirect } from 'react-router-dom';
import { isLoaded, isEmpty } from 'react-redux-firebase';
import { makeStyles } from '@material-ui/core/styles';
import { Router } from '@material-ui/icons';
import { CssBaseline } from '@material-ui/core';
import RecipeInstruction from '../atoms/RecipeInstruction';
import CartHeader from '../organisms/CartHeader';
import Detail from './Detail';
import CartDetail from '../organisms/CartDetail';
import CartRecipe from '../organisms/CartRecipe';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(1, 'auto'),
    width: theme.spacing(100),
    padding: theme.spacing(4, 2),
  },
}));

const Cart = (props) => {
  const {
    t,
    user,
    loadRecipe,
    detailRecipe,
    deletechosenRecipe,
    deleteFromCart,
    auth,
  } = props;
  const [recipes, setRecipes] = useState([]);
  const match = useRouteMatch();
  const classes = useStyles();

  if (!auth.uid) return <Redirect to="/" />;

  const CartDetailState = () => {
    if (isLoaded(user)) {
      if (user.cart) {
        return (
          <CartDetail
            cartItems={user.cart}
            t={t}
            deleteFromCart={deleteFromCart}
          />
        );
      }
      if (user.cart.length === 0) {
        return <p>{t('カートは空です。')}</p>;
      }
    }
    return <p>Now Loading</p>;
  };

  const CartHeaderState = () => {
    if (isLoaded(user)) {
      if (user.cart) {
        return <CartHeader cartItems={user.cart} t={t} />;
      }
    }
    return <CartHeader cartItems={[]} t={t} />;
  };

  return (
    <p>
      <CssBaseline />
      <Route path={`${match.path}`}>{CartHeaderState}</Route>
      <Switch>
        <Route exact path={`${match.path}`}>
          {CartDetailState}
        </Route>
        <Route
          path={`${match.path}/detail/:id`}
          render={() => (
            <Detail
              t={t}
              loadRecipe={loadRecipe}
              detailRecipe={detailRecipe}
              deletechosenRecipe={deletechosenRecipe}
            />
          )}
        />
        {/* {recipes.map((item, index) => {
          return (
            <Route
              key={`detail-${item.id}`}
              path={`${match.path}/cart-detail`}
              render={() => <CartDetail />}
            />
          );
        })} */}
      </Switch>
    </p>
  );
};

const mapStateToProps = (state) => {
  return { auth: state.firebase.auth };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
