import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useForm } from 'react-hook-form';
import { isLoaded } from 'react-redux-firebase';
import { useLocation, useHistory, Redirect } from 'react-router-dom';
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
import ImageArea from '../molecules/CreateImageArea';
import CreateForm from '../organisms/CreateForm';
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
    <Container component="main" maxWidth="sm">
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
          <CreateForm
            isEdit={isEdit}
            register={register}
            control={control}
            errors={errors}
            editDefaultValue={editDefaultValue}
            t={t}
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
