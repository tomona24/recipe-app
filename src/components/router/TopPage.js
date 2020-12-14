import React from 'react';
import { Route, Switch } from 'react-router-dom';
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
    updateRecipe,
    loadRecipe,
    detailRecipe,
    updateFormData,
  } = props;

  return (
    <div>
      <Switch>
        <Route
          exact
          path="/"
          render={() => (
            <Index
              t={t}
              recipes={recipes}
              loadRecipe={loadRecipe}
              deletechosenRecipe={deletechosenRecipe}
            />
          )}
        />
        <Route
          path="/create"
          render={({ match }) => (
            <Create
              t={t}
              addNewRecipe={addNewRecipe}
              recipes={recipes}
              updateRecipe={updateRecipe}
              updateFormData={updateFormData}
            />
          )}
        />
        <Route
          path="/detail/:id"
          render={() => (
            <Detail t={t} loadRecipe={loadRecipe} detailRecipe={detailRecipe} />
          )}
        />
        <Route render={() => <Page404 t={t} />} />
      </Switch>
    </div>
  );
};

export default TopPage;
