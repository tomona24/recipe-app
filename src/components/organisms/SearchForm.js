import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import {
  Container,
  CssBaseline,
  Grid,
  TextField,
  Typography,
  Checkbox,
  FormLabel,
  FormControlLabel,
} from '@material-ui/core';

import LocalCafeRoundedIcon from '@material-ui/icons/LocalCafeRounded';
import LocalDiningRoundedIcon from '@material-ui/icons/LocalDiningRounded';
import LocalPizzaRoundedIcon from '@material-ui/icons/LocalPizzaRounded';
import RestaurantRoundedIcon from '@material-ui/icons/RestaurantRounded';
import ShoppingBasketRoundedIcon from '@material-ui/icons/ShoppingBasketRounded';
import StorageRoundedIcon from '@material-ui/icons/StorageRounded';

const useStyles = makeStyles((theme) => ({
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));

const SearchForm = (props) => {
  const { t, setNewResearchWord, setFilterCategory, filterCategory } = props;
  const classes = useStyles();

  const handleChange = (event) => {
    const { value } = event.target;
    setNewResearchWord(value);
  };

  const addFilterCategory = (event) => {
    const { checked, value } = event.target;
    let categoryArr = filterCategory;
    if (checked) {
      categoryArr = [...categoryArr, value];
    } else {
      categoryArr = categoryArr.filter((item) => {
        return item !== value;
      });
    }
    setFilterCategory(categoryArr);
  };

  return (
    <>
      <Container component="div" maxWidth="md">
        <CssBaseline />
        <Grid
          container
          className={classes.paper}
          direction="row"
          alignItems="center"
          justify="flex-end"
        >
          <Grid item>
            <LocalDiningRoundedIcon />
            <RestaurantRoundedIcon />
            カテゴリー絞り込み
          </Grid>
          <Grid item>
            <FormControlLabel
              control={
                // eslint-disable-next-line react/jsx-wrap-multilines
                <Checkbox color="primary" />
              }
              label={t('副菜')}
              value="sideDish"
              onChange={addFilterCategory}
            />
            <FormControlLabel
              control={
                // eslint-disable-next-line react/jsx-wrap-multilines
                <Checkbox color="primary" />
              }
              label={t('一品物')}
              value="singleDish"
              onChange={addFilterCategory}
            />
            <FormControlLabel
              control={
                // eslint-disable-next-line react/jsx-wrap-multilines
                <Checkbox color="primary" />
              }
              label={t('スープもの')}
              value="soup"
              onChange={addFilterCategory}
            />
            <FormControlLabel
              control={
                // eslint-disable-next-line react/jsx-wrap-multilines
                <Checkbox color="primary" />
              }
              label={t('その他')}
              value="other"
              onChange={addFilterCategory}
            />
          </Grid>
          <Grid item md={8}>
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              autoFocus
              label={t('検索')}
              name="search"
              onChange={handleChange}
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default SearchForm;
