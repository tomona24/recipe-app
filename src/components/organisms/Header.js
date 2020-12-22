import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { isLoaded } from 'react-redux-firebase';
import {
  AppBar,
  Button,
  IconButton,
  Badge,
  Toolbar,
  Typography,
} from '@material-ui/core';
import { AddToPhotos, Home } from '@material-ui/icons';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import AuthButton from '../atoms/AuthButton';
import logo from '../../static/images/logo.png';

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
    padding: theme.spacing(1, 2),
    minWidth: 100,
  },
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  menu: {
    marginRight: theme.spacing(1),
  },
  toolbar: {
    flexWrap: 'wrap',
  },
  toolbarTitle: {
    flexGrow: 1,
  },
  logo: {
    maxHeight: 50,
    margin: theme.spacing(1, 0, 0, 0),
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

const Header = (props) => {
  const { t, setLang, lang, user, authenticated } = props;
  const [numOfCart, setNumOfCart] = useState(0);
  const classes = useStyles();
  useEffect(() => {
    if (isLoaded(user) && user !== null) {
      if (Object.keys(user).indexOf('cart') !== -1) {
        setNumOfCart(user.cart.length);
      }
    } else {
      setNumOfCart(0);
    }
  }, [user]);

  return (
    <div>
      <AppBar
        position="static"
        elevation={1}
        className={classes.appBar}
        color="default"
      >
        <Toolbar className={classes.toolbar}>
          <Typography
            variant="h6"
            color="inherit"
            noWrap
            className={classes.toolbarTitle}
          >
            <Link to="/">
              <img src={logo} alt="StockRecipe" className={classes.logo} />
            </Link>
          </Typography>
          <Link to="/">
            <IconButton aria-label="Top" className={classes.menu}>
              <Home />
            </IconButton>
          </Link>
          <Link to="/create">
            <IconButton aria-label="create" className={classes.menu}>
              <AddToPhotos />
            </IconButton>
          </Link>
          <Link to="/cart">
            <IconButton aria-label="cart" className={classes.menu}>
              <StyledBadge badgeContent={numOfCart} color="secondary" showZero>
                {numOfCart > 0 ? (
                  <ShoppingBasketIcon color="primary" />
                ) : (
                  <ShoppingBasketIcon />
                )}
              </StyledBadge>
            </IconButton>
          </Link>
          <Button
            variant="contained"
            size="small"
            className={classes.button}
            onClick={() => setLang(lang === 'en' ? 'ja' : 'en')}
          >
            {t('English')}
          </Button>
          <AuthButton t={t} />
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
