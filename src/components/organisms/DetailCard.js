import React, { useState, useEffect } from 'react';
import { isLoaded, isEmpty } from 'react-redux-firebase';
import { useParams, useLocation } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { BigNumber } from 'bignumber.js';
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
import { yellow } from '@material-ui/core/colors';
import RecipeInstruction from '../atoms/RecipeInstruction';
import LabelWithIcon from '../atoms/LabelWithIcon';
import IngredientLabel from '../atoms/IngredientLabel';
import MenuForRecipe from '../atoms/MenuForRecipe';

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

const DetailCard = (props) => {
  const { user, cartItems, recipe, servingNum, id, t } = props;
  const [yeildPotion, setYeildPotion] = useState(servingNum);
  const [viewIngredients, setViewIngredients] = useState({});
  const classes = useStyles();

  useEffect(() => {
    const viewIng = JSON.parse(JSON.stringify(recipe)).ingredients;
    const newIngredients = viewIng;
    Object.keys(newIngredients).forEach((key) => {
      const newPotion = recipe.ingredients[key].potion.map((po) => {
        const newPo = BigNumber(po).times(yeildPotion).dp(2);
        return newPo;
      });
      viewIng[key].potion = newPotion;
    });
    setViewIngredients(viewIng);
  }, [yeildPotion]);

  const handleChange = (event) => {
    const newValue = event.target.value;
    if (yeildPotion !== newValue) {
      setYeildPotion(newValue);
    }
  };
  return (
    <Container maxWidth="md">
      <Paper className={classes.paper}>
        <Grid container component="main" spacing={2}>
          <CssBaseline />
          <Grid item md={11} xs={10}>
            <Typography component="h1" variant="h4">
              {recipe.title}
            </Typography>
          </Grid>
          <Grid item md={1} xs={2}>
            <MenuForRecipe
              t={t}
              recipe={{ ...recipe, id }}
              cartItems={cartItems}
              servingNum={yeildPotion}
            />
          </Grid>
          <Grid item sm={12} md={8} className={classes.image}>
            <img
              alt="pict"
              src="https://source.unsplash.com/random"
              className={classes.img}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <div className={classes.subInfo}>
              <Grid container>
                <Grid item xs={12} className={classes.gridItem}>
                  <LabelWithIcon
                    str={`${t('調理時間')} : ${
                      recipe.cookingTime ? recipe.cookingTime : '-'
                    }`}
                    t={t}
                    icon={<AccessAlarmRoundedIcon />}
                  />
                </Grid>
                <Grid item xs={12} className={classes.gridItem}>
                  <LabelWithIcon
                    str={t('お気に入り度')}
                    t={t}
                    icon={<StarsRoundedIcon />}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Box
                    component="fieldset"
                    mb={3}
                    borderColor="transparent"
                    marginBottom="0"
                  >
                    <Rating
                      name="simple-controlled"
                      value={recipe.star}
                      readOnly
                    />
                  </Box>
                </Grid>
                <Grid item xs={12} className={classes.gridItem}>
                  <Grid container>
                    <Grid item xs={12}>
                      <LabelWithIcon
                        str={t('メモ・コメント')}
                        t={t}
                        icon={<MessageRoundedIcon />}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="body2">{recipe.memo}</Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </div>
          </Grid>
          <Grid item xs={12}>
            <Grid container alignContent="flex-start">
              <Grid item xs={12} className={classes.gridItem}>
                <Box display="flex" justifyContent="flex-start">
                  <LabelWithIcon
                    str={`${recipe.yeild} ${t(`人分`)} × `}
                    t={t}
                    icon={<PersonOutlineRoundedIcon />}
                  />
                  <FormControl className={classes.formControl}>
                    <Select
                      labelId="detail-times-num"
                      id="detail-times-num"
                      value={yeildPotion}
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
                </Box>
              </Grid>
              <Grid item xs={12} md={2} className={classes.gridItem}>
                <LabelWithIcon
                  str={t('材料')}
                  t={t}
                  icon={<KitchenRoundedIcon />}
                />
              </Grid>
              <Grid item xs={12} md={9} className={classes.gridItem}>
                <IngredientLabel
                  ingredients={viewIngredients}
                  parentComp="Detail"
                />
              </Grid>
              <Grid item xs={12} md={2} className={classes.gridItem}>
                <LabelWithIcon
                  str={t('作り方')}
                  t={t}
                  icon={<MenuBookRoundedIcon />}
                />
              </Grid>
              <Grid item xs={12} md={9}>
                <RecipeInstruction
                  instructions={recipe.instructions}
                  ingredients={viewIngredients}
                />
              </Grid>
            </Grid>
          </Grid>
          {recipe.quoted !== '' ? (
            <Quoted
              t={t}
              quoted={recipe.quoted}
              classesQuote={classes.quoted}
            />
          ) : (
            <></>
          )}
        </Grid>
      </Paper>
    </Container>
  );
};

export default DetailCard;
