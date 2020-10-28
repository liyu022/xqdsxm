// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import store from './store'
import './icons' // icon
import XEUtils from 'xe-utils'
import VXEUtils from 'vxe-utils'
import VXETable from 'vxe-table'
import 'vxe-table/lib/index.css'
Vue.use(VXEUtils, XEUtils, {mounts: ['locat', 'browse', 'cookie']})
Vue.use(VXETable)
Vue.use(ElementUI)
Vue.config.productionTip = false
Vue.directive('drag', {
  inserted: function (el, binding, vnode) {
      el.onmousedown = function(e){
          var disx = e.pageX - el.offsetLeft;
          var disy = e.pageY - el.offsetTop;
          document.onmousemove = function (e){
              el.style.left = e.pageX - disx + 'px';
              el.style.top = e.pageY - disy + 'px';
          }
          document.onmouseup = function(){
              document.onmousemove = document.onmouseup = null;
          }
      }
  },
})

router.beforeEach((to, from, next) => {
    if(to.path=='/'){
      localStorage.clear()
      sessionStorage.clear()
    }
  if (from.matched.length==0 && to.path!='/') {
     sessionStorage.setItem('status',366)
  }
  next()
})
Vue.prototype.formatDate = function (date) {
  let y = date.getFullYear()
  let m = date.getMonth() + 1
  m = m < 10 ? '0' + m : m
  let d = date.getDate()
  d = d < 10 ? ('0' + d) : d
  return y + '-' + m + '-' + d
}
/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
