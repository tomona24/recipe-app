import React, { useState, useEffect } from 'react';
import { Switch, useRouteMatch, Route } from 'react-router-dom';
import { isLoaded, isEmpty } from 'react-redux-firebase';
import { makeStyles } from '@material-ui/core/styles';
import { Router } from '@material-ui/icons';
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
  const { t, cartItems, loadRecipe, detailRecipe, deletechosenRecipe } = props;
  const match = useRouteMatch();
  const classes = useStyles();

  return (
    <>
      <Route path={`${match.path}`}>
        <CartHeader cartItems={cartItems} />
      </Route>
      <Switch>
        <Route exact path={`${match.path}`}>
          <CartDetail />
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
            // <CartRecipe />
          )}
        />
        {/* {cartItems.map((item, index) => {
            return (
              <Route
                key={`${item.id}あ`}
                path={`${match.path}/cart-detail`}
                render={() => <CartDetail />}
              />
            );
          })} */}
      </Switch>
    </>
  );
};

export default Cart;
