// 导航守卫 登录拦截
import router from '@/router'
import store from '@/store'

// 给路由设置导航前置守卫
router.beforeEach(function (to, from, next) {
  const toPath = {
    path: '/login',
    query: {
      redirectUrl: to.path
    }
  }
  // 如果要跳转的导航中是user开头的,判断有没有token,没有就就拦截
  if (to.path.startsWith('/user') && !store.state.user.token) {
    // 跳转到登录页
    next(toPath)
  } else {
    next()
  }
})
export default router
