import Vue from 'vue'
import Vuex from 'vuex'
import * as auth from '@/utills/auth.js' // 引入普通导出文件

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: auth.getUser() // vuex初始化完成时将当前token获取并共享
  },
  mutations: {
    // 要想改变user的值
    updateUser (state, payload) {
      state.user = payload.user // 给user重新赋值
      auth.setUser(payload.user) // 重新缓存
    },

    // 清空token
    delUser (state) {
      state.user = {}
      auth.delUser()// 清空缓存
    }
  },
  actions: {
  },
  modules: {
  }
})
