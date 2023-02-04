<template>
  <div>
    <el-container>
      <el-aside width="200px" class="aside">
        <left-nav></left-nav>
      </el-aside>
      <el-container>
        <el-header>
          <top-nav></top-nav>
        </el-header>
        <el-main class="main">
          <keep-alive>
            <router-view v-if="$route.meta.keepAlive"></router-view>
          </keep-alive>
          <router-view v-if="!$route.meta.keepAlive"></router-view>
        </el-main>
        <el-footer class="foot">
          京ICP备88888888888号 京公安网备123456号
        </el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import LeftNav from '@/components/LeftNav.vue'
import TopNav from '@/components/TopNav.vue'
export default {
  components:{
   LeftNav,TopNav
  }
};
</script>

<style lang="less" scoped>
.aside{
  background-color: #001529;
  height: 100vh;
}
.el-header{
  box-shadow: 0 3px 4px rgba(0, 21, 41, .1);
  height: 60px;
  line-height: 60px;
}
.foot{
  text-align: center;
  color: #999;
  font-size: 12px;
  line-height: 50px;
  background-color: #e9eef3;
}
.main{
  background-color: #e9eef3;
  height: 70vh;
  padding: 10px;
}
</style>