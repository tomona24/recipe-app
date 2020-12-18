import React from 'react';
import { connect } from 'react-redux';
import {
  Container,
  Typography,
  Paper,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
} from '@material-ui/core';
import MenuBookRoundedIcon from '@material-ui/icons/MenuBookRounded';
import TouchAppRoundedIcon from '@material-ui/icons/TouchAppRounded';
import EmojiObjectsRoundedIcon from '@material-ui/icons/EmojiObjectsRounded';
import { makeStyles } from '@material-ui/core/styles';
import { logInWithGoogle } from '../../modules/auth';
import logo from '../../static/images/logo.png';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(3, 'auto'),
  },
  logo: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(4, 2),
  },
  list: {
    marginBottom: 2,
  },
  listItem: {
    padding: theme.spacing(0),
    marginTop: theme.spacing(0),
    marginBottom: theme.spacing(1),
  },
  avatar: {
    backgroundColor: theme.palette.primary.main,
  },
  button: {
    margin: theme.spacing(3),
  },
}));

const LogIn = (props) => {
  const { t, login, authenticating, authenticated } = props;
  const classes = useStyles();

  if (authenticating && !authenticated) {
    return <Typography>Now Loading...</Typography>;
  }

  return (
    <Container maxWidth="sm" className={classes.root}>
      <Paper className={classes.paper}>
        <img src={logo} alt="StockRecipe" className={classes.logo} />
        <Container alignItems="left" className={classes.list}>
          <List className={classes.listItem}>
            <ListItem>
              <ListItemAvatar>
                <Avatar className={classes.avatar}>
                  <MenuBookRoundedIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={t('お気に入りのレシピをどんどんストック！')}
                secondary={t('自分だけのレシピブックが作れます')}
              />
            </ListItem>
          </List>
          <List className={classes.listItem}>
            <ListItem>
              <ListItemAvatar>
                <Avatar className={classes.avatar}>
                  <EmojiObjectsRoundedIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={t('欲しい分量の材料も自動で計算')}
                secondary={t('もう計算機はいりません')}
              />
            </ListItem>
          </List>
          <List className={classes.listItem}>
            <ListItem>
              <ListItemAvatar>
                <Avatar className={classes.avatar}>
                  <TouchAppRoundedIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={t('選んだレシピはワンタップですぐに切り替え')}
                secondary={t(
                  'お料理中も、複数のレシピをらくらくチェックできます'
                )}
              />
            </ListItem>
          </List>
        </Container>
        <Typography variant="h5">{t('Googleアカウントでログイン')}</Typography>
        <Button
          onClick={login}
          color="secondary"
          variant="contained"
          className={classes.button}
        >
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
