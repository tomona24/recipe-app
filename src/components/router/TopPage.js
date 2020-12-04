import React from 'react';
import { Route } from 'react-router-dom';
import Create from '../pages/Create';
import Detail from '../pages/Detail';
import Index from '../pages/Index';
import Page404 from '../pages/Page404';

const TopPage = (props) => {
  const { t } = props;
  return (
    <div>
      <Route exact path="/" render={() => <Index t={t} />} />
      <Route exact path="/create" render={() => <Create t={t} />} />
      <Route exact path="/detail" render={() => <Detail t={t} />} />
      <Route exact path="/404" render={() => <Page404 t={t} />} />
    </div>
  );
};

export default TopPage;
