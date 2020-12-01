import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Provider } from 'react-redux';
import store from './store';
import './App.css';

const App = () => {
  const [t, i18n] = useTranslation();
  const [lang, setLang] = useState('ja');

  useEffect(() => {
    i18n.changeLanguage(lang);
  }, [lang, i18n]);

  return (
    <Provider store={store}>
      <div className="App">
        <header className="App-header">
          <p>{t('これは翻訳用のおためしです。')}</p>
          <p>{t('これは未定義です。')}</p>

          <button
            type="button"
            onClick={() => setLang(lang === 'en' ? 'ja' : 'en')}
          >
            {t('言語を切り替え')}
          </button>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    </Provider>
  );
};

export default App;
