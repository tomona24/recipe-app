import React, { useState } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import {
  Avatar,
  Typography,
  Container,
  Grid,
  FormHelperText,
  FormLabel,
  FormControlLabel,
  TextField,
  Button,
} from '@material-ui/core';
import { signOut, logInWithGoogle } from '../../modules/auth';

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(2),
    padding: '4px 0',
  },
}));
const LogIn = (props) => {
  const { auth, login, logout, t } = props;
  const classes = useStyles();
  if (auth.uid) {
    return (
      <Button
        variant="contained"
        color="default"
        size="small"
        onClick={logout}
        className={classes.button}
      >
        {t('ログアウト')}
      </Button>
    );
  }
  return (
    <Button
      variant="contained"
      color="secondary"
      size="small"
      onClick={login}
      className={classes.button}
    >
      {t('ログイン')}
    </Button>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: () => dispatch(logInWithGoogle()),
    logout: () => dispatch(signOut()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LogIn);
