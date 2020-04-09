import defaultSettings from '@/settings'
import Store from '@/utils/electron-store'

const { showSettings, fixedHeader, sidebarLogo, baseURL } = defaultSettings

const state = {
  showSettings: showSettings,
  fixedHeader: fixedHeader,
  isHeader: true,
  sidebarLogo: sidebarLogo,
  // 自定义开发
  baseURL: baseURL // 主API地址
}

const mutations = {
  CHANGE_SETTING: (state, { key, value }) => {
    if (state.hasOwnProperty(key)) {
      state[key] = value
      Store.set('settings.' + key, value)
    }
  }
}

const actions = {
  changeSetting({ commit }, data) {
    commit('CHANGE_SETTING', data)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
