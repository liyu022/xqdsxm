// import Vue from 'vue'
 const ADD_A='ADD_A'
const state = {
  a:0
}

// getters
const getters = {
  a: state => state.a
}

// mutations
const mutations = {
 
  [ADD_A] (state, parme) {
    state.a += 1
   console.log( state.a)
  },
 
}

// actions
const actions = {
  adda ({commit}, parme) {
    commit(ADD_A, parme)
  },
 
}

export default {
  state,
  getters,
  actions,
  mutations
}
