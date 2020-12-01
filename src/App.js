import React, { useState, useEffect} from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import i18n from 'i18next';
import { initReactI18next, useTranslation } from 'react-i18next';
import enJson from './locales/en.json';
import jaJson from './locales/ja.json';
import './App.css';

// i18nextの初期化

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: enJson },
    ja: {translation: jaJson },
  },
  lng: 'ja', // 初期表示
  fallbackLng: 'ja', // 選択した言語辞書がない場合の代替
  interpolation: { escapeValue: false}, // 補完設定
}
)

const App = () => {
  const [t, i18n] = useTranslation();
  const [lang, setLang] = useState('ja');

  useEffect(() => {
    i18n.changeLanguage(lang);
  }, [lang, i18n]);

  return (
    <div className="App">
      <Router>
      <header className="App-header">
        <p>
          {t('これは翻訳用のおためしです。')}
          Edit <code>src/App.js</code> and save to reload.
        </p>
  <button onClick={() => setLang(lang === 'en' ? 'ja' : 'en')} >{t('言語を切り替え')}</button>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      </Router>
    </div>
  );
}

export default App;
