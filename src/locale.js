import i18next from 'i18next';
import * as en from '../locale/en.yaml';

const resources = {
  cs: () => import('../locale/cs.yaml'),
  cy: () => import('../locale/cy.yaml'),
  de: () => import('../locale/de.yaml'),
  es: () => import('../locale/es.yaml'),
  fr: () => import('../locale/fr.yaml'),
  ko: () => import('../locale/ko.yaml'),
  nl: () => import('../locale/nl.yaml'),
  pt: () => import('../locale/pt.yaml'),
  zh: () => import('../locale/zh.yaml')
};

class UwaveBackend {
  static type = 'backend';
  type = 'backend';
  cache = { en: Promise.resolve(en) };

  getResource(language) {
    if (this.cache[language]) {
      return this.cache[language];
    }
    if (!resources[language]) {
      return Promise.reject(new Error(`The language "${language}" is not supported.`));
    }

    this.cache[language] = resources[language]();

    return this.cache[language];
  }

  read(language, namespace, callback) {
    this.getResource(language)
      .then(resource => resource[namespace])
      .then((result) => {
        callback(null, result);
      })
      .catch(callback);
  }
}

i18next.use(new UwaveBackend());

i18next.init({
  fallbackLng: 'en',
  defaultNS: 'uwave',
  interpolation: {
    // Prevent double-escapes: React already escapes things for us
    escapeValue: false
  }
});

export const availableLanguages = [ 'en', ...Object.keys(resources) ];

export default function createLocale(language) {
  const locale = i18next.cloneInstance();
  locale.availableLanguages = availableLanguages;

  return new Promise((resolve) => {
    locale.changeLanguage(language, () => {
      resolve(locale);
    });
  });
}
