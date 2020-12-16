import React, { useState, useEffect } from 'react';
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

const filterRecipes = (originalRecipes, filterCondition) => {
  let filteredRecipes = originalRecipes;
  if (!isEmpty(filterCondition.category)) {
    const categoriesStr = filterCondition.category.join('');
    filteredRecipes = filteredRecipes.filter((recipe) => {
      return categoriesStr.indexOf(recipe.category) !== -1;
    });
  }
  if (filterCondition.word !== '') {
    filteredRecipes = filteredRecipes.filter((recipe) => {
      if (recipe.title.indexOf(filterCondition.word) === -1) {
        const ingList = Object.entries(recipe.ingredients).filter((ing) => {
          if (ing[1].name.indexOf(filterCondition.word) === -1) {
            return false;
          }
          return true;
        });
        if (ingList.length > 0) {
          return true;
        }
        return false;
      }
      return true;
    });
  }
  return filteredRecipes;
};

const List = (props) => {
  const {
    t,
    recipes,
    loadRecipe,
    deletechosenRecipe,
    addToCart,
    cartItems,
    deleteFromCart,
  } = props;

  if (!isLoaded(recipes)) {
    return <div>{t('Now Loading...')}</div>;
  }
  if (isEmpty(recipes)) {
    return <div>{t('データがありません')}</div>;
  }

  return (
    <>
      <Grid container spacing={4}>
        {recipes.map((recipe) => (
          <Grid item key={recipe.id} xs={12} sm={6} md={4}>
            <RecipeCard
              recipe={recipe}
              loadRecipe={loadRecipe}
              deletechosenRecipe={deletechosenRecipe}
              t={t}
              addToCart={addToCart}
              cartItems={cartItems}
              deleteFromCart={deleteFromCart}
            />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

const Index = (props) => {
  const {
    t,
    recipes,
    deletechosenRecipe,
    addToCart,
    user,
    deleteFromCart,
  } = props;
  const [researchWord, setResearchWord] = useState('');
  const [filterCategory, setFilterCategory] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const classes = useStyles();
  useEffect(() => {
    if (isLoaded(user)) {
      if (Object.keys(user).indexOf('cart') !== -1) {
        setCartItems(user.cart);
      }
    }
  }, [user]);

  const filteredRecipes = isEmpty(recipes)
    ? recipes
    : filterRecipes(recipes, { word: researchWord, category: filterCategory });

  const setNewResearchWord = (word) => {
    setResearchWord(word);
  };

  return (
    <>
      <CssBaseline />
      <main>
        <Container className={classes.cardGrid} maxWidth="md">
          <SearchForm
            t={t}
            setNewResearchWord={setNewResearchWord}
            setFilterCategory={setFilterCategory}
            filterCategory={filterCategory}
          />
          <List
            t={t}
            recipes={filteredRecipes}
            researchWord={researchWord}
            deletechosenRecipe={deletechosenRecipe}
            addToCart={addToCart}
            cartItems={cartItems}
            deleteFromCart={deleteFromCart}
          />
        </Container>
      </main>
    </>
  );
};

export default Index;
