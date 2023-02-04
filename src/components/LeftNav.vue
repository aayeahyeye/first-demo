<template>
  <div>
    <h1>邦达货运后台管理系统</h1>
    <!-- 开启路由模式，index值即可指向对应路由 -->
    <el-menu
      background-color="#001520"
      :router="true"
      text-color="#fff"
    >
      <!-- 循环菜单项数组 -->
      <navs-menu
        v-for="(item, index) in menuData"
        :menu="item"
        :key="index"
      ></navs-menu>
    </el-menu>
  </div>
</template>

<script>
import { get } from "../utils/http";
import NavsMenu from "./NavsMenu.vue";
export default {
  data() {
    return {
      menuData: [],
    };
  },
  created(){
    this.getMenu()
  },
  methods: {
    async getMenu() {
      let { data } = await get("/menu");
      this.menuData = data;
      console.log(data);
    },

  },
  components: {
    NavsMenu,
  },
};
</script>

<style lang="less" scoped>
h1 {
  color: #fff;
  line-height: 50px;
}

</style>