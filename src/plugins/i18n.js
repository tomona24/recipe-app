import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enJson from '../locales/en.json';
import jaJson from '../locales/ja.json';

// i18nextの初期化
i18n.use(initReactI18next).init({
  resources: {
    en: { translation: enJson },
    ja: { translation: jaJson },
  },
  lng: 'ja', // 初期表示
  fallbackLng: false, // 選択した言語辞書がない場合の代替 -> false = keyをそのまま表示
  returnEmptyString: false, // 空文字での定義を許可
});

export default i18n;
