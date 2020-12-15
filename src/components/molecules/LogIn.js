import React, { useState } from 'react';
import { connect } from 'react-redux';
import {
  Avatar,
  Container,
  Typography,
  Paper,
  Grid,
  FormHelperText,
  FormLabel,
  FormControlLabel,
  TextField,
  Button,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { logInWithGoogle } from '../../modules/auth';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(4, 'auto'),
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(4, 2),
  },
}));

const LogIn = (props) => {
  const { t, authError, login } = props;
  const classes = useStyles();
  return (
    <Container maxWidth="xs" className={classes.root}>
      <Paper className={classes.paper}>
        <Typography component="h1" variant="h5">
          {t('Googleアカウントでログイン')}
        </Typography>
        <Button onClick={login} color="secondary" variant="contained">
          {t('ログインする')}
        </Button>
      </Paper>
    </Container>
  );
};

const mapStateToProps = (state) => {
  return {
    authError: state.firebase,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: () => dispatch(logInWithGoogle()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LogIn);
