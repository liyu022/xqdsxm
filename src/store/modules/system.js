import {USER_SIGNIN, USER_SIGNOUT, USER_SETTING,TOGGLE_SIDEBAR, CLOSE_SIDEBAR, TOGGLE_DEVICE, SET_SIZE, ADD_VISITED_VIEW,
  ADD_CACHED_VIEW, DEL_VISITED_VIEW, DEL_CACHED_VIEW, DEL_OTHERS_VISITED_VIEWS, DEL_OTHERS_CACHED_VIEWS, DEL_ALL_VISITED_VIEWS,
  DEL_ALL_CACHED_VIEWS, UPDATE_VISITED_VIEW} from '../mutation-types'
import Cookies from 'js-cookie'
const state = {
  user: {},
  setting: {
    theme: '#304156',
    showSetting: true,
    tagsView: true,
    fixedHeader: false,
    sidebarLogo: true
  },
  app: {
    sidebar: {
      opened: Cookies.get('sidebarStatus') ? !!+Cookies.get('sidebarStatus') : true,
      withoutAnimation: false
    },
    size:  Cookies.get('size') || 'medium',
    device: 'desktop'
  },
 visitedViews: [],
 cachedViews: []
}

// getters
const getters = {
  user: state => state.user,
  setting: state => state.setting,
  app: state => state.app,
  visitedViews: state => state.visitedViews,
  cachedViews: state => state.cachedViews
}

// mutations
const mutations = {

  [USER_SIGNIN] (state, user) {
    state.user = user
    window.localStorage.setItem('userDetail', JSON.stringify(state.user))
  },
  [USER_SIGNOUT] (state) {
    state.user.token = ''
    state.user.userId = ''
    state.user.userName = ''
    window.localStorage.setItem('userDetail', '')
  },
  [USER_SETTING]: (state, { key, value }) => {
    if (state.hasOwnProperty(key)) {
      state[key] = value
    }
  },
  [TOGGLE_SIDEBAR]: state => {
    state.app.sidebar.opened = !state.app.sidebar.opened
    state.app.sidebar.withoutAnimation = false
    if (state.app.sidebar.opened) {
      Cookies.set('sidebarStatus', 1)
    } else {
      Cookies.set('sidebarStatus', 0)
    }
  },
   [CLOSE_SIDEBAR]: (state, withoutAnimation) => {
    Cookies.set('sidebarStatus', 0)
    state.app.sidebar.opened = false
    state.app.sidebar.withoutAnimation = withoutAnimation
  },
  [TOGGLE_DEVICE]: (state, device) => {
    state.app.device = device
  },
  [SET_SIZE]: (state, size) => {
    state.app.size = size
    Cookies.set('size', size)
  },
  [ADD_VISITED_VIEW]: (state, view) => {
    if (state.visitedViews.some(v => v.path === view.path)) return
    state.visitedViews.push(
      Object.assign({}, view, {
        title: view.meta.title || 'no-name'
      })
    )
  },
  [ADD_CACHED_VIEW]: (state, view) => {
    if (state.cachedViews.includes(view.name)) return
    if (!view.meta.noCache) {
      state.cachedViews.push(view.name)
    }
  },

  [DEL_VISITED_VIEW]: (state, view) => {
    for (const [i, v] of state.visitedViews.entries()) {
      if (v.path === view.path) {
        state.visitedViews.splice(i, 1)
        break
      }
    }
  },
  [DEL_CACHED_VIEW]: (state, view) => {
    const index = state.cachedViews.indexOf(view.name)
    index > -1 && state.cachedViews.splice(index, 1)
  },

  [DEL_OTHERS_VISITED_VIEWS]: (state, view) => {
    state.visitedViews = state.visitedViews.filter(v => {
      return v.meta.affix || v.path === view.path
    })
  },
  [DEL_OTHERS_CACHED_VIEWS]: (state, view) => {
    const index = state.cachedViews.indexOf(view.name)
    if (index > -1) {
      state.cachedViews = state.cachedViews.slice(index, index + 1)
    } else {
      // if index = -1, there is no cached tags
      state.cachedViews = []
    }
  },

  [DEL_ALL_VISITED_VIEWS]: state => {
    // keep affix tags
    const affixTags = state.visitedViews.filter(tag => tag.meta.affix)
    state.visitedViews = affixTags
  },
  [DEL_ALL_CACHED_VIEWS]: state => {
    state.cachedViews = []
  },

  [UPDATE_VISITED_VIEW]: (state, view) => {
    for (let v of state.visitedViews) {
      if (v.path === view.path) {
        v = Object.assign(v, view)
        break
      }
    }
  }
}

// actions
const actions = {
  userSignin ({commit}, user) {
    commit(USER_SIGNIN, user)
  },
  userSignout ({commit}, user) {
    commit(USER_SIGNOUT, user)
  },
  changeSetting ({commit}, data) {
    commit(USER_SETTING, data)
  },
  /* header打开关闭左侧 */
  toggleSideBar({ commit }) {
    commit(TOGGLE_SIDEBAR)
  },
  closeSideBar({ commit }, { withoutAnimation }) {
    commit(CLOSE_SIDEBAR, withoutAnimation)
  },
  toggleDevice({ commit }, device) {
    commit(TOGGLE_DEVICE, device)
  },
  setSize({ commit }, size) {
    commit(SET_SIZE, size)
  },
  /* header部中页面管理 */
  addView({ dispatch }, view) {
    dispatch('addVisitedView', view)
    dispatch('addCachedView', view)
  },
  addVisitedView({ commit }, view) {
    commit('ADD_VISITED_VIEW', view)
  },
  addCachedView({ commit }, view) {
    commit('ADD_CACHED_VIEW', view)
  },

  delView({ dispatch, state }, view) {
    return new Promise(resolve => {
      dispatch('delVisitedView', view)
      dispatch('delCachedView', view)
      resolve({
        visitedViews: [...state.visitedViews],
        cachedViews: [...state.cachedViews]
      })
    })
  },
  delVisitedView({ commit, state }, view) {
    return new Promise(resolve => {
      commit('DEL_VISITED_VIEW', view)
      resolve([...state.visitedViews])
    })
  },
  delCachedView({ commit, state }, view) {
    return new Promise(resolve => {
      commit('DEL_CACHED_VIEW', view)
      resolve([...state.cachedViews])
    })
  },

  delOthersViews({ dispatch, state }, view) {
    return new Promise(resolve => {
      dispatch('delOthersVisitedViews', view)
      dispatch('delOthersCachedViews', view)
      resolve({
        visitedViews: [...state.visitedViews],
        cachedViews: [...state.cachedViews]
      })
    })
  },
  delOthersVisitedViews({ commit, state }, view) {
    return new Promise(resolve => {
      commit('DEL_OTHERS_VISITED_VIEWS', view)
      resolve([...state.visitedViews])
    })
  },
  delOthersCachedViews({ commit, state }, view) {
    return new Promise(resolve => {
      commit('DEL_OTHERS_CACHED_VIEWS', view)
      resolve([...state.cachedViews])
    })
  },

  delAllViews({ dispatch, state }, view) {
    return new Promise(resolve => {
      dispatch('delAllVisitedViews', view)
      dispatch('delAllCachedViews', view)
      resolve({
        visitedViews: [...state.visitedViews],
        cachedViews: [...state.cachedViews]
      })
    })
  },
  delAllVisitedViews({ commit, state }) {
    return new Promise(resolve => {
      commit('DEL_ALL_VISITED_VIEWS')
      resolve([...state.visitedViews])
    })
  },
  delAllCachedViews({ commit, state }) {
    return new Promise(resolve => {
      commit('DEL_ALL_CACHED_VIEWS')
      resolve([...state.cachedViews])
    })
  },

  updateVisitedView({ commit }, view) {
    commit('UPDATE_VISITED_VIEW', view)
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}

