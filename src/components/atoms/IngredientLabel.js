import React from 'react';
import Grid from '@material-ui/core/Grid';
import { ingredientsConverter } from '../../utils/formConverter';

const Item = (props) => {
  const {
    ingredient: { name, potion, unit },
    parentComp,
  } = props;
  const potionStr = ingredientsConverter.createPotion(potion, unit);
  if (parentComp === 'Detail') {
    return (
      <Grid container justify="flex-start">
        <Grid item md={4} xs={3}>
          {name}
        </Grid>
        <Grid item>・・・</Grid>
        <Grid item>{potionStr}</Grid>
      </Grid>
    );
  }
  return (
    <Grid container justify="flex-start">
      <Grid item xs={7}>
        {name}
      </Grid>
      <Grid item>{potionStr}</Grid>
    </Grid>
  );
};

const IngredientLabel = (props) => {
  const { ingredients, parentComp } = props;
  return (
    <Grid container direction="column" spacing={0}>
      {Object.keys(ingredients)
        .sort()
        .map((key) => (
          <Grid item xs={12} key={key}>
            <Item ingredient={ingredients[key]} parentComp={parentComp} />
          </Grid>
        ))}
    </Grid>
  );
};

export default IngredientLabel;
