import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { isLoaded } from 'react-redux-firebase';
import { IconButton, Menu, MenuItem } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { deleteRecipe } from '../../modules/recipes';
import { addToCart, deleteFromCart } from '../../modules/user';
import AirDialog from './AirDialog';

const MenuForRecipe = (props) => {
  const {
    t,
    recipe,
    deletechosenRecipe,
    cartItems,
    deleteRecipeFromCart,
    servingNum,
    addRecipeToCart,
  } = props;
  const [anchorEl, setAnchorEl] = useState(null);
  const [hasCart, setHasCart] = useState([]);
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

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

  const handleDeleteRecipe = (id) => {
    deletechosenRecipe(id);
    if (hasCart.length > 0) {
      deleteRecipeFromCart(hasCart[0]);
    }
    handleClose();
    history.push('/');
  };

  const handleDialogClickOpen = (event) => {
    const { id } = event.target;
    setOpen(true);
    setDeleteId(id);
  };

  const handleDialogClose = (reply) => {
    setOpen(false);
    handleClose();
    if (reply) {
      handleDeleteRecipe(deleteId);
    }
  };

  const handleCart = (event) => {
    if (hasCart.length > 0) {
      deleteRecipeFromCart(hasCart[0]);
    } else {
      addRecipeToCart({ servingNum, recipe });
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
        <MenuItem onClick={handleDialogClickOpen} id={recipe.id}>
          {t('このレシピを削除')}
        </MenuItem>
        <MenuItem onClick={handleCart} id={recipe.id}>
          {cartStr}
        </MenuItem>
      </Menu>
      <AirDialog
        t={t}
        confirmText={t('このレシピを削除しますか？')}
        title={t('選択したレシピの削除')}
        agreeText={t('削除する')}
        disagreeText={t('削除しない')}
        handleDialogClose={handleDialogClose}
        open={open}
      />
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
