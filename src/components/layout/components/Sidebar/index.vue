<template>
  <div :class="{'has-logo':showLogo}">
    <logo v-if="showLogo" :collapse="isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :unique-opened="false"
        :collapse-transition="false"
        mode="vertical"
      >
       <sidebar-item v-for="route in Routes" :key="route.path" :item="route" :base-path="route.path" />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import Logo from './Logo'
import SidebarItem from './SidebarItem'

export default {
  data () {
    return {}
  },
  components: { SidebarItem, Logo },
  computed: {
    activeMenu() {
     /* const head = [{
        path: '/404',
        component: () => import('@/pages/system/user')
      },
      {
        path: '/401',
        component: () => import('@/pages/system/role')
      }]*/
      return ''
    },
   Routes(){
      return JSON.parse(localStorage.getItem('menu'))
    },
    showLogo() {
      return this.$store.state.system.setting.sidebarLogo
    },
    isCollapse() {
      return !this.$store.state.system.app.sidebar.opened
    }
  }
}
</script>
<style>
  .el-menu {
    border: none;
    height: 100%;
    width: 100% !important;
    list-style: none;
    position: relative;
    margin: 0;
    padding-left: 0;
    background-color: #304156 !important;
    overflow:hidden !important;
  }
  .el-submenu__title {
    font-size: 14px;
    color: #e6e6e6 !important;
    padding: 0 20px;
    cursor: pointer;
    -webkit-transition: border-color .3s,background-color .3s,color .3s;
    transition: border-color .3s,background-color .3s,color .3s;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }
  .el-menu-item {
    font-size: 14px;
    color: #e6e6e6 !important;
    padding: 0 20px;
    cursor: pointer;
    -webkit-transition: border-color .3s,background-color .3s,color .3s;
    transition: border-color .3s,background-color .3s,color .3s;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }
  .nest-menu>a, a:hover, a:focus {
    text-decoration: none; color: inherit;
  }
  .el-submenu__title:focus, .el-submenu__title:hover {
    outline: 0;
    background-color:#2b2f3a !important;
  }
  .el-menu-item:focus, .el-menu-item:hover {
    outline: 0;
    background-color:#2b2f3a !important;
  }
  .el-scrollbar__wrap {
    overflow: hidden !important;
    height: 100%;
  }
  .el-submenu [class^=el-icon-] {
    vertical-align: middle;
    margin-right: 12px;
    width: 24px !important;
    text-align: center;
    font-size: 18px;
  }
</style>
