import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import TopPageContainer from '../redux/containers/TopPageContainer';
import Header from './organisms/Header';
import Footer from './organisms/Footer';

const App = (props) => {
  const [t, i18n] = useTranslation();
  const [lang, setLang] = useState('ja');
  useEffect(() => {
    i18n.changeLanguage(lang);
  }, [lang, i18n]);

  return (
    <>
      <Router>
        <Header t={t} setLang={setLang} lang={lang} />
        <TopPageContainer t={t} />
        <Footer />
      </Router>
    </>
  );
};

export default App;
