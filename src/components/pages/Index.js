import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import RecipeCard from '../atoms/RecipeCard';

const useStyles = makeStyles((theme) => ({
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
}));

const Index = (props) => {
  const { t, recipes, chooseRecipe } = props;
  const classes = useStyles();
  return (
    <>
      <CssBaseline />
      <main>
        {/* Hero unit */}
        {t('メニュー一覧')}
        <Container className={classes.cardGrid} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {recipes.map((recipe) => (
              <Grid item key={recipe.id} xs={12} sm={6} md={4}>
                <RecipeCard recipe={recipe} chooseRecipe={chooseRecipe} />
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
    </>
  );
};

export default Index;
