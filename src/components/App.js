import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import TopPage from './router/TopPage';
import Header from './organisms/Header';
import Footer from './organisms/Footer';

const App = (props) => {
  const {
    recipes,
    addNewRecipe,
    deletechosenRecipe,
    updateRecipe,
    loadRecipe,
    detailRecipe,
    updateFormData,
    cartItems,
    addToCart,
  } = props;
  const [t, i18n] = useTranslation();
  const [lang, setLang] = useState('ja');
  useEffect(() => {
    i18n.changeLanguage(lang);
  }, [lang, i18n]);

  return (
    <>
      <Router>
        <Header t={t} setLang={setLang} lang={lang} cartItems={cartItems} />
        <TopPage
          t={t}
          recipes={recipes}
          addNewRecipe={addNewRecipe}
          deletechosenRecipe={deletechosenRecipe}
          updateRecipe={updateRecipe}
          loadRecipe={loadRecipe}
          detailRecipe={detailRecipe}
          updateFormData={updateRecipe}
          cartItems={cartItems}
          addToCart={addToCart}
        />
        <Footer t={t} />
      </Router>
    </>
  );
};

export default App;
