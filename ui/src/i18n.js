import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import English from "./languages/en/translation.json";
import French from "./languages/fr/translation.json";
import Spanish from "./languages/es/translation.json";

let language = localStorage.getItem('language');
if (!language) {
  language = "en";
}

const resources = {
  en: {
    translation: English
  },
  fr: {
    translation: French
  },
  es: {
    translation: Spanish
  }
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: language,

    keySeparator: false, // we do not use keys in form messages.welcome

    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

  export default i18n;