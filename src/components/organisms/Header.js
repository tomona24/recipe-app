import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { Button, IconButton, Badge } from '@material-ui/core';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import { AddToPhotos, Home, Error } from '@material-ui/icons';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
// MenuBook,

const useStyles = makeStyles(() => ({
  button: {
    margin: '8px',
    padding: '4px, 8px',
  },
  root: {
    width: 500,
    color: '#000',
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
      <StyledBadge badgeContent={cartItemNum} color="secondary">
        <ShoppingCartIcon />
      </StyledBadge>
    </Link>
  );
};

const Header = (props) => {
  const { t, setLang, lang, cartItems } = props;
  const [value, setValue] = useState(0);
  const classes = useStyles();
  return (
    <div>
      <Button
        variant="contained"
        color="default"
        className={classes.button}
        onClick={() => setLang(lang === 'en' ? 'ja' : 'en')}
      >
        {t('言語を切り替え')}
      </Button>

      <BottomNavigation
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        className={classes.root}
      >
        <Link to="/create">
          <BottomNavigationAction
            label="Recents"
            icon={<AddToPhotos color="primary" />}
          />
        </Link>
        <Link to="/">
          <BottomNavigationAction label="トップページ" icon={<Home />} />
        </Link>
        <Link to="/404">
          <BottomNavigationAction label="404" icon={<Error />} />
        </Link>
        <BottomNavigationAction
          icon={<CartBadge cartItemNum={cartItems.length} />}
        />
      </BottomNavigation>
    </div>
  );
};

export default Header;
