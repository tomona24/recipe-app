import React, { useState, useEffect } from 'react';
import { Controller } from 'react-hook-form';
import { makeStyles } from '@material-ui/core/styles';
import Rating from '@material-ui/lab/Rating';
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
import { validation } from '../../utils/formValidation';
import Dnd from './Dnd';

const useStyles = makeStyles((theme) => ({
  spacing: {
    margin: theme.spacing(2, 0),
    padding: 0,
  },
}));

const CreateForm = (props) => {
  const { isEdit, register, control, errors, editDefaultValue, t } = props;
  const classes = useStyles();

  return (
    <>
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
        helperText={errors.title && validation.title[errors.title.type].message}
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
      <Grid container direction="row" alignItems="center" justify="flex-start">
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
      <Dnd />
      <TextField
        variant="outlined"
        margin="normal"
        fullWidth
        label={t('メモ・コメント')}
        name="memo"
        inputRef={register(validation.memo)}
        error={Boolean(errors.memo)}
        helperText={errors.memo && validation.memo[errors.memo.type].message}
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
    </>
  );
};

export default CreateForm;
