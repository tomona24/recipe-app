import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { isLoaded } from 'react-redux-firebase';
import { BigNumber } from 'bignumber.js';
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
  FormControl,
  InputLabel,
  Menu,
  MenuItem,
  Select,
  Typography,
} from '@material-ui/core';
import { red } from '@material-ui/core/colors';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import LocalCafeRoundedIcon from '@material-ui/icons/LocalCafeRounded';
import roundedLogo from '../../static/images/roundedLogo.png';
import IngredientsLabel from './IngredientLabel';
import MenuForRecipe from './MenuForRecipe';
import noImage from '../../static/images/noImage.png';

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
  formControl: {
    minWidth: 60,
  },
  button: {
    minWidth: 120,
    margin: theme.spacing(0, 1),
    padding: theme.spacing(1),
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
  const [servingNum, setServingNum] = useState(1);

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
    if (hasCart.length > 0) {
      deleteFromCart(hasCart[0]);
    } else {
      addToCart({ servingNum, recipe });
    }
  };

  const handleChange = (event) => {
    const newValue = event.target.value;
    if (servingNum !== newValue) {
      setServingNum(newValue);
    }
  };

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          // eslint-disable-next-line react/jsx-wrap-multilines
          <Link
            to={{
              pathname: `/detail/${recipe.id}`,
              state: { detailRecipe: recipe, servingNum },
            }}
          >
            <Avatar
              aria-label="recipe"
              className={classes.avatar}
              src={roundedLogo}
            />
          </Link>
        }
        action={
          // eslint-disable-next-line react/jsx-wrap-multilines
          <MenuForRecipe
            t={t}
            recipe={recipe}
            deletechosenRecipe={deletechosenRecipe}
            cartItems={cartItems}
            servingNum={servingNum}
          />
        }
        title={recipe.title}
        subheader={recipe.updateDate}
      />
      <Link
        // to={`/detail/${recipe.id}`}
        to={{
          pathname: `/detail/${recipe.id}`,
          state: { detailRecipe: recipe, servingNum },
        }}
      >
        <CardMedia
          className={classes.media}
          image={recipe.images.length > 0 ? recipe.images[0].path : noImage}
          title={`${recipe.title}のレシピを見る`}
        />
      </Link>
      <CardActions disableSpacing>
        <FormControl className={classes.formControl}>
          <InputLabel shrink id="RecipeCard-times-num">
            {recipe.yeild}
            {t(`人分`)}
            &times;
          </InputLabel>
          <Select
            labelId="RecipeCard-times-num"
            id="RecipeCard-times-num"
            value={servingNum}
            onChange={handleChange}
            displayEmpty
            className={classes.selectEmpty}
          >
            <MenuItem value={BigNumber(1).div(4)}>1/4</MenuItem>
            <MenuItem value={BigNumber(1).div(3)}>1/3</MenuItem>
            <MenuItem value={BigNumber(0.5)}>1/2</MenuItem>
            <MenuItem value={1}>1</MenuItem>
            <MenuItem value={2}>2</MenuItem>
            <MenuItem value={3}>3</MenuItem>
            <MenuItem value={4}>4</MenuItem>
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={10}>10</MenuItem>
          </Select>
        </FormControl>
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
