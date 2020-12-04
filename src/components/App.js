import React, { useState, useEffect } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import store from '../redux/store';
import TopPageContainer from '../redux/containers/TopPageContainer';
import Header from './organisms/Header';
import Footer from './organisms/Footer';

const App = (props) => {
  // const { recipes, addNewRecipe, deletechosenRecipe, editRecipe } = props;
  const [t, i18n] = useTranslation();
  const [lang, setLang] = useState('ja');
  useEffect(() => {
    i18n.changeLanguage(lang);
  }, [lang, i18n]);

  return (
    <Provider store={store}>
      <Router>
        <Header t={t} setLang={setLang} lang={lang} />
        <TopPageContainer t={t} />
        <Footer />
      </Router>
    </Provider>
  );
};

export default App;
