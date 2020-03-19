/***
 * 此文件用来封装文章频道的请求
 */
import axios from '@/utills/request.js'
export function Channels () {
  return axios({
    url: '/user/channels'
  })
}
