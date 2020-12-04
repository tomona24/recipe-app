import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import FormLabel from '@material-ui/core/FormLabel';
import LocalDiningRoundedIcon from '@material-ui/icons/LocalDiningRounded';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { firebaseApp, firestore } from '../../plugins/firebase';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>
      {new Date().getFullYear()}
    </Typography>
  );
}

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

const Create = (props) => {
  const { t } = props;
  const classes = useStyles();
  const [radioValue, setRadioValue] = React.useState('female');
  const radioHandleChange = (event) => {
    setRadioValue(event.target.value);
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
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="title"
            label={t('タイトル')}
            name="title"
            autoComplete="title"
            autoFocus
          />
          {/* <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="cookingTime"
            label={t('調理時間')}
            name="cookingTime"
            autoComplete="cookingTime"
            autoFocus
          /> */}
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="yeild"
            label={t('できあがりの量')}
            name="yeild"
            autoComplete="yeild"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="ingredients"
            label={t('材料')}
            name="ingredients"
            autoComplete="ingredients"
            autoFocus
            rows={8}
            multiline
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="instructions"
            label={t('作り方')}
            name="instructions"
            autoComplete="instructions"
            autoFocus
            rows={8}
            multiline
          />
          {/* <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="comments"
            label={t('メモ・コメント')}
            name="comments"
            autoComplete="comments"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="quoted"
            label={t('由来・引用')}
            name="quoted"
            autoComplete="quoted"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="url"
            label={t('URL')}
            name="url"
            autoComplete="url"
            autoFocus
          />
          <FormControlLabel
            control={<Checkbox value="isPrivateRecipe" color="primary" />}
            label={t('プライベートレシピにする（公開しない）')}
          />
          <FormLabel component="legend">Category</FormLabel>
          <RadioGroup
            aria-label="category"
            name="category"
            value={radioValue}
            onChange={radioHandleChange}
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
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="tag"
            label={t('タグ')}
            name="tittagagtle"
            autoComplete="tag"
            autoFocus
          /> */}
          <Button type="submit" fullWidth variant="contained" color="primary">
            {t('レシピを登録する')}
          </Button>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
};

export default Create;