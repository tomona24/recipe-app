import React, { useMemo, useState, useEffect } from 'react';
import { isLoaded, isEmpty } from 'react-redux-firebase';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import RecipeCard from '../atoms/RecipeCard';
import SearchForm from '../organisms/SearchForm';

const useStyles = makeStyles((theme) => ({
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
}));

const filterRecipes = (originalRecipes, word) => {
  const filteredRecipes = originalRecipes.filter((recipe) => {
    if (recipe.title.indexOf(word) === -1) {
      return false;
    }
    return true;
  });
  return filteredRecipes;
};

const List = (props) => {
  const { t, recipes, loadRecipe, researchWord } = props;

  if (!isLoaded(recipes)) {
    return <div>{t('Loading...')}</div>;
  }
  if (isEmpty(recipes)) {
    return <div>{t('データがありません')}</div>;
  }

  return (
    <Grid container spacing={4}>
      {recipes.map((recipe) => (
        <Grid item key={recipe.id} xs={12} sm={6} md={4}>
          <RecipeCard recipe={recipe} loadRecipe={loadRecipe} />
        </Grid>
      ))}
    </Grid>
  );
};

const Index = (props) => {
  const { t, recipes, loadRecipe } = props;
  const [researchWord, setResearchWord] = useState('');
  const classes = useStyles();

  const filteredRecipes = !isEmpty(recipes)
    ? filterRecipes(recipes, researchWord)
    : recipes;

  const setNewResearchWord = (word) => {
    // const filterWord = word.toLowerCase(); // 必要ならここでひらがな／カタカナの変換？
    setResearchWord(word);
  };

  return (
    <>
      <CssBaseline />
      <main>
        {/* Hero unit */}
        {t('メニュー一覧')}
        <Container className={classes.cardGrid} maxWidth="md">
          <SearchForm t={t} setNewResearchWord={setNewResearchWord} />
          <List t={t} recipes={filteredRecipes} researchWord={researchWord} />
        </Container>
      </main>
    </>
  );
};

export default Index;
