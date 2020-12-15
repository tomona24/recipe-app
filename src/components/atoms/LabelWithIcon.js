import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(() => ({
  root: {
    width: 'auto',
  },
}));

const RecipeInstruction = (props) => {
  const { str, icon } = props;
  const classes = useStyles();

  return (
    <Grid
      container
      direction="row"
      alignItems="center"
      justify="flex-start"
      className={classes.root}
    >
      <Grid item>{icon}</Grid>
      <Grid item>
        <Typography component="h6" variant="subtitle1">
          {str}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default RecipeInstruction;
