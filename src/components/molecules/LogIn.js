import React, { useState } from 'react';
import { connect } from 'react-redux';
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
import { makeStyles } from '@material-ui/core/styles';
import { logInWithGoogle } from '../../modules/auth';

const useStyles = makeStyles((theme) => ({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
  },
}));

const LogIn = (props) => {
  const { authError, login } = props;
  const classes = useStyles();
  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>L</Avatar>
        <Typography component="h1" variant="h5">
          ログイン
        </Typography>
        <Button onClick={login}>ログイン</Button>
      </div>
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
