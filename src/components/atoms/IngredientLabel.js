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
  } = props;
  const potionStr = ingredientsConverter.createPotion(potion, unit);
  return (
    <Grid item xs={12} key={key}>
      {name}
      {potionStr}
    </Grid>
  );
};

const IngredientLabel = (props) => {
  const { ingredients } = props;
  return (
    <Grid container>
      {Object.keys(ingredients)
        .sort()
        .map((key) => (
          <Item ingredient={ingredients[key]} key={key} />
        ))}
    </Grid>
  );
};

export default IngredientLabel;
