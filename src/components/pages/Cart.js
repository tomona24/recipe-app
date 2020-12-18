import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Switch, useRouteMatch, Route, Redirect } from 'react-router-dom';
import { isLoaded } from 'react-redux-firebase';
import { CssBaseline } from '@material-ui/core';
import CartHeader from '../organisms/CartHeader';
import Detail from './Detail';
import CartDetail from '../organisms/CartDetail';

const Cart = (props) => {
  const {
    t,
    user,
    loadRecipe,
    detailRecipe,
    deletechosenRecipe,
    deleteFromCart,
    authenticated,
    auth,
  } = props;
  const match = useRouteMatch();
  const [cartItems, setCartItems] = useState([]);
  useEffect(() => {
    if (isLoaded(user)) {
      if (Object.keys(user).indexOf('cart') !== -1) {
        setCartItems(user.cart);
      }
    }
  }, [user]);

  if (!auth.uid) return <Redirect to="/" />;
  return (
    <>
      <CssBaseline />
      <Route path={`${match.path}`}>
        <CartHeader cartItems={cartItems} t={t} />
      </Route>
      <Switch>
        <Route exact path={`${match.path}`}>
          <CartDetail
            cartItems={cartItems}
            t={t}
            deleteFromCart={deleteFromCart}
          />
        </Route>
        <Route
          path={`${match.path}/detail/:id`}
          render={() => (
            <Detail
              t={t}
              loadRecipe={loadRecipe}
              detailRecipe={detailRecipe}
              deletechosenRecipe={deletechosenRecipe}
              user={user}
            />
          )}
        />
      </Switch>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    authenticated: !isLoaded(state.firebase.auth),
  };
};

// eslint-disable-next-line no-unused-vars
const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
