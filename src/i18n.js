import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)

let lang = (navigator.language || navigator.userLanguage).split('-')[0]
let messages = lang === 'de' ? require('@/locales/de').default : require('@/locales/en').default

export const i18n = new VueI18n({
  locale: lang,
  fallbackLocale: 'en',
  messages // set locale messages
})

const loadedLanguages = [lang === 'de' ? 'de' : 'en'] // our default language that is preloaded

function setI18nLanguage (lang) {
  i18n.locale = lang
  document.querySelector('html').setAttribute('lang', lang)
  return lang
}

export function loadLanguageAsync(lang) {
  // If the same language
  if (i18n.locale === lang) {
    return Promise.resolve(setI18nLanguage(lang))
  }

  // If the language was already loaded
  if (loadedLanguages.includes(lang)) {
    return Promise.resolve(setI18nLanguage(lang))
  }

  // If the language hasn't been loaded yet
  return import(/* webpackChunkName: "lang-[request]" */ `@/locales/${lang}.js`).then(
    messages => {
      i18n.setLocaleMessage(lang, messages.default[lang])
      loadedLanguages.push(lang)
      return setI18nLanguage(lang)
    }
  )
}
