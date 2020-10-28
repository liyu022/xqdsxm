<template>
    <section class="app-main">
        <el-card class="box-card">
            <transition name="fade-transform" mode="out-in">
                <keep-alive :include="cachedViews">
                    <router-view :key="key"/>
                </keep-alive>
            </transition>
        </el-card>
    </section>
</template>

<script>
export default {
    name: 'AppMain',
    computed: {
        cachedViews() {
            return this.$store.state.system.cachedViews
        },
        key() {
            return this.$route.path
        }
    }
}
</script>

<style lang="scss" scoped>
.app-main {
  /* 50= navbar  50  */
  height: 100%;
  width: 100%;
  padding-top: 20px;
  padding-left: 20px;
  box-sizing: border-box;
  position: relative;
  overflow: hidden;
}
</style>
