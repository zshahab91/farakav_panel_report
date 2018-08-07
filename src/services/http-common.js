import axios from 'axios'
import baseConfig from '../config/config'

export const HTTP = axios.create({
  baseURL: baseConfig.url
})
