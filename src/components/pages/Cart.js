import React, { useState, useEffect } from 'react';
import { isLoaded, isEmpty } from 'react-redux-firebase';
import { makeStyles } from '@material-ui/core/styles';
import RecipeInstruction from '../atoms/RecipeInstruction';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(1, 'auto'),
    width: theme.spacing(100),
    padding: theme.spacing(4, 2),
  },
}));

const Cart = (props) => {
  const { t, cartItems } = props;
  const classes = useStyles();

  return (
    <>
      <p>カートのリストナビゲーション</p>
      <p>カートの詳細</p>
    </>
  );
};

export default Cart;
