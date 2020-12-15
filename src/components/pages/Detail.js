import React, { useState, useEffect } from 'react';
import { isLoaded, isEmpty } from 'react-redux-firebase';
import { useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import {
  Container,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Paper,
  Box,
  Grid,
  Typography,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import PersonOutlineRoundedIcon from '@material-ui/icons/PersonOutlineRounded';
import AccessAlarmRoundedIcon from '@material-ui/icons/AccessAlarmRounded';
import MessageRoundedIcon from '@material-ui/icons/MessageRounded';
import KitchenRoundedIcon from '@material-ui/icons/KitchenRounded';
import MenuBookRoundedIcon from '@material-ui/icons/MenuBookRounded';
import StarsRoundedIcon from '@material-ui/icons/StarsRounded';
import Rating from '@material-ui/lab/Rating';
import RecipeInstruction from '../atoms/RecipeInstruction';
import { strToNum } from '../../utils/utils';
import LabelWithIcon from '../atoms/LabelWithIcon';
import IngredientLabel from '../atoms/IngredientLabel';
import MenuForRecipe from '../atoms/MenuForRecipe';

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
}));

const Detail = (props) => {
  const { loadRecipe, detailRecipe, t, deletechosenRecipe } = props;
  const { id } = useParams();
  const [yeildPotion, setYeildPotion] = useState(1);
  const classes = useStyles();

  useEffect(() => {
    loadRecipe({ id, needFetch: true });
  }, [id]);

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
    <Container maxWidth="md">
      <Paper className={classes.paper}>
        <Grid container component="main" spacing={2}>
          <CssBaseline />
          <Grid item md={11} xs={10}>
            <Typography component="h1" variant="h4">
              {detailRecipe.title}
            </Typography>
          </Grid>
          <Grid item md={1} xs={2}>
            <MenuForRecipe
              t={t}
              recipe={detailRecipe}
              deletechosenRecipe={deletechosenRecipe}
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
                      detailRecipe.cookingTime ? detailRecipe.cookingTime : '-'
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
                      value={detailRecipe.star}
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
                      <Typography variant="body2">
                        {detailRecipe.memo}
                      </Typography>
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
                    str={`${detailRecipe.yeild} ${t(`人分`)} *`}
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
              <Grid item xs={12} md={2} className={classes.gridItem}>
                <LabelWithIcon
                  str={t('材料')}
                  t={t}
                  icon={<KitchenRoundedIcon />}
                />
              </Grid>
              <Grid item xs={12} md={9} className={classes.gridItem}>
                <IngredientLabel
                  ingredients={detailRecipe.ingredients}
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
                  instructions={detailRecipe.instructions}
                  ingredients={detailRecipe.ingredients}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default Detail;
