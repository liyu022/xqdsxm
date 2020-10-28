<template>
  <div :class="classObj" class="app-wrapper">
    <div v-if="device==='mobile'&&sidebar.opened" class="drawer-bg" @click="handleClickOutside" />
    <sidebar class="sidebar-container" />
    <div :class="{hasTagsView:tagsView}" class="main-container">
      <div :class="{'fixed-header':fixedHeader}">
        <navbar />
        <!--<tags-view v-if="tagsView" />-->
      </div>
      <app-main />
      <right-panel v-if="showSetting">
        <settings />
      </right-panel>
    </div>
  </div>
</template>

<script>
import RightPanel from 'components/common/RightPanel'
import { AppMain, Navbar, Settings, Sidebar, TagsView } from './components'
import ResizeMixin from './mixin/ResizeHandler'
import { mapState } from 'vuex'

export default {
  name: 'Layout',
  components: {
    AppMain,
    Navbar,
    RightPanel,
    TagsView,
    Settings,
    Sidebar
  },
  mixins: [ResizeMixin],
  computed: {
    ...mapState({
      sidebar: state => state.system.app.sidebar,
      device: state => state.system.app.device,
      showSetting: state => state.system.setting.showSetting,
      tagsView: state => state.system.setting.tagsView,
      fixedHeader: state => state.system.setting.fixedHeader
    }),
    classObj() {
      return {
        hideSidebar: !this.$store.state.system.app.sidebar.opened,
        openSidebar: this.$store.state.system.app.sidebar.opened,
        withoutAnimation: this.$store.state.system.app.sidebar.withoutAnimation,
        mobile: this.$store.state.system.app.device === 'mobile'
      }
    }
  },
  methods: {
    handleClickOutside() {
      this.$store.dispatch('closeSideBar', { withoutAnimation: false })
    }
  }
}
</script>

<style lang="scss" scoped>
   @import "@/assets/scss/layout/index.scss";
  .app-wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;
    &.mobile.openSidebar {
      position: fixed;
      top: 0;
    }
  }

  .drawer-bg {
    background: #000;
    opacity: 0.3;
    width: 100%;
    top: 0;
    height: 100%;
    position: absolute;
    z-index: 999;
  }

  .fixed-header {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 9;
    width: calc(100% - #{$sideBarWidth});
    transition: width 0.28s;
  }

  .hideSidebar .fixed-header {
    width: calc(100% - 54px)
  }

  .mobile .fixed-header {
    width: 100%;
  }
  .main-container{
    background: #F0F3F7;
  }
</style>
