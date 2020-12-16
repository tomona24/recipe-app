import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineDot from '@material-ui/lab/TimelineDot';
import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent';
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
    fontSize: '.9rem',
  },
}));

const RecipeInstruction = (props) => {
  const { instructions, ingredients } = props;
  const [spaceForIng, setSpaceForIng] = useState(false);
  const classes = useStyles();

  useEffect(() => {
    instructions.forEach((e) => {
      if (e.ingredients.length !== 0) {
        setSpaceForIng(3);
      }
    });
  }, [instructions]);

  return (
    <Timeline>
      {instructions
        .sort((a, b) => {
          return a.order - b.order;
        })
        .map((item) => (
          <TimelineItem key={item.id}>
            <TimelineOppositeContent className={classes.oposit} />
            <TimelineSeparator>
              <TimelineDot>
                <Avatar className={classes.numAvatar}>{item.order}</Avatar>
              </TimelineDot>
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              <Grid container>
                <Grid item xs={spaceForIng}>
                  <Grid container>
                    {item.ingredients.map((id) => {
                      return (
                        <Grid item md={12}>
                          {ingredients[id].name}
                          {ingredients[id].potion}
                          {ingredients[id].unit}
                        </Grid>
                      );
                    })}
                  </Grid>
                </Grid>
                <Grid item xs={8}>
                  {item.direction}
                </Grid>
              </Grid>
            </TimelineContent>
          </TimelineItem>
        ))}
    </Timeline>
  );
};

export default RecipeInstruction;
