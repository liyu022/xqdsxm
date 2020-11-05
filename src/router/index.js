import Vue from 'vue'
import vueRouter from 'vue-router'
import login from '@/components/login'
import Main from '@/pages/Main.vue'
import layout from '@/components/layout'
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
      component: layout,
      children:[
        {
          path: 'setPassword',
          name:'修改密码',
          component: setPassword
        }
      ]
    }
  ]
})
export default Router;
