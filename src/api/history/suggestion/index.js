
import axios from '@/utills/request.js'
export function getSuggestion (params) {
  return axios({
    url: '/suggestion',
    params
  })
}
