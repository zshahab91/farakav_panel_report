import Vue from 'vue'
import VueI18n from 'vue-i18n'
import baseConfig from '../config/config'
import { Fa } from './fa'
import { En } from './en'

Vue.use(VueI18n)

const messages = {
  en: En,
  fa: Fa
}

const i18n = new VueI18n({
  locale: baseConfig.locale,
  messages
})
export default i18n
