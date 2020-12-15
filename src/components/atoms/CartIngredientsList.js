import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Avatar,
  Grid,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  ListItemSecondaryAction,
  Checkbox,
  Typography,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    maxWidth: 752,
  },
  demo: {
    backgroundColor: theme.palette.background.paper,
  },
  title: {
    margin: theme.spacing(4, 0, 2),
  },
}));

const CartIngredientsList = (props) => {
  const { t, list } = props;
  const classes = useStyles();
  // eslint-disable-next-line no-unused-vars
  const [dense, setDense] = useState(false);
  const [checked, setChecked] = useState([]);

  const handleToggle = (id) => () => {
    const currentIndex = checked.indexOf(id);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(id);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  return (
    <Grid container>
      <Grid item xs={12} md={6}>
        <Typography variant="h6" className={classes.title}>
          {t('お料理リスト')}
        </Typography>
        <div className={classes.demo}>
          <List dense={dense}>
            {list.map((item) => {
              const labelId = `checkbox-list-${item.id}`;
              return (
                <ListItem key={item.id}>
                  <ListItemAvatar>
                    <Avatar>{/* <FolderIcon /> */}</Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={item.name} secondary={item.potion} />
                  <ListItemSecondaryAction>
                    <Checkbox
                      edge="end"
                      onChange={handleToggle(item.id)}
                      checked={checked.indexOf(item.id) !== -1}
                      inputProps={{ 'aria-labelledby': labelId }}
                    />
                  </ListItemSecondaryAction>
                </ListItem>
              );
            })}
          </List>
        </div>
      </Grid>
    </Grid>
  );
};

export default CartIngredientsList;
