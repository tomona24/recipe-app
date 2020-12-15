import React, { useState, useEffect } from 'react';
import { Switch, useRouteMatch, Route } from 'react-router-dom';
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
    cartItems,
    loadRecipe,
    detailRecipe,
    deletechosenRecipe,
    deleteFromCart,
  } = props;
  const [recipes, setRecipes] = useState([]);
  const match = useRouteMatch();
  const classes = useStyles();

  useEffect(() => {
    if (!isLoaded(cartItems) && !isEmpty(cartItems)) {
      setRecipes(cartItems);
    }
  }, [cartItems]);

  const CartDetailState = () => {
    if (!isLoaded(cartItems)) {
      return <p>Now Loading</p>;
    }
    if (isEmpty(cartItems)) {
      return <p>{t('カートは空です。')}</p>;
    }
    return (
      <CartDetail cartItems={cartItems} t={t} deleteFromCart={deleteFromCart} />
    );
  };

  const CartHeaderState = () => {
    if (!isLoaded(cartItems) || isEmpty(cartItems)) {
      return <CartHeader cartItems={[]} t={t} />;
    }
    return <CartHeader cartItems={cartItems} t={t} />;
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

export default Cart;
