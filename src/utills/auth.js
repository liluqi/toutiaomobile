// 此文件定义 token 的增加 获取 和删除
const USER_TOKEN = 'heimatoutiao-mobile'// 用来存储token值

// 创建本地token的方法
export function setUser (user) {
  window.localStorage.setItem(USER_TOKEN, JSON.stringify(user))
}

// 获取token
export function getUser () {
  return JSON.parse(window.localStorage.getItem(USER_TOKEN) || '{}')
}

// 删除token
export function delUser () {
  window.localStorage.removeItem(USER_TOKEN)
}
