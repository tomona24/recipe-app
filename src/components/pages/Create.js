import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { isLoaded } from 'react-redux-firebase';
import { useLocation, useHistory, Redirect } from 'react-router-dom';
import Rating from '@material-ui/lab/Rating';
import LocalDiningRoundedIcon from '@material-ui/icons/LocalDiningRounded';
import { makeStyles } from '@material-ui/core/styles';
import {
  Typography,
  Container,
  Checkbox,
  Grid,
  Box,
  FormLabel,
  FormControlLabel,
  RadioGroup,
  Radio,
  TextField,
  CssBaseline,
  Button,
  Avatar,
} from '@material-ui/core';
import { addRecipe, updateRecipe } from '../../modules/recipes';
import { saveImages, setImages, deleteImages } from '../../modules/images';
import { updateFormData } from '../../modules/form';
import { validation } from '../../utils/formValidation';
import ImageArea from '../molecules/ImageArea';
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
  button: {
    margin: theme.spacing(1),
  },
}));

const Create = (props) => {
  const {
    t,
    addNewRecipe,
    updateCurrentRecipe,
    auth,
    images,
    saveImageFiles,
    setImageFiles,
    deleteImageFiles,
  } = props;
  const location = useLocation();
  const history = useHistory();
  const [isEdit, setIsEdit] = useState(Boolean(location.state));
  const [editRecipe, setEditRecipe] = useState(
    !isEdit ? {} : location.state.editRecipe
  );

  useEffect(() => {
    if (isLoaded(images)) {
      setImageFiles(!isEdit ? [] : location.state.editRecipe.images);
    }
  }, []);
  const [editDefaultValue, setEditDefaultValue] = useState(
    !isEdit
      ? {}
      : {
          title: editRecipe.title,
          cookingTime: editRecipe.cookingTime,
          yeild: editRecipe.yeild,
          ingredients: Object.keys(editRecipe.ingredients)
            .map((key) => {
              return `${ingredientsConverter.createOneIngStr(
                editRecipe.ingredients[key]
              )}\n`;
            })
            .join(''),
          instructions: Object.keys(editRecipe.instructions)
            .map((key) => {
              return `${editRecipe.instructions[key].direction}\n`;
            })
            .join(''),
          memo: editRecipe.memo,
          star: editRecipe.star,
          quoted: editRecipe.quoted,
          isPublic: editRecipe.isPublic,
          category: editRecipe.category,
        }
  );

  const classes = useStyles();
  const { register, handleSubmit, control, errors, reset, formState } = useForm(
    {
      mode: 'onChange',
      defaultValues: editDefaultValue,
    }
  );

  const onSubmit = (data) => {
    const recipe = data;
    recipe.ingredients = ingredientsConverter.fromStringToObj(data.ingredients);
    recipe.star = parseInt(recipe.star, 10);
    recipe.updatedDate = new Date();
    recipe.images = images;
    if (isEdit) {
      const newInstructions = instructionsConverter(data.instructions);
      const checkNew = new Array(newInstructions.length);
      for (let i = 0; i < editRecipe.instructions.length; i += 1) {
        const editInstruction = editRecipe.instructions[i];
        for (let k = 0; k < checkNew.length; k += 1) {
          if (checkNew[k] == null) {
            if (editInstruction.direction === newInstructions[k].direction) {
              newInstructions[k].ingredients = editInstruction.ingredients;
              checkNew[k] = true;
            }
          }
        }
      }
      recipe.instructions = newInstructions;
      recipe.id = editRecipe.id;
      updateCurrentRecipe(recipe);
    } else {
      recipe.tags = [];
      recipe.instructions = instructionsConverter(data.instructions);
      addNewRecipe(recipe);
    }
    history.push('/');
    reset();
  };
  if (!auth.uid) return <Redirect to="/" />;
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
        <ImageArea
          images={images}
          saveImages={saveImageFiles}
          deleteImages={deleteImageFiles}
          t={t}
        />

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
                type="number"
                label={t('できあがりの量')}
                name="yeild"
                inputRef={register(validation.yeild)}
                error={Boolean(errors.yeild)}
                helperText={
                  errors.yeild && validation.yeild[errors.yeild.type].message
                }
              />
            </Grid>
            <Grid item>{t('人分')}</Grid>
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
              <Grid item>{t('お気に入り度')}</Grid>
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
          <Controller
            name="category"
            as={
              // eslint-disable-next-line react/jsx-wrap-multilines
              <RadioGroup name="category">
                <FormControlLabel
                  value="mainDish"
                  control={<Radio />}
                  label={t('主菜')}
                />
                <FormControlLabel
                  value="sideDish"
                  control={<Radio />}
                  label={t('副菜')}
                />
                <FormControlLabel
                  value="singleDish"
                  control={<Radio />}
                  label={t('一品物')}
                />
                <FormControlLabel
                  value="soup"
                  control={<Radio />}
                  label={t('汁物')}
                />
                <FormControlLabel
                  value="other"
                  control={<Radio />}
                  label={t('その他')}
                />
              </RadioGroup>
            }
            control={control}
            defaultValue={isEdit ? editDefaultValue.category : 'mainDish'}
          />
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
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={!formState.isValid}
          >
            {t('ストックする')}
          </Button>
        </form>
      </div>
    </Container>
  );
};
const mapStateToProps = (state) => {
  return { auth: state.firebase.auth, images: state.images, state };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addNewRecipe: (recipe) => {
      dispatch(addRecipe(recipe));
    },
    updateCurrentRecipe: (recipe) => {
      dispatch(updateRecipe(recipe));
    },
    updateFormInput: (data) => {
      dispatch(updateFormData(data));
    },
    saveImageFiles: (images) => {
      dispatch(saveImages(images));
    },
    setImageFiles: (images) => {
      dispatch(setImages(images));
    },
    deleteImageFiles: (images) => {
      dispatch(deleteImages(images));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Create);
