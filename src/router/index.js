import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const FILE = {
  layout: () => import('../views/layout'),
  home: () => import('../views/home'),
  questions: () => import('../views/questions'),
  video: () => import('../views/video'),
  user: () => import('../views/user'),
  search: () => import('../views/search'),
  result: () => import('../views/search/result'),
  login: () => import('../views/login'),
  chat: () => import('../views/user/chat'),
  profile: () => import('../views/user/profile'),
  article: () => import('../views/article')
}

const routes = [
  {
    path: '/',
    name: 'Layout',
    component: FILE.layout,
    children: [
      {
        path: '',
        component: FILE.home
      }, {
        path: '/questions',
        component: FILE.questions
      }, {
        path: '/video',
        component: FILE.video
      }, {
        path: '/user',
        component: FILE.user
      }
    ]
  }, {
    path: '/article',
    component: FILE.article
  }, {
    path: '/login',
    component: FILE.login
  }, {
    path: '/search',
    component: FILE.search
  }, {
    path: '/search/result',
    component: FILE.result
  }, {
    path: '/user/chat',
    component: FILE.chat
  }, {
    path: '/user/profile',
    component: FILE.profile
  }
]

const router = new VueRouter({
  routes
})

export default router
