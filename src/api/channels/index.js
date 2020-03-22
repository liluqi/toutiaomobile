/***
 * 此文件用来封装文章频道的请求
 * 改造本地缓存,游客登录和会员登录
 */
import store from '@/store'
import axios from '@/utills/request.js'
const CACHE_CHANNEL_V = 'hm-toutiaomobile-v'
const CACHE_CHANNEL_T = 'hm-toutiaomobile-t'
export function Channels () {
  return new Promise(function (resolve, reject) {
    const key = store.state.user.token ? CACHE_CHANNEL_V : CACHE_CHANNEL_T
    const str = localStorage.getItem(key)
    if (str) {
      resolve({ channels: JSON.parse(str) })
    } else {
      // str为空,本地没有缓存,要获取channels,再缓存
      axios({ url: '/user/channels' }).then(result => {
        localStorage.setItem(key, JSON.stringify(result.channels))
        resolve(result)
      })
    }
  })
}
