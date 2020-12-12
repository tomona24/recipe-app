import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import {
  Container,
  CssBaseline,
  Grid,
  TextField,
  Typography,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));

const SearchForm = (props) => {
  const { t, setNewResearchWord } = props;
  const classes = useStyles();

  const handleChange = (event) => {
    const { value } = event.target;
    setNewResearchWord(value);
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
          <Grid item>カテゴリー絞り込み</Grid>
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
