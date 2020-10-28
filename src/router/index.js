import Vue from 'vue'
import vueRouter from 'vue-router'
import login from '@/components/login'

Vue.use(vueRouter)

const Router= new vueRouter({
  routes: [
    {
      path: '/',
      component: login
    }
  ]
})
export default Router;
