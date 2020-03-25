
import axios from '@/utills/request.js'
export function getSearch (params) {
  return axios({
    url: '/search',
    params
  })
}
