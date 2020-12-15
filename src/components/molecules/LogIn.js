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
  avatar: {
    backgroundColor: '#ccc',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
  },
  spacing: {
    margin: theme.spacing(2, 0),
    padding: 0,
  },
}));

const LogIn = (props) => {
  const { authError, login } = props;
  const classes = useStyles();
  const [creds, setCreds] = useState({
    email: '',
    password: '',
  });

  //   const handleChange = (e) => {
  //     setCreds({
  //       [e.target.id]: e.target.value,
  //     });
  //   };
  //   const handleSubmit = (e) => {
  //     e.preventDefault();
  //     login(creds);
  //   };
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
    //     <h5 className="grey-text text-darken-3">Sign In</h5>
    //     <div className="input-field">
    //       <label htmlFor="email">Email</label>
    //       <input type="email" id="email" onChange={handleChange} />
    //     </div>
    //     <div className="input-field">
    //       <label htmlFor="password">Password</label>
    //       <input type="password" id="password" onChange={handleChange} />
    //     </div>
    //     <div className="input-field">
    //       <button className="btn pink lighten-1 z-depth-0">Login</button>
    //       <div className="red-text center">
    //         {authError ? <p>{authError}</p> : null}
    //       </div>
    //     </div>
    //   </form>
    // </div>
  );
};

const mapStateToProps = (state) => {
  return {
    authError: state.firebase,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: (creds) => dispatch(logInWithGoogle(creds)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LogIn);
