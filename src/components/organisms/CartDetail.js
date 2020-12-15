import React from 'react';
import CartItemList from '../atoms/CartItemList';

const CartDetail = (props) => {
  const { t, cartItems, deleteFromCart } = props;

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

  return (
    <>
      <CartItemList
        t={t}
        cartItems={cartItems}
        deleteFromCart={deleteFromCart}
      />
    </>
  );
};

export default CartDetail;
