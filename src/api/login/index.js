// 此文件封装登录请求
import axios from '@/utills/request.js'
export function login (data) {
  return axios({
    url: '/authorizations',
    method: 'post',
    data
  })
}
