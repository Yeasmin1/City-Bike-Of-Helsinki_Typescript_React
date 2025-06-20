// i18next is an internationalization framework. It provides translation context.
import i18n from "i18next"; 

import { initReactI18next } from "react-i18next";
import i18nBackend from "i18next-http-backend";
import translationsInEng from './locales/en/translation.json';
import translationsInFin from './locales/fin/translation.json';

const resources = {
  en: {
    translation: translationsInEng
  },
  fin: {
    translation: translationsInFin
  },
};

i18n
  .use(i18nBackend)
  .use(initReactI18next)
  .init({
    resources, // resources are important to load translations for the languages.
    lng: "en", // It acts as default language. When the site loads, content is shown in this language.  
    debug: true,
    fallbackLng: "en", // use de if selected language is not available
    interpolation: {
      escapeValue: false
    },
    ns: "translation", // namespaces help to divide huge translations into multiple small files.
    defaultNS: "translation"
  });

export default i18n;