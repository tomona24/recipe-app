import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Avatar,
  Button,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Collapse,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';

const MenuForRecipe = (props) => {
  const { t, recipe, deletechosenRecipe } = props;
  const [expanded, setExpanded] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const deleteRecipe = (event) => {
    const { id } = event.target;
    deletechosenRecipe(id);
    handleClose();
  };

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
        <MenuItem onClick={deleteRecipe} id={recipe.id}>
          {t('このレシピを削除')}
        </MenuItem>
      </Menu>
    </>
  );
};

export default MenuForRecipe;
