import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { isLoaded } from 'react-redux-firebase';
import { IconButton, Menu, MenuItem } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { deleteRecipe } from '../../modules/recipes';
import { addToCart, deleteFromCart } from '../../modules/user';

const MenuForRecipe = (props) => {
  const {
    t,
    recipe,
    deletechosenRecipe,
    cartItems,
    deleteRecipeFromCart,
    addRecipeToCart,
  } = props;
  const [anchorEl, setAnchorEl] = useState(null);
  const [hasCart, setHasCart] = useState([]);

  useEffect(() => {
    if (isLoaded(cartItems)) {
      const filterItem = cartItems.filter((item) => {
        return item.recipe.id === recipe.id;
      });
      setHasCart(filterItem);
    }
  }, [cartItems]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDeleteRecipe = (event) => {
    deletechosenRecipe(recipe.id);
    if (!hasCart.length > 0) {
      deleteRecipeFromCart(hasCart[0]);
    }
    handleClose();
  };

  const handleCart = (event) => {
    if (hasCart.length > 0) {
      deleteRecipeFromCart(hasCart[0]);
    } else {
      addRecipeToCart({ servingNum: recipe.yeild, recipe });
    }
    handleClose();
  };
  const cartStr =
    hasCart.length > 0
      ? t('このレシピをカゴから削除')
      : t('このレシピをカゴに追加');

  return (
    <>
      <IconButton aria-label="settings" onClick={handleClick}>
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem
          onClick={handleClose}
          component={Link}
          to={{
            pathname: `/create`,
            state: { editRecipe: recipe },
          }}
        >
          {t('このレシピを編集')}
        </MenuItem>
        <MenuItem onClick={handleDeleteRecipe} id={recipe.id}>
          {t('このレシピを削除')}
        </MenuItem>
        <MenuItem onClick={handleCart} id={recipe.id}>
          {cartStr}
        </MenuItem>
      </Menu>
    </>
  );
};

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    deletechosenRecipe: (id) => {
      dispatch(deleteRecipe(id));
    },
    addRecipeToCart: (data) => {
      dispatch(addToCart(data));
    },
    deleteRecipeFromCart: (data) => {
      dispatch(deleteFromCart(data));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MenuForRecipe);
