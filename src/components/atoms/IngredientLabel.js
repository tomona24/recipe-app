import React from 'react';
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
import { ingredientsConverter } from '../../utils/formConverter';

const Item = (props) => {
  const {
    ingredient: { key, name, potion, unit },
    parentComp,
  } = props;
  const potionStr = ingredientsConverter.createPotion(potion, unit);
  if (parentComp === 'Detail') {
    return (
      <Grid container justify="flex-start" spacing={2}>
        <Grid item md={4} xs={3}>
          {name}
        </Grid>
        <Grid item>・・・</Grid>
        <Grid item>{potionStr}</Grid>
      </Grid>
    );
  }
  return (
    <Grid container justify="flex-start" spacing={2}>
      <Grid item xs={5}>
        {name}
      </Grid>
      <Grid item>{potionStr}</Grid>
    </Grid>
  );
};

const IngredientLabel = (props) => {
  const { ingredients, parentComp } = props;
  return (
    <>
      {Object.keys(ingredients)
        .sort()
        .map((key) => (
          <Item
            ingredient={ingredients[key]}
            key={key}
            parentComp={parentComp}
          />
        ))}
    </>
  );
};

export default IngredientLabel;
