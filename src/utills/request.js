// // 此文件用于封装 axios
// // 请求拦截 以及 响应数据的封装  处理大数字类型数据
// // 安装axios,bigint依赖
import axios from 'axios'
import JSONBig from 'json-bigint'
import store from '@/store'
import route from '@/router'

// 新建一个instence,与之前的axios没有关系
const instance = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/app/v1_0',
  // 请求发送后,响应数据显示前,将返回的数据进行大数字处理
  transformResponse: [function (data) {
    // data为当前请求的响应数据
    return data ? JSONBig.parse(data) : {}
  }]
})

// 在请求拦截器注入token
instance.interceptors.request.use(function (config) {
  if (store.state.user.token) {
    config.headers.Authorization = `Bearer ${store.state.user.token}`
  }
  return config
}, function (error) {
  return Promise.reject(error)
})

// 响应拦截器中处理数据
instance.interceptors.response.use(function (response) {
  try {
    return response.data.data
  } catch (error) {
    return response.data
  }
}, async function (error) {
  // 响应错误信息为401时,tonken过期
  if (error.response && error.response.status === 401) {
    const path = {
      path: '/login', // 地址
      query: {
        // 需要传递的query参数
        redirectUrl: route.currentRoute.fullPath // 表示登录页需要跳转的地址
      }
      // 路由传参的两个写法  动态路由  query()
    }
    // 判断是否有refresh_token
    if (store.state.user.refresh_token) {
      try {
        // 将token值换为refresh_token
        // 这里不能用instence,因为instense还会默认注入旧的token值
        const result = await axios({
          url: 'http://ttapi.research.itcast.cn/app/v1_0/authorizations',
          method: 'put',
          headers: { Authorization: `Bearer ${store.state.user.refresh_token}` }
        })
        // 此时我们刷新了token,得到了token返回值
        // 要修改store公共状态下的user,通过mutitions下的updataUser方法
        store.commit('updateUser', {
          user: {
            token: result.data.data.token, // 应为最新的token
            refresh_token: store.state.user.refresh_token// 还是原来的refresh
          }
        })
        // 修改公共状态user之后,也就修改了本地缓存(updataUser方法)
        return instance(error.config)
      } catch (error) {
        store.commit('delUser')
        route.push(path)
      }
    } else {
      store.commit('delUser')
      route.push(path)
    }
  }
  return Promise.reject(error)
})
export default instance
