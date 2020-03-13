import { Login, Logout } from '@/api/auth'
import { Info } from '@/api/user'

import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'
import { isServer } from '@/utils/healthy'

const state = {
  token: getToken(),
  username: '',
  name: '匿名',
  userId: '',
  loginTime: new Date(),
  avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
  roles: [],
  front_permits: []
}

const mutations = {
  SET_TOKEN: (state, token) => {
    setToken(token)
    state.token = token
  },
  REMOVE_TOKEN: (state) => {
    removeToken()
    state.token = ''
  },
  SET_USERNAME: (state, username) => {
    if (username) {
      state.username = username
    }
  },
  SET_NAME: (state, name) => {
    if (name) {
      state.name = name
    }
  },
  SET_USER_ID: (state, userId) => {
    if (userId) {
      state.userId = userId
    }
  },
  SET_LOGINTIME: (state, time) => {
    if (time) {
      state.loginTime = time
    }
  },
  SET_AVATAR: (state, avatar) => {
    if (avatar) {
      state.avatar = avatar
    }
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  },
  SET_FRONT_PEIMITS: (state, front_permits) => {
    state.front_permits = front_permits
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      // 客户端模式
      Login({ username: username.trim(), password: password }).then(response => {
        const { data } = response
        commit('SET_TOKEN', data.token)
        resolve(data.token)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      Info().then(response => {
        const { data } = response

        if (!data) {
          reject('Verification failed, please Login again.')
        }
        // 用户相关信息设置
        const { username, name, avatar, id } = data.user
        commit('SET_NAME', name)
        commit('SET_USERNAME', username)
        commit('SET_USER_ID', id)
        commit('SET_AVATAR', avatar)
        // 角色相关信息设置
        let roles = ['user']
        if ('roles' in data) {
          roles = data.roles
        }
        commit('SET_ROLES', roles)
        // 前端权限相关设置
        let front_permits = []
        if ('front_permits' in data) {
          front_permits = data.front_permits
        }
        commit('SET_FRONT_PEIMITS', front_permits)
        resolve(state)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      isServer().then(server => {
        if (server) {
          Logout().then(() => {
            commit('REMOVE_TOKEN')
            commit('SET_ROLES')
            resetRouter()
            resolve()
          }).catch(error => {
            reject(error)
          })
        } else {
          commit('REMOVE_TOKEN')
          commit('SET_ROLES')
          resetRouter()
          resolve()
        }
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('REMOVE_TOKEN')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
