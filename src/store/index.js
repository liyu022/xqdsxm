import Vue from 'vue'
import Vuex from 'vuex'
// import emgres from './modules/emgres'
import tocc from './modules/tocc'
import map from './modules/map'
import vehicle from './modules/vehicle'
import business from './modules/business'
import system from './modules/system'
Vue.use(Vuex)



export default new Vuex.Store({
  modules: {
    tocc,
    map,
    vehicle,
    business,
    system
  }
})
