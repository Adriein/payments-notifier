import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import * as login from '../public/locales/en/login.json';

(async () => {
  return await i18n
    .use(initReactI18next)
    .init({
      lng: 'en',
      fallbackLng: 'en',
      resources: {
        en: {
          login: {
            title: "Enter into Nutri",
            span: "log",
            button: "Log In"
          }
        }
      },
      debug: true,
      interpolation: {
        escapeValue: false,
      },
    })
})();

export default i18n;