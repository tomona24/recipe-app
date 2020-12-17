import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Avatar,
  Container,
  Grid,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  ListItemSecondaryAction,
  Button,
  Typography,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(1, 'auto'),
  },
  listItem: {
    borderBottom: '1px solid #ccc',
  },
}));

const CartItemList = (props) => {
  const { t, cartItems, deleteFromCart } = props;
  const classes = useStyles();

  const handleClick = (id) => {
    deleteFromCart(id);
  };

  const cartIsEmpty =
    cartItems.length === 0 ? (
      <Typography>{t('カートは空です。')}</Typography>
    ) : (
      <></>
    );
  return (
    <Container maxWidth="md" className={classes.root}>
      <Grid container>
        <Grid item xs={12}>
          <Typography variant="h6" className={classes.title}>
            {t('お料理リスト')}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <List>
            {cartIsEmpty}
            {cartItems.map((el) => {
              const { recipe: item, servingNum } = el;
              return (
                <ListItem key={item.id} className={classes.listItem}>
                  <ListItemAvatar>
                    <Avatar>{/* <FolderIcon /> */}</Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={item.title}
                    secondary={`${item.yeild}${t('人分')} × ${servingNum}`}
                  />
                  <ListItemSecondaryAction>
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => {
                        handleClick(el);
                      }}
                    >
                      {t('カゴから削除')}
                    </Button>
                  </ListItemSecondaryAction>
                </ListItem>
              );
            })}
          </List>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CartItemList;
