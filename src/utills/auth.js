// 此文件定义 token 的增加 获取 和删除
// const USER_TOKEN = 'heimatoutiao-mobile'// 用来存储token值

// // 创建本地token的方法
// export function setUser (user) {
//   window.localStorage.setItem(USER_TOKEN, JSON.stringify(user))
// }

// // 获取token
// export function getUser () {
//   return JSON.parse(window.localStorage.getItem(USER_TOKEN) || '{}')
// }

// // 删除token
// export function delUser () {
//   localStorage.removeItem(USER_TOKEN)
// }
const USER_TOKEN = 'heima-toutiao-mobile-94' // 专门用来存储用户信息

// 设置用户的token信息
export function setUser (user) {
  // user应该是一个对象
  window.localStorage.setItem(USER_TOKEN, JSON.stringify(user)) // 对象需要转化成字符串
}

// 获取用户的token信息
export function getUser () {
  //  将字符串转化转化成对象再返回
  return JSON.parse(window.localStorage.getItem(USER_TOKEN) || '{}') // 短路表达式
  // 如果前面为true  后面不执行 如果前面为false 后面才执行
}

// 删除用户的token信息
export function delUser () {
  // 删除token信息
  localStorage.removeItem(USER_TOKEN) // 删除用户信息
}
