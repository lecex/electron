import defaultSettings from '@/settings'
import Store from '@/utils/electron-store'

const { showSettings, fixedHeader, sidebarLogo, baseUrl } = defaultSettings

const state = {
  showSettings: showSettings,
  fixedHeader: fixedHeader,
  baseUrl: baseUrl,
  isHeader: true,
  sidebarLogo: sidebarLogo
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
