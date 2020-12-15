import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Avatar,
  Container,
  Grid,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  ListItemSecondaryAction,
  Button,
  IconButton,
  Checkbox,
  Typography,
} from '@material-ui/core';
import FolderIcon from '@material-ui/icons/Folder';
import DeleteIcon from '@material-ui/icons/Delete';
import { ingredientsConverter } from '../../utils/formConverter';

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
  const [dense, setDense] = useState(false);

  const handleClick = (id) => {
    deleteFromCart(id);
  };
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
            {cartItems.map((el, index) => {
              const { recipe: item } = el;
              const labelId = `checkbox-list-${item.id}`;
              return (
                <ListItem key={item.id} className={classes.listItem}>
                  <ListItemAvatar>
                    <Avatar>{/* <FolderIcon /> */}</Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={item.title}
                    secondary={`${el.servingNum}${t('人分')}`}
                  />
                  <ListItemSecondaryAction>
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => {
                        handleClick(item.id);
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
