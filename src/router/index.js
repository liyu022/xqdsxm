import Vue from 'vue'
import vueRouter from 'vue-router'
import login from '@/components/login'
import Main from '@/pages/Main.vue'
import setPassword from '@/pages/system/setpassword.vue'
Vue.use(vueRouter)

const Router= new vueRouter({
  routes: [
    {
      path: '/',
      component: login
    },
    {
      path: '/system',
      component: Main,
      children:[
        {
          path: 'setPassword',
          component: setPassword
        }
      ]
    }
  ]
})
export default Router;
