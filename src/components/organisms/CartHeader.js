/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import { useRouteMatch, useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, CssBaseline, Tabs, Tab } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: '100%',
    margin: 0,
  },
  appBar: {
    color: '#fff',
  },
}));

const CartHeader = (props) => {
  const { t, cartItems } = props;
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
        state: {
          servingNum: recipeData.servingNum,
          detailRecipe: recipeData.recipe,
        },
      });
    }
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="static" className={classes.appBar}>
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
