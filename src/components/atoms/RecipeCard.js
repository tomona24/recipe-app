import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { isLoaded } from 'react-redux-firebase';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import {
  Avatar,
  Button,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Collapse,
  IconButton,
} from '@material-ui/core';
import { red } from '@material-ui/core/colors';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import LocalCafeRoundedIcon from '@material-ui/icons/LocalCafeRounded';
import IngredientsLabel from './IngredientLabel';
import MenuForRecipe from './MenuForRecipe';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
  button: {
    minWidth: 120,
  },
}));

const RecipeCard = (props) => {
  const {
    t,
    recipe,
    deletechosenRecipe,
    addToCart,
    cartItems,
    deleteFromCart,
  } = props;
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  const [hasCart, setHasCart] = useState([]);

  useEffect(() => {
    if (isLoaded(cartItems)) {
      const filterItem = cartItems.filter((item) => {
        return item.recipe.id === recipe.id;
      });
      setHasCart(filterItem);
    }
  }, [cartItems]);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleCart = () => {
    const servingNum = recipe.yeild;
    if (hasCart.length > 0) {
      deleteFromCart(hasCart[0]);
    } else {
      addToCart({ servingNum, recipe });
    }
  };

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          // eslint-disable-next-line react/jsx-wrap-multilines
          <Link
            // to={`/detail/${recipe.id}`}
            to={{
              pathname: `/detail/${recipe.id}`,
              state: { editRecipe: recipe },
            }}
          >
            <Avatar aria-label="recipe" className={classes.avatar}>
              <LocalCafeRoundedIcon />
            </Avatar>
          </Link>
        }
        action={
          // eslint-disable-next-line react/jsx-wrap-multilines
          <MenuForRecipe
            t={t}
            recipe={recipe}
            deletechosenRecipe={deletechosenRecipe}
            cartItems={cartItems}
          />
        }
        title={recipe.title}
        subheader={recipe.updateDate}
      />
      <Link to={`/detail/${recipe.id}`}>
        <CardMedia
          className={classes.media}
          image="https://source.unsplash.com/random"
          title={`${recipe.title}のレシピを見る`}
        />
      </Link>
      <CardActions disableSpacing>
        <Button
          variant="contained"
          color="primary"
          onClick={handleCart}
          className={classes.button}
        >
          {hasCart.length > 0 ? t('カゴから削除') : t('カゴに追加')}
        </Button>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <IngredientsLabel ingredients={recipe.ingredients} />
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default RecipeCard;
