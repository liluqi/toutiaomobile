/***
 * 此文件用于删除用户历史记录
 */
import axios from '@/utills/request.js'
export function delHistory () {
  axios({
    url: '/search/histories',
    method: 'delete'
  })
}
