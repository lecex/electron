import { onLine, isServer } from '@/utils/healthy'
const state = {
  date: new Date(), // 修改数据date
  onLine: false,
  isServer: false,
  isInternet: false,
  interval: null
}

const mutations = {
  SET_HEALTHY: async(state) => {
    state.onLine = onLine()
    state.isServer = await isServer()
  },
  SET_INTERVAL: (state, interval) => {
    state.interval = interval
  },
  CLEAR_INTERVAL: (state) => {
    clearInterval(state.interval)
    state.interval = null
  }
}

const actions = {
  intervalHealthy({ commit }) {
    commit('SET_HEALTHY')
    commit('SET_INTERVAL', setInterval(() => {
      commit('SET_HEALTHY')
    }, 5000)) // 健康监测时间 5s 默认
  },
  clearInterval({ commit }) { // 注销旧的定时器
    commit('CLEAR_INTERVAL')
  }
}
setInterval(() => {
  state.date = new Date() // 修改数据date
}, 1000)
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
