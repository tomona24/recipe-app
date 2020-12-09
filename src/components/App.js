import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Container from '../modules/Container';
import Header from './organisms/Header';
import Footer from './organisms/Footer';

const App = () => {
  const [t, i18n] = useTranslation();
  const [lang, setLang] = useState('ja');
  useEffect(() => {
    i18n.changeLanguage(lang);
  }, [lang, i18n]);

  return (
    <>
      <Router>
        <Header t={t} setLang={setLang} lang={lang} />
        <Container t={t} />
        <Footer />
      </Router>
    </>
  );
};

export default App;
