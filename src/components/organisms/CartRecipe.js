import React, { useState } from 'react';
import { Button, IconButton } from '@material-ui/core';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import { AddToPhotos } from '@material-ui/icons';

const CartDetail = (props) => {
  const { t, setLang, lang, cartItems } = props;
  const [value, setValue] = useState(0);
  return <div>レシピの詳細です！！</div>;
};

export default CartDetail;
