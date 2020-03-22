import axios from '@/utills/request.js'

/***
 * 此文件用于获取所有频道列表
 */
export function getAllChannels () {
  return axios({
    url: '/channels'
  })
}
