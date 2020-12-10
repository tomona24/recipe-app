import React, { useState } from 'react';
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

const updateIngredients = (userInput) => {
  if (userInput === '') {
    return userInput;
  }
  const ingredientsList = {};
  userInput.split('\n').forEach((item, index) => {
    const ingDetail = item.split(' ');
    const name = ingDetail[0];
    const potionDigit = ingDetail[1].match(/[\d/~-]/gi).join('');
    const potion = strToNum(potionDigit);
    const unit = ingDetail[1].split(potionDigit).join('');
    ingredientsList[index] = { id: index, name, potion, unit };
  });
  return ingredientsList;
};

const updateInstructions = (userInput) => {
  if (userInput === '') {
    return [];
  }
  const instructions = userInput.split('\n').map((instruction, index) => {
    return {
      id: index + 1,
      order: index + 1,
      direction: instruction,
      ingredients: [],
    };
  });
  return instructions;
};

const Create = (props) => {
  const { t, addNewRecipe } = props;
  const classes = useStyles();
  const [categoryValue, setCategoryValue] = useState('sideDish');
  const [isPublic, setIsPublic] = useState(false);
  const [instructions, setInstructions] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [tags, setTags] = useState('');
  const [newRecipe, setNewRecipe] = useState(recipe);

  const radioHandleChange = (event) => {
    const { value } = event.target;
    setCategoryValue(value);
  };

  const checkHandleChange = (event) => {
    setIsPublic(event.target.checked);
  };

  const handleOnSubmit = () => {
    const createNewRecipe = newRecipe;
    createNewRecipe.ingredients = updateIngredients(ingredients);
    createNewRecipe.instructions = updateInstructions(instructions);
    createNewRecipe.tags = tags.split(/[\s,]/giu).filter((item) => item !== '');
    createNewRecipe.user = 'g14fhWPDTpxP0evHETKT';
    createNewRecipe.createdDate = new Date();
    addNewRecipe(createNewRecipe);
    setCategoryValue('sideDish');
    setIsPublic(false);
    setInstructions('');
    setIngredients('');
    setTags('');
    setNewRecipe(recipe);
  };

  const handleChange = (event) => {
    const { value, name } = event.target;
    if (name === 'instructions') {
      setInstructions(value);
      return;
    }
    if (name === 'ingredients') {
      setIngredients(value);
      return;
    }

    if (name === 'tags') {
      setTags(value);
      return;
    }

    const updateRecipe = { ...newRecipe };
    updateRecipe[name] = name === 'yeild' ? strToNum(value) : value;
    setNewRecipe(updateRecipe);
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
            onChange={handleChange}
            text={newRecipe.title}
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="cookingTime"
            label={t('調理時間')}
            name="cookingTime"
            autoComplete="cookingTime"
            onChange={handleChange}
            text={newRecipe.cookingTime}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="yeild"
            label={t('できあがりの量')}
            name="yeild"
            autoComplete="yeild"
            onChange={handleChange}
            text={newRecipe.potion}
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
            rows={8}
            multiline
            onChange={handleChange}
            text={ingredients}
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
            rows={8}
            multiline
            onChange={handleChange}
            text={instructions}
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="memo"
            label={t('メモ・コメント')}
            name="memo"
            autoComplete="memo"
            onChange={handleChange}
            text={newRecipe.memo}
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="quoted"
            label={t('由来・引用・URL')}
            name="quoted"
            autoComplete="quoted"
            onChange={handleChange}
            text={newRecipe.quoted}
          />
          <FormControlLabel
            control={
              // eslint-disable-next-line react/jsx-wrap-multilines
              <Checkbox
                value="isPrivateRecipe"
                color="primary"
                checked={isPublic}
                onChange={checkHandleChange}
              />
            }
            label={t('プライベートレシピにする（公開しない）')}
          />
          <FormLabel component="legend">Category</FormLabel>
          <RadioGroup
            aria-label="category"
            name="category"
            value={categoryValue}
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
            id="tags"
            label={t('タグ')}
            name="tags"
            autoComplete="tag"
            onChange={handleChange}
            text={tags}
          />
          <Button
            type="button"
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleOnSubmit}
          >
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
