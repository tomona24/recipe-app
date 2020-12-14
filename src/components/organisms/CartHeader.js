import React, { useState } from 'react';
import { useRouteMatch, useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Button, IconButton, AppBar, Tabs, Tab } from '@material-ui/core';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import { AddToPhotos } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
      },
}));

const CartHeader = (props) => {
  const { t, setLang, lang, cartItems } = props;
  const [value, setValue] = useState(0);
  const match = useRouteMatch();
  const history = useHistory();
  const classes = useStyles();
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleToPage = (event) => {
    history.push('/');
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
          <Tab label="カゴTOP" />
          {cartItem.map((item) => {
            <Tab label="Item One" {...a11yProps(0)} />
          })}
          <Tab label="Item One" {...a11yProps(0)} />
          <Tab label="Item Two" {...a11yProps(1)} />
          <Tab label="Item Three" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
    </div>
        <Link to={`${match.url}/components`}>Components</Link>
        <Link to={`${match.url}`}>
          {/* <BottomNavigationAction
            label="カート詳細"
            icon={<AddToPhotos color="primary" />}
          /> */}
          カート詳細インデックス
        </Link>
        <Link to={`${match.url}/detail/T34vjuTFjqXbSvLxoJsd`}>
          {/* <BottomNavigationAction
            label="Detail"
            icon={<AddToPhotos color="primary" />}
          /> */}
          詳細レシピへのリンク
        </Link>
      </BottomNavigation>
    </div>
  );
};

export default CartHeader;
