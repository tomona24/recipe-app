import React, { useState, useEffect } from 'react';
import { isLoaded, isEmpty } from 'react-redux-firebase';
import { useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import PersonOutlineRoundedIcon from '@material-ui/icons/PersonOutlineRounded';
import AccessAlarmRoundedIcon from '@material-ui/icons/AccessAlarmRounded';
import MessageRoundedIcon from '@material-ui/icons/MessageRounded';
import KitchenRoundedIcon from '@material-ui/icons/KitchenRounded';
import MenuBookRoundedIcon from '@material-ui/icons/MenuBookRounded';
import Rating from '@material-ui/lab/Rating';

import RecipeInstruction from '../atoms/RecipeInstruction';
import { data1 } from '../../modules/sampleData';
import { strToNum } from '../../utils/utils';
import LabelWithIcon from '../atoms/LabelWithIcon';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(1, 'auto'),
    width: theme.spacing(100),
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
  paper: {
    margin: theme.spacing(8, 2),
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  gridItem: {
    margin: theme.spacing(2, 2, 2),
  },
}));

const Detail = (props) => {
  const { loadRecipe, detailRecipe, t } = props;
  const { id } = useParams();
  const [recipe, setRecipe] = useState({});
  const [starRate, setStarRate] = useState(data1.star);
  const classes = useStyles();

  useEffect(() => {
    loadRecipe({ id, needFetch: true });
    setRecipe(detailRecipe);
  }, [detailRecipe]);

  if (!isLoaded(recipe)) {
    return <div>Loading...</div>;
  }
  if (isEmpty(recipe)) {
    return <div>Recipe data is Enpty.</div>;
  }
  return (
    <Grid container component={Paper} className={classes.root} spacing="2">
      <CssBaseline />
      <Grid item xs={12}>
        <Typography component="h1" variant="h3">
          {recipe.title}
        </Typography>
      </Grid>
      <Grid item sm={12} md={8} className={classes.image}>
        <img
          alt="pict"
          src="https://source.unsplash.com/random"
          className={classes.img}
        />
      </Grid>
      <Grid item xs={12} sm={12} md={4} square>
        <div className={classes.paper}>
          <Grid container>
            <Grid item xs={12}>
              <LabelWithIcon
                str="調理時間"
                t={t}
                icon={<AccessAlarmRoundedIcon />}
              />
            </Grid>
            <Grid item xs={12}>
              <Box component="fieldset" mb={3} borderColor="transparent">
                <Rating
                  name="simple-controlled"
                  value={starRate}
                  onChange={(event, newValue) => {
                    setStarRate(newValue);
                  }}
                />
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Grid container>
                <Grid item xs={12}>
                  <LabelWithIcon
                    str="メモ・コメント"
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
        <Grid container>
          <Grid item xs={12}>
            <LabelWithIcon
              str={`${recipe.yeild}人分`}
              t={t}
              icon={<PersonOutlineRoundedIcon />}
            />
          </Grid>
          <Grid item xs={12} md={2}>
            <LabelWithIcon str="材料" t={t} icon={<KitchenRoundedIcon />} />
          </Grid>
          <Grid item xs={12} md={10}>
            <Grid container>
              {Object.keys(recipe.ingredients)
                .sort()
                .map((key) => (
                  <Grid item xs={12} key={key}>
                    {recipe.ingredients[key].name}
                    {recipe.ingredients[key].potion}
                    {recipe.ingredients[key].unit}
                  </Grid>
                ))}
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <LabelWithIcon str="作り方" t={t} icon={<MenuBookRoundedIcon />} />
            <RecipeInstruction
              instructions={recipe.instructions}
              ingredients={recipe.ingredients}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Detail;
