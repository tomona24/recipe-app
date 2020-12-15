import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import {
  Avatar,
  Button,
  Card,
  TextField,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Collapse,
  IconButton,
  Typography,
  Menu,
  MenuItem,
} from '@material-ui/core';
import { red } from '@material-ui/core/colors';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
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
}));

const RecipeCard = (props) => {
  const { t, recipe, loadRecipe, deletechosenRecipe, addToCart } = props;
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleAddCart = () => {
    const servingNum = recipe.yeild;
    addToCart({ servingNum, recipe });
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
        <Button variant="outlined" color="primary" onClick={handleAddCart}>
          {t('カゴに追加')}
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
