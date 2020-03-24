/***
 * 此文件用于获取用户历史记录
 */
import axios from '@/utills/request.js'
export function getHistory () {
  axios({
    url: '/search/histories'
  })
}
