import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Container,
  CssBaseline,
  Grid,
  TextField,
  Typography,
  Checkbox,
  FormControlLabel,
  FormHelperText,
} from '@material-ui/core';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import LocalDiningRoundedIcon from '@material-ui/icons/LocalDiningRounded';

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(4),
  },
  checkLabel: {
    fontSize: '.8rem',
  },
}));

const SmallCheckBox = (props) => {
  const { t, label, value, onChange } = props;
  const classes = useStyles();
  return (
    <FormControlLabel
      control={
        // eslint-disable-next-line react/jsx-wrap-multilines
        <Checkbox
          color="primary"
          icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
          checkedIcon={<CheckBoxIcon fontSize="small" />}
        />
      }
      // eslint-disable-next-line prettier/prettier
      label={(
        <Typography className={classes.checkLabel}>{t(label)}</Typography>
        // eslint-disable-next-line prettier/prettier
              )}
      value={value}
      onChange={onChange}
    />
  );
};

const SearchForm = (props) => {
  const { t, setNewResearchWord, setFilterCategory, filterCategory } = props;
  const classes = useStyles();

  const handleChange = (event) => {
    const { value } = event.target;
    setNewResearchWord(value);
  };

  const addFilterCategory = (event) => {
    const { checked, value } = event.target;
    let categoryArr = filterCategory;
    if (checked) {
      categoryArr = [...categoryArr, value];
    } else {
      categoryArr = categoryArr.filter((item) => {
        return item !== value;
      });
    }
    setFilterCategory(categoryArr);
  };

  return (
    <>
      <Container component="div" maxWidth="md" className={classes.root}>
        <CssBaseline />
        <Grid
          container
          className={classes.paper}
          direction="row"
          alignItems="center"
          justify="flex-end"
        >
          <Grid item xs={12} md={4}>
            <FormHelperText component="legend">
              <LocalDiningRoundedIcon fontSize="small" />
              {t('カテゴリーで絞り込み')}
            </FormHelperText>
            <SmallCheckBox
              label="主菜"
              value="mainDish"
              onChange={addFilterCategory}
              t={t}
            />
            <SmallCheckBox
              label="副菜"
              value="sideDish"
              onChange={addFilterCategory}
              t={t}
            />
            <SmallCheckBox
              label="一品物"
              value="singleDish"
              onChange={addFilterCategory}
              t={t}
            />
            <SmallCheckBox
              label="汁物"
              value="soup"
              onChange={addFilterCategory}
              t={t}
            />
            <SmallCheckBox
              label="その他"
              value="other"
              onChange={addFilterCategory}
              t={t}
            />
          </Grid>
          <Grid item xs={12} md={8}>
            <FormHelperText component="legend">
              <LocalDiningRoundedIcon fontSize="small" />
              {t('料理名・材料から検索')}
            </FormHelperText>
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              autoFocus
              label={t('キーワードで検索')}
              name="search"
              onChange={handleChange}
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default SearchForm;
