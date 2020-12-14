import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { isLoaded, isEmpty } from 'react-redux-firebase';
import {
  AppBar,
  Button,
  IconButton,
  Badge,
  Toolbar,
  Typography,
} from '@material-ui/core';
import { AddToPhotos, Home, Error } from '@material-ui/icons';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
// MenuBook,

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(2),
    padding: '4px 0',
  },
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbar: {
    flexWrap: 'wrap',
  },
  toolbarTitle: {
    flexGrow: 1,
  },
}));

const StyledBadge = withStyles((theme) => ({
  badge: {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}))(Badge);

const CartBadge = (props) => {
  const { cartItemNum } = props;
  return (
    <Link to="/cart">
      <StyledBadge badgeContent={cartItemNum} color="secondary" showZero>
        <ShoppingCartIcon />
      </StyledBadge>
    </Link>
  );
};

const Header = (props) => {
  const { t, setLang, lang, cartItems } = props;
  const [value, setValue] = useState(0);
  const [numOfCart, setNumOfCart] = useState(0);
  const classes = useStyles();
  useEffect(() => {
    if (cartItems !== undefined) {
      setNumOfCart(cartItems.length);
    }
  }, [cartItems]);
  return (
    <div>
      <AppBar
        position="static"
        color="default"
        elevation={1}
        className={classes.appBar}
      >
        <Toolbar className={classes.toolbar}>
          <Typography
            variant="h6"
            color="inherit"
            noWrap
            className={classes.toolbarTitle}
          >
            <Link to="/">{t('ストックレシピ')}</Link>
          </Typography>
          <Link to="/">
            <IconButton aria-label="Top">
              <Home />
            </IconButton>
          </Link>
          <Link to="/create">
            <IconButton aria-label="create">
              <AddToPhotos />
            </IconButton>
          </Link>

          <Link to="/404">
            <IconButton aria-label="404">
              <Error />
            </IconButton>
          </Link>
          <Link to="/cart">
            <IconButton aria-label="cart">
              <StyledBadge badgeContent={numOfCart} color="secondary" showZero>
                <ShoppingCartIcon />
              </StyledBadge>
            </IconButton>
          </Link>
          <Button
            variant="contained"
            color="default"
            size="small"
            className={classes.button}
            onClick={() => setLang(lang === 'en' ? 'ja' : 'en')}
          >
            {t('English')}
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
