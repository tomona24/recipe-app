import React, { useState } from 'react';
import { useRouteMatch, useHistory, Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { isLoaded, isEmpty } from 'react-redux-firebase';
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

  const handleToPage = (recipeData) => {
    if (recipeData === 'TOP') {
      history.push('/cart');
    } else {
      history.push({
        pathname: `${match.url}/detail/${recipeData.recipe.id}`,
        state: { servingNum: recipeData.servingNum },
      });
    }
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="simple tabs example"
        >
          <Tab
            wrapped
            label={t('カゴTOP')}
            onClick={() => {
              handleToPage('TOP');
            }}
          />
          {cartItems.map((item) => {
            return (
              <Tab
                wrapped
                label={item.recipe.title}
                key={item.id}
                onClick={() => {
                  handleToPage(item);
                }}
              />
            );
          })}
        </Tabs>
      </AppBar>
    </div>
  );
};

export default CartHeader;
