import React, { useState, useEffect } from 'react';
import { isLoaded, isEmpty } from 'react-redux-firebase';
import { Button, IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CartItemList from '../atoms/CartItemList';
import CartIngredientsList from '../atoms/CartIngredientsList';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

const CartDetail = (props) => {
  const { t, cartItems, deleteFromCart } = props;
  const classes = useStyles();
  const [checked, setChecked] = useState([1]);
  const [ingredientsList, setIngredientsList] = useState([]);

  // need more complex algorithm.
  // useEffect(() => {
  //   let ingList = {};
  //   cartItems.forEach((item) => {
  //     const { ingredients } = item.recipe;
  //     Object.keys(ingredients).forEach((key) => {
  //       const ingName = ingredients[key].name;
  //       const ingPotion = ingredients[key].potion;
  //       const unitPre = ingredients[key].unit.pre;
  //       const unitSu = ingredients[key].unit.su;
  //       if (
  //         ingList[ingName] &&
  //         (ingList[ingName].unit.pre === unitPre ||
  //           ingList[ingName].unit.su === unitSu)
  //       ) {
  //       } else {
  //       }
  //     });
  //     ingList = [...ingList, Object.entries(item.recipe.ingredients)];
  //   });
  //   setIngredientsList(ingList);
  // }, []);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
  };

  return (
    <>
      <CartItemList
        t={t}
        cartItems={cartItems}
        deleteFromCart={deleteFromCart}
      />
      {/* <CartIngredientsList t={t} list={ingredientsList} /> */}
    </>
  );
};

export default CartDetail;
