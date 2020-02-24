import defaultSettings from '@/settings'
import Store from '@/utils/electron-store'
import { isServer } from '@/utils/healthy'

const { showSettings, fixedHeader, sidebarLogo } = defaultSettings

const state = {
  showSettings: showSettings,
  fixedHeader: fixedHeader,
  isHeader: true,
  sidebarLogo: sidebarLogo,
  // 自定义开发
  api: '', // baseURL集合每行一个回车分割
  baseURL: '', // 主API地址
  install: false // 程序是否安装
}

const mutations = {
  CHANGE_SETTING: (state, { key, value }) => {
    if (state.hasOwnProperty(key)) {
      state[key] = value
      Store.set('settings.' + key, value)
    }
  },
  // 自动更改可用服务器访问地址
  CHANGE_BASE_URL: (state) => {
    if (state.api) {
      state.api.split(/[\n]/).forEach(async url => {
        if (await isServer(url)) {
          mutations.CHANGE_SETTING(state, { key: 'baseURL', value: url })
        }
      })
    }
  }
}

const actions = {
  changeSetting({ commit }, data) {
    commit('CHANGE_SETTING', data)
  },
  changeBaseUrl({ commit }) {
    commit('CHANGE_BASE_URL')
  }
}

// init 初始化数据
function init() {
  state.api = Store.get('settings.api')
  // 初始化服务器地址
  mutations.CHANGE_BASE_URL(state)
  state.install = Store.get('settings.install')
}
// 初始化数据
init()
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
