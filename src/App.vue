<template>
 <div id="app" class="">
    <div class="app_content">
      <router-view/>
    </div>
  </div>
</template>

<script>
import { make, mkTree } from "./mk";
import layout from '@/components/layout'
export default {
  name: 'App',
  mounted() {
    let flag=sessionStorage.getItem('status')
    if (flag==366) {
      let routes=JSON.parse(localStorage.getItem('fun'))
      var da = mkTree(routes)
       localStorage.setItem('menu',JSON.stringify(da))
      let addRoutes = [
        {
          path: "",
          component: layout,
          name: "",
          children: da
        }
      ];
      this.$router.addRoutes(addRoutes);
    }
  },
  created (){

  }

}
</script>
<style lang="scss" scoped>
#app {
    position: absolute;
    top: 0px;
    bottom: 0px;
    width: 100%;
    min-width: 1366px;
    background: #fff;
    .app_content{
      width:100%;
      height: 100%;
      div{
        height: 100%;
    
      }
    }


  }
</style>
