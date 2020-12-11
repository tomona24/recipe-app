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
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import RecipeInstruction from '../atoms/RecipeInstruction';
import { data1 } from '../../modules/sampleData';
import { strToNum } from '../../utils/utils';
import LabelWithIcon from '../atoms/LabelWithIcon';
import IngredientLabel from '../atoms/IngredientLabel';

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
    margin: theme.spacing(2, 2, 0),
  },
  formControl: {
    margin: theme.spacing(0, 2),
    minWidth: 50,
  },
  selectEmpty: {
    marginTop: theme.spacing(0),
  },
}));

const Detail = (props) => {
  const { loadRecipe, detailRecipe, t } = props;
  const { id } = useParams();
  const [recipe, setRecipe] = useState({});
  const [yeildPotion, setYeildPotion] = useState(1);
  const classes = useStyles();

  useEffect(() => {
    loadRecipe({ id, needFetch: true });
  }, []);

  // useEffect(() => {
  //   setRecipe(detailRecipe);
  // }, [detailRecipe]);

  useEffect(() => {
    console.log('change!');
  }, [yeildPotion]);

  const handleChange = (event) => {
    setYeildPotion(Number(event.target.value));
  };

  if (!isLoaded(detailRecipe)) {
    return <div>Loading...</div>;
  }
  if (isEmpty(detailRecipe)) {
    return <div>Recipe data is Enpty.</div>;
  }
  return (
    <Paper className={classes.root}>
      <Grid container component="main" spacing={2}>
        <CssBaseline />
        <Grid item xs={12}>
          <Typography component="h1" variant="h3">
            {detailRecipe.title}
          </Typography>
        </Grid>
        <Grid item sm={12} md={8} className={classes.image}>
          <img
            alt="pict"
            src="https://source.unsplash.com/random"
            className={classes.img}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <div className={classes.paper}>
            <Grid container>
              <Grid item xs={12} className={classes.gridItem}>
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
                    value={detailRecipe.star}
                    readOnly
                  />
                </Box>
              </Grid>
              <Grid item xs={12} className={classes.gridItem}>
                <Grid container>
                  <Grid item xs={12}>
                    <LabelWithIcon
                      str="メモ・コメント"
                      t={t}
                      icon={<MessageRoundedIcon />}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="body2">{detailRecipe.memo}</Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </div>
        </Grid>
        <Grid item xs={12}>
          <Grid container>
            <Grid item xs={12} className={classes.gridItem}>
              <Box display="flex" justifyContent="flex-start">
                <LabelWithIcon
                  str={`${detailRecipe.yeild}人分 *`}
                  t={t}
                  icon={<PersonOutlineRoundedIcon />}
                />
                <FormControl className={classes.formControl}>
                  <Select
                    labelId="demo-simple-select-placeholder-label-label"
                    id="demo-simple-select-placeholder-label"
                    value={yeildPotion}
                    onChange={handleChange}
                    displayEmpty
                    className={classes.selectEmpty}
                  >
                    <MenuItem value={1}>1</MenuItem>
                    <MenuItem value={2}>2</MenuItem>
                    <MenuItem value={3}>3</MenuItem>
                    <MenuItem value={4}>4</MenuItem>
                    <MenuItem value={5}>5</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Grid>
            <Grid item xs={12} md={1} className={classes.gridItem}>
              <LabelWithIcon str="材料" t={t} icon={<KitchenRoundedIcon />} />
            </Grid>
            <Grid item xs={12} md={8} className={classes.gridItem}>
              <IngredientLabel ingredients={detailRecipe.ingredients} />
            </Grid>
            <Grid item xs={12} className={classes.gridItem}>
              <LabelWithIcon
                str="作り方"
                t={t}
                icon={<MenuBookRoundedIcon />}
              />
              <RecipeInstruction
                instructions={detailRecipe.instructions}
                ingredients={detailRecipe.ingredients}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Detail;
