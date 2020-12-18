import React, { useState, useEffect } from 'react';
import { isLoaded, isEmpty } from 'react-redux-firebase';
import { useParams, useLocation } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import {
  Container,
  CssBaseline,
  Paper,
  Box,
  Grid,
  Typography,
  MenuItem,
  FormControl,
  Select,
} from '@material-ui/core';
import PersonOutlineRoundedIcon from '@material-ui/icons/PersonOutlineRounded';
import AccessAlarmRoundedIcon from '@material-ui/icons/AccessAlarmRounded';
import MessageRoundedIcon from '@material-ui/icons/MessageRounded';
import KitchenRoundedIcon from '@material-ui/icons/KitchenRounded';
import MenuBookRoundedIcon from '@material-ui/icons/MenuBookRounded';
import StarsRoundedIcon from '@material-ui/icons/StarsRounded';
import Rating from '@material-ui/lab/Rating';
import RecipeInstruction from '../atoms/RecipeInstruction';
import LabelWithIcon from '../atoms/LabelWithIcon';
import IngredientLabel from '../atoms/IngredientLabel';
import MenuForRecipe from '../atoms/MenuForRecipe';
import DetailCard from '../organisms/DetailCard';

const Quoted = (props) => {
  const { t, quoted, classesQuote } = props;
  const from =
    quoted.slice(0, 4) === 'http' ? (
      <a href={quoted} target="_blank" rel="noreferrer">
        {quoted}
      </a>
    ) : (
      quoted
    );
  return (
    <Grid item xs={12} className={classesQuote}>
      <Grid container spacing={1} justify="flex-end">
        <Grid item>{t('由来・引用')}</Grid>
        <Grid item>{from}</Grid>
      </Grid>
    </Grid>
  );
};

const useStyles = makeStyles((theme) => ({
  paper: {
    margin: theme.spacing(1, 'auto'),
    padding: theme.spacing(4, 2),
  },
  image: {
    width: '100%',
  },
  img: {
    margin: 'auto',
    display: 'block',
    width: '100%',
    height: 300,
    objectFit: 'cover',
  },
  subInfo: {
    margin: theme.spacing(4, 0),
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  gridItem: {
    margin: theme.spacing(2, 2, 0),
  },
  formControl: {
    margin: theme.spacing(0, 2),
    minWidth: 50,
  },
  selectEmpty: {
    marginTop: theme.spacing(0),
  },
  quoted: {
    textAlign: 'right',
  },
}));

const Detail = (props) => {
  const { loadRecipe, user, detailRecipe, t } = props;
  const { id } = useParams();
  const location = useLocation();
  const [needFetch, setNeedFetch] = useState();
  const [cartItems, setCartItems] = useState([]);
  const [recipe, setRecipe] = useState(detailRecipe);
  const [servingNum, setServingNum] = useState(1);

  useEffect(() => {
    if (isLoaded(user)) {
      if (Object.keys(user).indexOf('cart') !== -1) {
        setCartItems(user.cart);
      }
    }
  }, [user]);

  useEffect(() => {
    setRecipe(detailRecipe);
  }, [detailRecipe]);

  useEffect(() => {
    const hasObject = Boolean(location.state === undefined);
    setNeedFetch(hasObject);
    if (hasObject) {
      loadRecipe({ id });
    } else {
      setRecipe(location.state.detailRecipe);
      setServingNum(location.state.servingNum);
    }
  }, [id]);

  if (isEmpty(recipe)) {
    return <div>Recipe data is Enpty.</div>;
  }
  if (!isLoaded(recipe)) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <DetailCard
        user={user}
        cartItems={cartItems}
        recipe={needFetch ? detailRecipe : recipe}
        servingNum={servingNum}
        id={id}
        t={t}
        inCart={location.pathname.indexOf('cart') === 1}
      />
    </>
  );
};

export default Detail;
