import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';

(async () => {
  return await i18n
    .use(Backend)
    .use(initReactI18next)
    .init({
      lng: 'es',
      fallbackLng: 'en',
      debug: true,
      interpolation: {
        escapeValue: false,
      },
    })
})();

export default i18n;