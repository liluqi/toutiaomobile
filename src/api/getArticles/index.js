/***
 *
 * 此文件用于获取各频道的文章信息
 */
import axios from '@/utills/request.js'
export function getArticles (params) {
  return axios({
    url: 'http://ttapi.research.itcast.cn/app/v1_1/articles',
    params: { with_top: 1, ...params }
  })
}
