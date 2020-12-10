import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineDot from '@material-ui/lab/TimelineDot';
import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(1, 'auto'),
    width: theme.spacing(100),
    border: '1px solid red',
  },
  oposit: {
    width: 0,
    display: 'none',
  },
  numAvatar: {
    width: theme.spacing(2),
    height: theme.spacing(2),
  },
}));

const RecipeInstruction = (props) => {
  const { str, icon, t } = props;

  return (
    <Grid container direction="row" alignItems="center">
      <Grid item>{icon}</Grid>
      <Grid item>
        <Typography component="h6" variant="subtitle1">
          {t(str)}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default RecipeInstruction;