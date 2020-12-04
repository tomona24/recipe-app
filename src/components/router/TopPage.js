import React from 'react';
import { Route } from 'react-router-dom';
import Create from '../pages/Create';
import Detail from '../pages/Detail';
import Index from '../pages/Index';
import Page404 from '../pages/Page404';

const TopPage = (props) => {
  const {
    t,
    recipes,
    addNewRecipe,
    deletechosenRecipe,
    editRecipe,
    chooseRecipe,
    chosenRecipe,
    firestore,
  } = props;

  console.log(props);

  return (
    <div>
      <Route
        exact
        path="/"
        render={() => (
          <Index t={t} recipes={recipes} chooseRecipe={chooseRecipe} />
        )}
      />
      <Route
        exact
        path="/create"
        render={({ match }) => (
          <Create
            t={t}
            addNewRecipe={addNewRecipe}
            recipes={recipes}
            match={match}
          />
        )}
      />
      <Route
        path="/detail/:id"
        render={() => <Detail t={t} chosenRecipe={chosenRecipe} />}
      />
      <Route exact path="/404" render={() => <Page404 t={t} />} />
    </div>
  );
};

export default TopPage;
