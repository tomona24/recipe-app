import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { Link, useLocation } from 'react-router-dom';
import Box from '@material-ui/core/Box';
import Rating from '@material-ui/lab/Rating';
import LocalDiningRoundedIcon from '@material-ui/icons/LocalDiningRounded';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { strToNum } from '../../utils/utils';
import { validation, ingredientsValidation } from '../../utils/formValidation';
import {
  ingredientsConverter,
  instructionsConverter,
} from '../../utils/formConverter';

const useStyles = makeStyles((theme) => ({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    backgroundColor: '#ccc',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
  },
  spacing: {
    margin: theme.spacing(2, 0),
    padding: 0,
  },
}));

const Create = (props) => {
  const { t, updateFormData, addNewRecipe } = props;
  const location = useLocation();
  const [editRecipe, setEditRecipe] = useState(null);
  const [starRate, setStarRate] = useState(0);
  const classes = useStyles();
  const { register, handleSubmit, control, errors, reset } = useForm({
    mode: 'onChange',
    defaultValues: {
      title: editRecipe ? editRecipe.title : '',
      cookingTime: editRecipe ? editRecipe.cookingTime : '',
      yeild: editRecipe ? editRecipe.yeild : '',
      ingredients: editRecipe
        ? Object.keys(editRecipe.ingredients)
            .map((key) => {
              return ingredientsConverter.createOneIngStr(
                editRecipe.ingredients[key]
              );
            })
            .join('')
        : '',
      instructions: editRecipe
        ? Object.keys(editRecipe.instructions).map((key) => {
            return `${editRecipe.instructions[key].direction}\n`;
          })
        : '',
      memo: editRecipe ? editRecipe.memo : '',
      star: editRecipe ? editRecipe.star : 0,
      quoted: editRecipe ? editRecipe.quoted[0] : '',
      isPublic: editRecipe ? editRecipe.isPublic : '',
      category: editRecipe ? editRecipe.category : '',
      //   tags: editRecipe
      //     ? Object.keys(editRecipe.tags)
      //         .map((key) => {
      //           return `${editRecipe.tags[key]}, `;
      //         })
      //         .join('')
      //     : '',
      // },
    },
  });

  useEffect(() => {
    if (Boolean(location.state) && Boolean(location.state.editRecipe)) {
      setEditRecipe(location.state.editRecipe);
    }
  }, [editRecipe]);

  const onSubmit = (data) => {
    const recipe = data;
    recipe.ingredients = ingredientsConverter.fromStringToObj(data.ingredients);
    recipe.instructions = instructionsConverter(data.instructions);
    recipe.user = 'g14fhWPDTpxP0evHETKT';
    recipe.createdDate = new Date();
    recipe.star = parseInt(recipe.star, 10);
    updateFormData(recipe);
    addNewRecipe(recipe);
    reset();
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LocalDiningRoundedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {t('レシピの登録')}
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            autoFocus
            label={t('タイトル')}
            name="title"
            inputRef={register(validation.title)}
            error={Boolean(errors.title)}
            helperText={
              errors.title && validation.title[errors.title.type].message
            }
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            label={t('調理時間')}
            name="cookingTime"
            inputRef={register(validation.cookingTime)}
            error={Boolean(errors.cookingTime)}
            helperText={
              errors.cookingTime &&
              validation.cookingTime[errors.cookingTime.type].message
            }
          />
          <Grid
            container
            direction="row"
            alignItems="center"
            justify="flex-start"
          >
            <Grid item>
              <TextField
                variant="outlined"
                margin="normal"
                required
                label={t('できあがりの量')}
                name="yeild"
                inputRef={register(validation.yeild)}
                error={Boolean(errors.yeild)}
                helperText={
                  errors.yeild && validation.yeild[errors.yeild.type].message
                }
              />
            </Grid>
            <Grid item>人前</Grid>
          </Grid>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label={t('材料')}
            name="ingredients"
            rows={8}
            multiline
            inputRef={register(validation.ingredients)}
            error={Boolean(errors.ingredients)}
            helperText={errors.ingredients && validation.ingredients.message}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label={t('作り方')}
            name="instructions"
            rows={8}
            multiline
            inputRef={register(validation.instructions)}
            error={Boolean(errors.instructions)}
            helperText={
              errors.instructions &&
              validation.instructions[errors.instructions.type].message
            }
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            label={t('メモ・コメント')}
            name="memo"
            inputRef={register(validation.memo)}
            error={Boolean(errors.memo)}
            helperText={
              errors.memo && validation.memo[errors.memo.type].message
            }
          />
          <Box
            component="fieldset"
            mb={3}
            borderColor="transparent"
            className={classes.spacing}
          >
            <Grid
              container
              direction="row"
              alignItems="center"
              justify="flex-start"
              spacing={2}
            >
              <Grid item>お気に入り度</Grid>
              <Grid item>
                <Controller
                  as={<Rating />}
                  control={control}
                  name="star"
                  defaultValue={0}
                />
              </Grid>
            </Grid>
          </Box>
          <FormLabel component="legend">Category</FormLabel>
          <RadioGroup
            aria-label="category"
            name="category"
            inputRef={register}
            required
          >
            <FormControlLabel
              value="sideDish"
              control={<Radio />}
              label="Side Dish"
            />
            <FormControlLabel
              value="singleDish"
              control={<Radio />}
              label="Single Dish"
            />
            <FormControlLabel value="soup" control={<Radio />} label="Soup" />
            <FormControlLabel value="other" control={<Radio />} label="Other" />
          </RadioGroup>
          {/* <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            label={t('タグ')}
            name="tags"
            inputRef={register(validation.tags)}
            error={Boolean(errors.tags)}
            helperText={
              errors.tags && validation.tags[errors.tags.type].message
            }
          /> */}
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            label={t('由来・引用・URL')}
            name="quoted"
            inputRef={register(validation.quoted)}
            error={Boolean(errors.quoted)}
            helperText={
              errors.quoted && validation.quoted[errors.quoted.type].message
            }
          />
          <FormControlLabel
            control={
              // eslint-disable-next-line react/jsx-wrap-multilines
              <Checkbox value="isPrivateRecipe" color="primary" />
            }
            label={t('プライベートレシピにする（公開しない）')}
            inputRef={register}
            name="isPrivate "
          />
          <Button type="submit" variant="contained" color="primary">
            submit
          </Button>
        </form>
      </div>
    </Container>
  );
};

export default Create;
