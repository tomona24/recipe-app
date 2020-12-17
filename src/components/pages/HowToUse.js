import React, { useState, useEffect } from 'react';
import { isLoaded, isEmpty } from 'react-redux-firebase';
import { CssBaseline, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
}));

const recipeModel = {
  id: 1,
  title: 'StockRecipe',
  picture: [],
  category: [],
  tags: [],
  instructions: [
    {
      id: '1',
      order: '1',
      ingredients: [],
    },
  ],
  // instructionsとingredientsと配列を→オブジェクト：IDとオーダー
  ingredients: {
    id: '',
    name: '',
    potion: [], // veiw: '2~5'
    unit: {
      pre: '',
      denominator: [], // view:'/5' or '/5~ /5'
      su: '',
    },
  },
  yeild: null,
  quoted: [],
  createdDate: new Date(),
  updatedDate: new Date(),
  isPublic: false,
};

const HowToUse = (props) => {
  const { t } = props;
  const [researchWord, setResearchWord] = useState('');
  const classes = useStyles();

  return (
    <>
      <CssBaseline />
      <Container className={classes.root} maxWidth="md">

      </Container>
    </>
  );
};

export default HowToUse;
