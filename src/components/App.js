import React, { useState, useEffect } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import store from '../redux/store';
import TopPage from './router/TopPage';
import Header from './organisms/Header';

const App = () => {
  const [t, i18n] = useTranslation();
  const [lang, setLang] = useState('ja');
  useEffect(() => {
    i18n.changeLanguage(lang);
  }, [lang, i18n]);

  return (
    <Provider store={store}>
      <Router>
        <Header t={t} setLang={setLang} lang={lang} />
        <TopPage t={t} />
      </Router>
    </Provider>
  );
};

export default App;
