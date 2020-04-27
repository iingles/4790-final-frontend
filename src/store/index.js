import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      auth: false,
      token: '',
      id: '',
      feedStack: []
    }
  },
  getters: {
    user (state) {
      return state.user
    },
    feed (state) {
      return state.user.feedStack
    }
  },
  mutations: {
    setAuth (state, userAuth) {
      state.user = userAuth
    },
    removeAuth (state, userAuth) {
      state.user = {
        auth: false,
        token: '',
        id: '',
        feedstack: []
      }
    },
    loadFeed (state, feedStack) {
      state.user.feedStack = feedStack
    },
    newPost (state, postData) {
      state.user.feedStack.unshift(postData)
    },
    updatePost (state, postData) {
      const postIndex = state.user.feedstack.findIndex(el => el._id === postData._id)
      state.user.feedStack[postIndex] = postData
    }
  },
  actions: {
    setAuth ({ commit }, authData) {
      commit('setAuth', authData)
    },
    loadFeed ({ commit }, feedStack) {
      commit('loadFeed', feedStack)
    },
    newPost ({ commit }, postData) {
      commit('newPost', postData)
    },
    updatePost ({ commit }, postData) {
      commit('updatePost', postData)
    },
    logout ({ commit }, authData) {
      commit('removeAuth', authData)
    }
  },
  modules: {
  }
})
