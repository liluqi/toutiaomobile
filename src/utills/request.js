// 此文件用于封装 axios
// 请求拦截 以及 响应数据的封装  处理大数字类型数据
// 安装axios,bigint依赖
import axios from 'axios'
import JSONBigint from 'json-bigint'
import store from '@/store'
import route from '@/router'

// 新建一个instence,与之前的axios没有关系
const instence = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/app/v1_0',
  // 请求发送后,响应数据显示前,将返回的数据进行大数字处理
  transformResponse: [function (data) {
    // data为当前请求的响应数据
    return data ? JSONBigint(data) : {}
  }]
})

// 在请求拦截器注入token
instence.interceptors.request.use(function (config) {
  if (store.state.user.token) {
    config.headers.Authorization = `Bearer ${store.state.user.token}`
  }
}, function (error) {
  return Promise.reject(error)
})

// 响应拦截器中处理数据
instence.interceptors.response.use(function (response) {
  try {
    return response.data.data
  } catch (error) {
    return response.data
  }
}, async function (error) {
  // 响应错误信息为401时,tonken过期
  if (error.response && error.response.status === 401) {
    // 判断是否有refresh_token
    try {
      if (store.state.user.refresh_token) {
        // 将token值换为refresh_token
        // 这里不能用instence,因为instense还会默认注入旧的token值
        const result = await axios({
          url: 'http://ttapi.research.itcast.cn/app/v1_0/authorizations',
          header: { Authorization: `Bearer ${store.state.user.refresh_token}` },
          method: 'put'
        })
        // 此时我们刷新了token,得到了token返回值
        // 要修改store公共状态下的user,通过mutitions下的updataUser方法
        store.commit('updataUser', {
          user: {
            token: result.data.token, // 应为最新的token
            refresh_token: store.state.user.refresh_token// 还是原来的refresh
          }
        })
        // 修改公共状态user之后,也就修改了本地缓存(updataUser方法)
        return instence(error.config)
      }
    } catch (error) {
      store.commit('clearUser')
      route.push({
        path: '/login',
        query: {
          redirectUrl: route.currentRoute.path
        }
      })
    }
  } else {
    route.push({
      path: '/login',
      query: {
        redirectUrl: route.currentRoute.path
      }
    })
  }
  return Promise.reject(error)
})

// 处理tonken失效的问题
