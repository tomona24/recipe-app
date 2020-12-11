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
import { Link } from 'react-router-dom';
import Box from '@material-ui/core/Box';
import LocalDiningRoundedIcon from '@material-ui/icons/LocalDiningRounded';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import recipe from '../../modules/recipedata';
import { strToNum } from '../../utils/utils';
import { ingredientsValidation } from '../../utils/formValidation';

const useStyles = makeStyles(() => ({
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
}));
// {
//   mode: 'onChange',
// }
const Create = (props) => {
  const { t, updateFormData } = props;
  const { register, handleSubmit, control, errors } = useForm();
  const classes = useStyles();

  const onSubmit = (data) => updateFormData(data);

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
            label={t('タイトル')}
            name="title"
            inputRef={register({
              required: 'required!',
              maxLength: 30,
            })}
            error={Boolean(errors.example1)}
            helperText={errors.example1 && t('アウトです。')}
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            label={t('調理時間')}
            name="cookingTime"
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label={t('できあがりの量')}
            name="yeild"
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label={t('材料')}
            name="ingredients"
            rows={8}
            multiline
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
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            label={t('メモ・コメント')}
            name="memo"
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            label={t('由来・引用・URL')}
            name="quoted"
          />
          <FormControlLabel
            control={
              // eslint-disable-next-line react/jsx-wrap-multilines
              <Checkbox value="isPrivateRecipe" color="primary" />
            }
            label={t('プライベートレシピにする（公開しない）')}
          />
          <FormLabel component="legend">Category</FormLabel>
          <RadioGroup aria-label="category" name="category">
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
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            label={t('タグ')}
            name="tags"
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

// 成功したほう

const CreateE = (props) => {
  const { t, updateFormData } = props;
  const { register, handleSubmit, control, errors } = useForm();
  const classes = useStyles();

  const onSubmit = (data) => updateFormData(data);

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
            label="example1"
            fullWidth
            name="example1"
            inputRef={register({
              required: 'required!',
              maxLength: 3,
            })}
            error={Boolean(errors.example1)}
            helperText={errors.example1 && 'アウトです。'}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label={t('タイトル')}
            name="title"
            inputRef={register({
              required: 'required!',
              maxLength: 3,
            })}
            error={Boolean(errors.title)}
            helperText={errors.title && 'アウトです。'}
            autoFocus
          />
          <Button type="submit" variant="contained" color="primary">
            submit
          </Button>
        </form>
      </div>
    </Container>
  );
};
